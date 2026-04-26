import { useEffect, useRef, useState } from "react";

// Elliptical orbit with Kepler's 2nd law visualized:
// sweep equal areas in equal times. We integrate the true anomaly
// from mean anomaly (Kepler's equation) and paint wedge sectors
// along the orbit.

export default function EqualAreas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [e, setE] = useState(0.55); // eccentricity
  const [running, setRunning] = useState(true);
  const eRef = useRef(e);
  const runningRef = useRef(running);

  useEffect(() => {
    eRef.current = e;
  }, [e]);
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

    // Solve Kepler's equation M = E - e*sin(E) via Newton's method
    const solveKepler = (M: number, ecc: number) => {
      let E = M;
      for (let i = 0; i < 6; i++) {
        E = E - (E - ecc * Math.sin(E) - M) / (1 - ecc * Math.cos(E));
      }
      return E;
    };

    let meanAnomaly = 0;
    let last = performance.now();
    // Captured sweeps: each a list of (x,y) boundary points
    const sweeps: { pts: { x: number; y: number }[]; color: string }[] = [];
    let sweepAccumulator: { x: number; y: number }[] = [];
    let lastSweepAt = 0;
    const sweepInterval = 0.8; // radians of mean anomaly per sweep
    const colors = [
      "rgba(181, 83, 42, 0.35)",
      "rgba(26, 74, 122, 0.32)",
      "rgba(98, 149, 85, 0.32)",
      "rgba(168, 112, 160, 0.32)",
      "rgba(200, 160, 50, 0.35)",
    ];
    let colorIdx = 0;

    const reset = () => {
      sweeps.length = 0;
      sweepAccumulator = [];
      lastSweepAt = 0;
      meanAnomaly = 0;
      colorIdx = 0;
    };

    const orbitPos = (M: number) => {
      const ecc = eRef.current;
      const Ea = solveKepler(M, ecc);
      const a = 170; // semi-major axis in px
      const b = a * Math.sqrt(1 - ecc * ecc);
      // Position with focus at origin (star at one focus)
      const x = a * (Math.cos(Ea) - ecc);
      const y = b * Math.sin(Ea);
      return { x, y };
    };

    let raf = 0;
    const loop = (t: number) => {
      const dt = Math.min((t - last) / 1000, 0.05);
      last = t;
      if (runningRef.current) {
        meanAnomaly += dt * 0.8;
        if (meanAnomaly > Math.PI * 6) {
          reset();
        }
      }

      const rect = canvas.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      ctx.fillStyle = "#fbfaf7";
      ctx.fillRect(0, 0, rect.width, rect.height);

      const ecc = eRef.current;
      const a = 170;
      const b = a * Math.sqrt(1 - ecc * ecc);
      const centerOffset = -a * ecc;

      // Draw ellipse outline
      ctx.strokeStyle = "#c8c0a8";
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 4]);
      ctx.beginPath();
      ctx.ellipse(cx + centerOffset, cy, a, b, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw captured sweeps
      sweeps.forEach((sw) => {
        ctx.fillStyle = sw.color;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        sw.pts.forEach((p) => ctx.lineTo(cx + p.x, cy + p.y));
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = sw.color.replace(/[\d.]+\)/, "0.8)");
        ctx.lineWidth = 0.6;
        ctx.stroke();
      });

      // Current position
      const p = orbitPos(meanAnomaly);

      // Accumulate sweep
      sweepAccumulator.push(p);
      if (meanAnomaly - lastSweepAt >= sweepInterval) {
        sweeps.push({
          pts: sweepAccumulator.slice(),
          color: colors[colorIdx % colors.length],
        });
        colorIdx++;
        sweepAccumulator = [p];
        lastSweepAt = meanAnomaly;
      }

      // Draw current sweep in progress
      if (sweepAccumulator.length > 1) {
        ctx.fillStyle = colors[colorIdx % colors.length];
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        sweepAccumulator.forEach((pp) => ctx.lineTo(cx + pp.x, cy + pp.y));
        ctx.closePath();
        ctx.fill();
      }

      // Star at focus
      ctx.fillStyle = "#e08030";
      ctx.beginPath();
      ctx.arc(cx, cy, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#fbfaf7";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Planet
      ctx.fillStyle = "#1a1a1a";
      ctx.beginPath();
      ctx.arc(cx + p.x, cy + p.y, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#fbfaf7";
      ctx.stroke();

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
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
        }}
      />
      <div className="controls">
        <label>
          <span className="ctrl-label">Excentricidade — {e.toFixed(2)}</span>
          <input
            type="range"
            min={0}
            max={0.85}
            step={0.01}
            value={e}
            onChange={(ev) => setE(parseFloat(ev.target.value))}
          />
        </label>
        <button onClick={() => setRunning((r) => !r)}>
          {running ? "Pausar" : "Retomar"}
        </button>
      </div>
    </div>
  );
}
