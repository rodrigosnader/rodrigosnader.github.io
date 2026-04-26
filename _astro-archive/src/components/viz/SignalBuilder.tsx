import { useEffect, useRef, useState } from "react";

// Build a waveform from 4 sine harmonics with user-controlled amplitudes.

export default function SignalBuilder() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [amps, setAmps] = useState([0.8, 0.0, 0.4, 0.0]);

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

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;
      ctx.fillStyle = "#fbfaf7";
      ctx.fillRect(0, 0, W, H);

      const margin = 40;
      const halfH = (H - margin * 2) / 2;
      const plotW = W - margin * 2;

      // Center line
      ctx.strokeStyle = "#c8c0a8";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(margin, margin + halfH);
      ctx.lineTo(W - margin, margin + halfH);
      ctx.stroke();

      // Individual harmonics
      const colors = ["#1a4a7a", "#629555", "#a870a0", "#b5532a"];
      for (let h = 0; h < 4; h++) {
        ctx.strokeStyle = colors[h] + "66";
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i <= 400; i++) {
          const x = (i / 400) * Math.PI * 4;
          const y = amps[h] * Math.sin((h + 1) * x);
          const px = margin + (i / 400) * plotW;
          const py = margin + halfH - y * halfH * 0.45;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }

      // Sum
      ctx.strokeStyle = "#1a1a1a";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let i = 0; i <= 800; i++) {
        const x = (i / 800) * Math.PI * 4;
        let y = 0;
        for (let h = 0; h < 4; h++) y += amps[h] * Math.sin((h + 1) * x);
        const px = margin + (i / 800) * plotW;
        const py = margin + halfH - y * halfH * 0.45;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      // Label
      ctx.fillStyle = "#7a7368";
      ctx.font = "11px Inter, sans-serif";
      ctx.fillText("soma (preto)", margin, 22);
    };

    resize();
    window.addEventListener("resize", resize);
    draw();
    return () => window.removeEventListener("resize", resize);
  }, [amps]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "300px", display: "block", borderRadius: "3px" }}
      />
      <div className="controls">
        {amps.map((a, i) => (
          <label key={i}>
            <span className="ctrl-label" style={{ color: ["#1a4a7a", "#629555", "#a870a0", "#b5532a"][i] }}>
              amplitude {i + 1}× — {a.toFixed(2)}
            </span>
            <input
              type="range"
              min={-1}
              max={1}
              step={0.02}
              value={a}
              onChange={(e) => {
                const next = amps.slice();
                next[i] = parseFloat(e.target.value);
                setAmps(next);
              }}
            />
          </label>
        ))}
      </div>
    </div>
  );
}
