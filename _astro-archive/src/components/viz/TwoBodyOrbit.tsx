import { useEffect, useRef, useState } from "react";

type Body = { x: number; y: number; vx: number; vy: number };

export default function TwoBodyOrbit() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mass, setMass] = useState(1.0);
  const [trail, setTrail] = useState<{ x: number; y: number }[]>([]);
  // Circular orbit: v = sqrt(G*M/r), G=400, M=1, r=180 → v ≈ 1.49
  const stateRef = useRef<Body>({ x: 180, y: 0, vx: 0, vy: 1.49 });
  const trailRef = useRef<{ x: number; y: number }[]>([]);
  const draggingRef = useRef(false);
  const massRef = useRef(mass);
  const [running, setRunning] = useState(true);
  const runningRef = useRef(true);

  useEffect(() => {
    massRef.current = mass;
  }, [mass]);
  useEffect(() => {
    runningRef.current = running;
  }, [running]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    const G = 400;

    const step = (dt: number) => {
      const b = stateRef.current;
      // Integrate using velocity Verlet for stability
      const r2 = b.x * b.x + b.y * b.y;
      const r = Math.sqrt(r2);
      const a = (-G * massRef.current) / r2;
      const ax = (a * b.x) / r;
      const ay = (a * b.y) / r;

      b.vx += ax * dt;
      b.vy += ay * dt;
      b.x += b.vx * dt;
      b.y += b.vy * dt;

      trailRef.current.push({ x: b.x, y: b.y });
      if (trailRef.current.length > 800) trailRef.current.shift();
    };

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      ctx.fillStyle = "#fbfaf7";
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Grid
      ctx.strokeStyle = "#eae5d5";
      ctx.lineWidth = 1;
      for (let gx = 0; gx < rect.width; gx += 40) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, rect.height);
        ctx.stroke();
      }
      for (let gy = 0; gy < rect.height; gy += 40) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(rect.width, gy);
        ctx.stroke();
      }

      // Trail
      ctx.strokeStyle = "#b5532a";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      trailRef.current.forEach((p, i) => {
        const px = cx + p.x;
        const py = cy + p.y;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.stroke();

      // Star
      const starR = 6 + massRef.current * 6;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, starR * 2);
      grad.addColorStop(0, "#ffd89a");
      grad.addColorStop(0.5, "#f0a040");
      grad.addColorStop(1, "rgba(240, 160, 64, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, starR * 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#e08030";
      ctx.beginPath();
      ctx.arc(cx, cy, starR, 0, Math.PI * 2);
      ctx.fill();

      // Planet
      const b = stateRef.current;
      ctx.fillStyle = "#1a1a1a";
      ctx.beginPath();
      ctx.arc(cx + b.x, cy + b.y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#fbfaf7";
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    let last = performance.now();
    const loop = (t: number) => {
      const dt = Math.min((t - last) / 16.67, 2);
      last = t;
      if (runningRef.current && !draggingRef.current) {
        for (let i = 0; i < 3; i++) step(dt * 0.4);
      }
      draw();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const toLocal = (ev: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: ev.clientX - rect.left - rect.width / 2,
        y: ev.clientY - rect.top - rect.height / 2,
      };
    };

    const onDown = (ev: PointerEvent) => {
      const p = toLocal(ev);
      const b = stateRef.current;
      const d = Math.hypot(p.x - b.x, p.y - b.y);
      if (d < 25) {
        draggingRef.current = true;
        canvas.setPointerCapture(ev.pointerId);
      }
    };
    const onMove = (ev: PointerEvent) => {
      if (!draggingRef.current) return;
      const p = toLocal(ev);
      stateRef.current.x = p.x;
      stateRef.current.y = p.y;
      stateRef.current.vx = 0;
      stateRef.current.vy = 0;
      trailRef.current = [];
    };
    const onUp = (ev: PointerEvent) => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      // Give tangential velocity proportional to distance (circular-ish)
      const b = stateRef.current;
      const r = Math.hypot(b.x, b.y);
      if (r > 5) {
        const vMag = Math.sqrt((G * massRef.current) / r);
        b.vx = (-b.y / r) * vMag;
        b.vy = (b.x / r) * vMag;
      }
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

  const reset = () => {
    const r = 180;
    const v = Math.sqrt((400 * massRef.current) / r);
    stateRef.current = { x: r, y: 0, vx: 0, vy: v };
    trailRef.current = [];
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "420px",
          display: "block",
          borderRadius: "3px",
          touchAction: "none",
          cursor: "grab",
        }}
      />
      <div className="controls">
        <label>
          <span className="ctrl-label">Massa da estrela — {mass.toFixed(2)} M☉</span>
          <input
            type="range"
            min={0.2}
            max={3}
            step={0.05}
            value={mass}
            onChange={(e) => setMass(parseFloat(e.target.value))}
          />
        </label>
        <button onClick={() => setRunning((r) => !r)}>
          {running ? "Pausar" : "Retomar"}
        </button>
        <button className="ghost" onClick={reset}>
          Reiniciar
        </button>
      </div>
    </div>
  );
}
