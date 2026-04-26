import { useEffect, useRef, useState } from "react";

// Kepler's third law: T^2 proportional to a^3.
// Left panel: several circular orbits at different radii, each planet moving.
// Right panel: log-log plot of T vs a, with points falling on the T^2 = a^3 line.

type Planet = {
  a: number; // semi-major axis (px)
  theta: number;
  color: string;
  name: string;
};

export default function KeplersThird() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [speed, setSpeed] = useState(1);
  const speedRef = useRef(speed);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

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

    const planets: Planet[] = [
      { a: 45, theta: 0, color: "#b5532a", name: "I" },
      { a: 75, theta: 1.2, color: "#1a4a7a", name: "II" },
      { a: 110, theta: 2.4, color: "#629555", name: "III" },
      { a: 150, theta: 3.1, color: "#a870a0", name: "IV" },
    ];

    let last = performance.now();
    let raf = 0;
    const loop = (t: number) => {
      const dt = Math.min((t - last) / 1000, 0.05);
      last = t;

      const rect = canvas.getBoundingClientRect();
      ctx.fillStyle = "#fbfaf7";
      ctx.fillRect(0, 0, rect.width, rect.height);

      const leftW = rect.width * 0.5;
      const rightW = rect.width - leftW;
      const cx = leftW / 2;
      const cy = rect.height / 2;

      // Divider
      ctx.strokeStyle = "#e6e2d6";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(leftW, 20);
      ctx.lineTo(leftW, rect.height - 20);
      ctx.stroke();

      // LEFT: orbits
      ctx.strokeStyle = "#eae5d5";
      ctx.lineWidth = 1;
      planets.forEach((p) => {
        ctx.beginPath();
        ctx.arc(cx, cy, p.a, 0, Math.PI * 2);
        ctx.stroke();
      });

      ctx.fillStyle = "#e08030";
      ctx.beginPath();
      ctx.arc(cx, cy, 7, 0, Math.PI * 2);
      ctx.fill();

      // Update planets; angular speed ∝ a^(-3/2) (Kepler's third law)
      planets.forEach((p) => {
        const omega = Math.pow(80 / p.a, 1.5) * 0.8 * speedRef.current;
        p.theta += omega * dt;
      });

      planets.forEach((p) => {
        const px = cx + Math.cos(p.theta) * p.a;
        const py = cy + Math.sin(p.theta) * p.a;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(px, py, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#fbfaf7";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // RIGHT: log-log plot
      const px0 = leftW + 50;
      const py0 = rect.height - 50;
      const pw = rightW - 80;
      const ph = rect.height - 100;

      // Axes
      ctx.strokeStyle = "#c8c0a8";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(px0, py0 - ph);
      ctx.lineTo(px0, py0);
      ctx.lineTo(px0 + pw, py0);
      ctx.stroke();

      // Grid lines
      ctx.strokeStyle = "#eae5d5";
      for (let i = 1; i <= 4; i++) {
        const y = py0 - (i / 4) * ph;
        ctx.beginPath();
        ctx.moveTo(px0, y);
        ctx.lineTo(px0 + pw, y);
        ctx.stroke();
        const x = px0 + (i / 4) * pw;
        ctx.beginPath();
        ctx.moveTo(x, py0 - ph);
        ctx.lineTo(x, py0);
        ctx.stroke();
      }

      // Axis labels
      ctx.fillStyle = "#7a7368";
      ctx.font = "11px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("log a  (distância)", px0 + pw / 2, py0 + 28);
      ctx.save();
      ctx.translate(px0 - 32, py0 - ph / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText("log T  (período)", 0, 0);
      ctx.restore();

      // Map a -> x in plot (log scale: use log(a/minA))
      const minA = 30;
      const maxA = 180;
      const aToX = (a: number) =>
        px0 +
        ((Math.log(a) - Math.log(minA)) / (Math.log(maxA) - Math.log(minA))) * pw;
      // T ∝ a^(3/2); plot log T vs log a -> slope 3/2 line
      const aToY = (a: number) => {
        const T = Math.pow(a, 1.5);
        const minT = Math.pow(minA, 1.5);
        const maxT = Math.pow(maxA, 1.5);
        return (
          py0 -
          ((Math.log(T) - Math.log(minT)) / (Math.log(maxT) - Math.log(minT))) *
            ph
        );
      };

      // Reference line
      ctx.strokeStyle = "#b5532a";
      ctx.lineWidth = 1.2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(aToX(minA), aToY(minA));
      ctx.lineTo(aToX(maxA), aToY(maxA));
      ctx.stroke();
      ctx.setLineDash([]);

      // Equation label
      ctx.fillStyle = "#b5532a";
      ctx.font = "italic 12px Source Serif 4, serif";
      ctx.textAlign = "left";
      ctx.fillText("T² ∝ a³", aToX(maxA) - 60, aToY(maxA) - 12);

      // Plot each planet
      planets.forEach((p) => {
        const x = aToX(p.a);
        const y = aToY(p.a);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#fbfaf7";
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.fillStyle = "#3a3a3a";
        ctx.font = "11px Inter, sans-serif";
        ctx.textAlign = "left";
        ctx.fillText(p.name, x + 9, y + 4);
      });

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
          <span className="ctrl-label">Velocidade do tempo — {speed.toFixed(1)}×</span>
          <input
            type="range"
            min={0.2}
            max={4}
            step={0.1}
            value={speed}
            onChange={(ev) => setSpeed(parseFloat(ev.target.value))}
          />
        </label>
      </div>
    </div>
  );
}
