import { useEffect, useRef, useState } from "react";

// Draw a closed curve with N rotating epicycles. We use the Discrete Fourier
// Transform of a sampled path to get the complex coefficients, then render
// the chain of rotating arrows that sums to the current point.

type Complex = { re: number; im: number };

function dft(samples: Complex[]): { freq: number; amp: number; phase: number }[] {
  const N = samples.length;
  const X: { freq: number; amp: number; phase: number }[] = [];
  for (let k = 0; k < N; k++) {
    let re = 0,
      im = 0;
    for (let n = 0; n < N; n++) {
      const phi = (2 * Math.PI * k * n) / N;
      re += samples[n].re * Math.cos(phi) + samples[n].im * Math.sin(phi);
      im += -samples[n].re * Math.sin(phi) + samples[n].im * Math.cos(phi);
    }
    re /= N;
    im /= N;
    const amp = Math.hypot(re, im);
    const phase = Math.atan2(im, re);
    // Frequency: for k > N/2, treat as negative
    const freq = k <= N / 2 ? k : k - N;
    X.push({ freq, amp, phase });
  }
  return X.sort((a, b) => b.amp - a.amp);
}

// Sample a parametric heart shape (famous Cardioid-ish)
function sampleHeart(n: number): Complex[] {
  const out: Complex[] = [];
  for (let i = 0; i < n; i++) {
    const t = (i / n) * Math.PI * 2;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y =
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t);
    out.push({ re: x * 8, im: -y * 8 });
  }
  return out;
}

export default function Epicycles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [n, setN] = useState(15);
  const [speed, setSpeed] = useState(1);
  const nRef = useRef(n);
  const speedRef = useRef(speed);
  const coefsRef = useRef<ReturnType<typeof dft>>([]);
  const trailRef = useRef<{ x: number; y: number }[]>([]);
  const tRef = useRef(0);

  useEffect(() => {
    nRef.current = n;
    trailRef.current = [];
    tRef.current = 0;
  }, [n]);
  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    coefsRef.current = dft(sampleHeart(200));
  }, []);

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
    const loop = () => {
      const rect = canvas.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      ctx.fillStyle = "#fbfaf7";
      ctx.fillRect(0, 0, rect.width, rect.height);

      const N = 200;
      const numCirc = Math.min(nRef.current, coefsRef.current.length);

      let x = cx;
      let y = cy;

      ctx.strokeStyle = "rgba(26, 74, 122, 0.35)";
      ctx.lineWidth = 1;
      ctx.fillStyle = "rgba(26, 74, 122, 0.04)";
      for (let i = 0; i < numCirc; i++) {
        const c = coefsRef.current[i];
        const angle = c.freq * tRef.current + c.phase;
        const prevX = x;
        const prevY = y;
        x += c.amp * Math.cos(angle);
        y += c.amp * Math.sin(angle);
        // Circle
        if (c.amp > 1) {
          ctx.beginPath();
          ctx.arc(prevX, prevY, c.amp, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }
        // Radius line
        ctx.strokeStyle = "rgba(26, 26, 26, 0.4)";
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.strokeStyle = "rgba(26, 74, 122, 0.35)";
      }

      trailRef.current.push({ x, y });
      if (trailRef.current.length > N * 2) trailRef.current.shift();

      // Trail
      ctx.strokeStyle = "#b5532a";
      ctx.lineWidth = 2;
      ctx.beginPath();
      trailRef.current.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.stroke();

      // Tip
      ctx.fillStyle = "#1a1a1a";
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();

      tRef.current += (speedRef.current * 2 * Math.PI) / N;
      if (tRef.current > Math.PI * 2 + 0.01) {
        tRef.current -= Math.PI * 2;
      }

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
        style={{ width: "100%", height: "420px", display: "block", borderRadius: "3px" }}
      />
      <div className="controls">
        <label>
          <span className="ctrl-label">círculos — {n}</span>
          <input
            type="range"
            min={1}
            max={80}
            step={1}
            value={n}
            onChange={(e) => setN(parseInt(e.target.value))}
          />
        </label>
        <label>
          <span className="ctrl-label">velocidade — {speed.toFixed(1)}×</span>
          <input
            type="range"
            min={0.2}
            max={3}
            step={0.1}
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
          />
        </label>
      </div>
    </div>
  );
}
