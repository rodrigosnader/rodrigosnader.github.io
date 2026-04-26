import { useEffect, useRef, useState } from "react";

// Visualize gradient descent on a 2D loss landscape.
// Loss: L(x,y) = 0.5*(ax^2 + by^2) + c*sin(x)*cos(y)
// User clicks to set starting point; marble descends to minimum.

export default function GradientDescent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [lr, setLr] = useState(0.08);
  const lrRef = useRef(lr);
  const posRef = useRef<{ x: number; y: number }>({ x: 2.2, y: 1.5 });
  const trailRef = useRef<{ x: number; y: number }[]>([]);
  const draggingRef = useRef(false);

  useEffect(() => {
    lrRef.current = lr;
  }, [lr]);

  const loss = (x: number, y: number) =>
    0.25 * (x * x + y * y) + 0.6 * Math.sin(x) * Math.cos(y);
  const gradLoss = (x: number, y: number) => {
    const dx = 0.5 * x + 0.6 * Math.cos(x) * Math.cos(y);
    const dy = 0.5 * y - 0.6 * Math.sin(x) * Math.sin(y);
    return { dx, dy };
  };

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;

    const xMin = -3;
    const xMax = 3;
    const yMin = -2.2;
    const yMax = 2.2;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawBackground();
    };

    // Precompute loss field and draw as heatmap + contours
    const drawBackground = () => {
      const rect = canvas.getBoundingClientRect();
      const img = ctx.createImageData(
        Math.floor(rect.width),
        Math.floor(rect.height)
      );
      // Compute loss range
      let lMin = Infinity,
        lMax = -Infinity;
      for (let i = 0; i < 60; i++)
        for (let j = 0; j < 40; j++) {
          const x = xMin + (i / 60) * (xMax - xMin);
          const y = yMin + (j / 40) * (yMax - yMin);
          const L = loss(x, y);
          if (L < lMin) lMin = L;
          if (L > lMax) lMax = L;
        }
      for (let py = 0; py < img.height; py++) {
        for (let px = 0; px < img.width; px++) {
          const x = xMin + (px / img.width) * (xMax - xMin);
          const y = yMax - (py / img.height) * (yMax - yMin);
          const L = loss(x, y);
          const t = (L - lMin) / (lMax - lMin);
          // Cream -> warm orange gradient for loss
          const r = Math.round(251 - (251 - 181) * t);
          const g = Math.round(250 - (250 - 83) * t);
          const b = Math.round(247 - (247 - 42) * t);
          const idx = (py * img.width + px) * 4;
          img.data[idx] = r;
          img.data[idx + 1] = g;
          img.data[idx + 2] = b;
          img.data[idx + 3] = 255;
        }
      }
      ctx.putImageData(img, 0, 0);

      // Contour lines via marching-squares-lite: sample grid
      const levels = 10;
      ctx.strokeStyle = "rgba(26, 26, 26, 0.22)";
      ctx.lineWidth = 0.8;
      for (let lvl = 0; lvl < levels; lvl++) {
        const L = lMin + ((lvl + 0.5) / levels) * (lMax - lMin);
        drawContour(L, lMin, lMax, xMin, xMax, yMin, yMax);
      }
    };

    const drawContour = (
      level: number,
      _lmin: number,
      _lmax: number,
      xMin: number,
      xMax: number,
      yMin: number,
      yMax: number
    ) => {
      const rect = canvas.getBoundingClientRect();
      const nx = 80;
      const ny = 50;
      const toPx = (x: number, y: number) => [
        ((x - xMin) / (xMax - xMin)) * rect.width,
        rect.height - ((y - yMin) / (yMax - yMin)) * rect.height,
      ];
      ctx.beginPath();
      for (let i = 0; i < nx - 1; i++) {
        for (let j = 0; j < ny - 1; j++) {
          const x0 = xMin + (i / nx) * (xMax - xMin);
          const x1 = xMin + ((i + 1) / nx) * (xMax - xMin);
          const y0 = yMin + (j / ny) * (yMax - yMin);
          const y1 = yMin + ((j + 1) / ny) * (yMax - yMin);
          const v00 = loss(x0, y0) - level;
          const v10 = loss(x1, y0) - level;
          const v01 = loss(x0, y1) - level;
          const v11 = loss(x1, y1) - level;
          const segs: [number, number, number, number][] = [];
          const edge = (
            a: number,
            b: number,
            xa: number,
            ya: number,
            xb: number,
            yb: number
          ) => {
            const t = a / (a - b);
            return [xa + t * (xb - xa), ya + t * (yb - ya)] as const;
          };
          const pts: (readonly [number, number])[] = [];
          if (v00 * v10 < 0) pts.push(edge(v00, v10, x0, y0, x1, y0));
          if (v10 * v11 < 0) pts.push(edge(v10, v11, x1, y0, x1, y1));
          if (v11 * v01 < 0) pts.push(edge(v11, v01, x1, y1, x0, y1));
          if (v01 * v00 < 0) pts.push(edge(v01, v00, x0, y1, x0, y0));
          if (pts.length >= 2) {
            const [a, b] = toPx(pts[0][0], pts[0][1]);
            const [c, d] = toPx(pts[1][0], pts[1][1]);
            ctx.moveTo(a, b);
            ctx.lineTo(c, d);
          }
        }
      }
      ctx.stroke();
    };

    let raf = 0;
    const loop = () => {
      drawBackground();

      const rect = canvas.getBoundingClientRect();
      const toPx = (x: number, y: number) => [
        ((x - xMin) / (xMax - xMin)) * rect.width,
        rect.height - ((y - yMin) / (yMax - yMin)) * rect.height,
      ];

      // Step
      if (!draggingRef.current) {
        const p = posRef.current;
        const { dx, dy } = gradLoss(p.x, p.y);
        p.x -= lrRef.current * dx;
        p.y -= lrRef.current * dy;
        trailRef.current.push({ x: p.x, y: p.y });
        if (trailRef.current.length > 400) trailRef.current.shift();
      }

      // Draw trail
      ctx.strokeStyle = "rgba(26, 26, 26, 0.85)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      trailRef.current.forEach((p, i) => {
        const [px, py] = toPx(p.x, p.y);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.stroke();

      // Marble
      const p = posRef.current;
      const [px, py] = toPx(p.x, p.y);
      ctx.fillStyle = "#1a1a1a";
      ctx.beginPath();
      ctx.arc(px, py, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#fbfaf7";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Readout
      ctx.fillStyle = "rgba(251, 250, 247, 0.9)";
      ctx.fillRect(8, 8, 170, 38);
      ctx.fillStyle = "#3a3a3a";
      ctx.font = "12px JetBrains Mono, monospace";
      ctx.fillText(`L = ${loss(p.x, p.y).toFixed(3)}`, 16, 26);
      ctx.fillText(`x=${p.x.toFixed(2)}  y=${p.y.toFixed(2)}`, 16, 42);

      raf = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(loop);

    const onDown = (ev: PointerEvent) => {
      draggingRef.current = true;
      canvas.setPointerCapture(ev.pointerId);
      onMove(ev);
    };
    const onMove = (ev: PointerEvent) => {
      if (!draggingRef.current) return;
      const rect = canvas.getBoundingClientRect();
      const px = ev.clientX - rect.left;
      const py = ev.clientY - rect.top;
      const x = xMin + (px / rect.width) * (xMax - xMin);
      const y = yMin + (1 - py / rect.height) * (yMax - yMin);
      posRef.current = { x, y };
      trailRef.current = [{ x, y }];
    };
    const onUp = (ev: PointerEvent) => {
      draggingRef.current = false;
      canvas.releasePointerCapture(ev.pointerId);
    };
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "380px",
          display: "block",
          borderRadius: "3px",
          touchAction: "none",
          cursor: "crosshair",
        }}
      />
      <div className="controls">
        <label>
          <span className="ctrl-label">taxa de aprendizado — {lr.toFixed(3)}</span>
          <input
            type="range"
            min={0.005}
            max={0.3}
            step={0.005}
            value={lr}
            onChange={(e) => setLr(parseFloat(e.target.value))}
          />
        </label>
        <button
          className="ghost"
          onClick={() => {
            posRef.current = { x: 2.2, y: 1.5 };
            trailRef.current = [];
          }}
        >
          Reiniciar
        </button>
      </div>
    </div>
  );
}
