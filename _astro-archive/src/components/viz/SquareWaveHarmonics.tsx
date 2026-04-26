import { useEffect, useRef, useState } from "react";

// Sum of odd harmonics approximates a square wave:
// f(x) = (4/pi) * sum_{k odd} (1/k) sin(k*x)

export default function SquareWaveHarmonics() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [n, setN] = useState(3);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const approx = (x: number, N: number) => {
      let s = 0;
      for (let k = 1; k <= 2 * N - 1; k += 2) {
        s += Math.sin(k * x) / k;
      }
      return (4 / Math.PI) * s;
    };

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;
      ctx.fillStyle = "#fbfaf7";
      ctx.fillRect(0, 0, W, H);

      const margin = 40;
      const plotW = W - margin * 2;
      const plotH = H - margin * 2;

      // Axes
      ctx.strokeStyle = "#c8c0a8";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(margin, margin + plotH / 2);
      ctx.lineTo(margin + plotW, margin + plotH / 2);
      ctx.stroke();
      ctx.strokeStyle = "#eae5d5";
      for (let i = 0; i <= 4; i++) {
        const x = margin + (i / 4) * plotW;
        ctx.beginPath();
        ctx.moveTo(x, margin);
        ctx.lineTo(x, margin + plotH);
        ctx.stroke();
      }

      const xMin = -Math.PI;
      const xMax = Math.PI * 3;
      const toPx = (x: number, y: number) => [
        margin + ((x - xMin) / (xMax - xMin)) * plotW,
        margin + plotH / 2 - (y * plotH) / 3,
      ];

      // Target square wave
      ctx.strokeStyle = "rgba(181, 83, 42, 0.35)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      const target = (x: number) => (Math.sin(x) >= 0 ? 1 : -1);
      let prev: [number, number] | null = null;
      for (let i = 0; i <= 400; i++) {
        const x = xMin + (i / 400) * (xMax - xMin);
        const y = target(x);
        const [px, py] = toPx(x, y);
        if (prev && Math.abs(y - prev[1]) > 1.5) {
          ctx.moveTo(px, py);
        } else if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
        prev = [px, y];
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Individual harmonics (faded)
      ctx.lineWidth = 0.8;
      for (let k = 1; k <= 2 * n - 1; k += 2) {
        ctx.strokeStyle = `rgba(26, 74, 122, ${0.15 + 0.05 * k})`;
        ctx.beginPath();
        for (let i = 0; i <= 400; i++) {
          const x = xMin + (i / 400) * (xMax - xMin);
          const y = ((4 / Math.PI) * Math.sin(k * x)) / k;
          const [px, py] = toPx(x, y);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }

      // Sum
      ctx.strokeStyle = "#1a1a1a";
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      for (let i = 0; i <= 800; i++) {
        const x = xMin + (i / 800) * (xMax - xMin);
        const y = approx(x, n);
        const [px, py] = toPx(x, y);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      // Legend
      ctx.fillStyle = "#7a7368";
      ctx.font = "11px Inter, sans-serif";
      ctx.fillText("onda quadrada ideal", margin, 22);
      ctx.fillStyle = "#1a1a1a";
      ctx.fillText(`soma de ${n} harmônicos ímpares`, margin + 170, 22);
      ctx.fillStyle = "rgba(26, 74, 122, 0.75)";
      ctx.fillText("harmônicos individuais", margin + 370, 22);
    };

    resize();
    window.addEventListener("resize", resize);
    draw();
    return () => window.removeEventListener("resize", resize);
  }, [n]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "320px", display: "block", borderRadius: "3px" }}
      />
      <div className="controls">
        <label>
          <span className="ctrl-label">número de harmônicos — {n}</span>
          <input
            type="range"
            min={1}
            max={40}
            step={1}
            value={n}
            onChange={(e) => setN(parseInt(e.target.value))}
          />
        </label>
      </div>
    </div>
  );
}
