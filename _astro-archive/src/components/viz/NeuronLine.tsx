import { useState, useMemo } from "react";

// Single neuron with two inputs: y = sigmoid(w1*x1 + w2*x2 + b)
// Visualized as a colored 2D plane with the linear decision boundary.

export default function NeuronLine() {
  const [w1, setW1] = useState(1.4);
  const [w2, setW2] = useState(-1);
  const [b, setB] = useState(0.2);

  const W = 520;
  const H = 340;
  const xMin = -3;
  const xMax = 3;
  const yMin = -2;
  const yMax = 2;

  const toPx = (x: number, y: number) => {
    const px = ((x - xMin) / (xMax - xMin)) * W;
    const py = H - ((y - yMin) / (yMax - yMin)) * H;
    return [px, py] as const;
  };

  // Decision boundary: w1*x1 + w2*x2 + b = 0 → x2 = -(w1*x1 + b) / w2
  const line = useMemo(() => {
    if (Math.abs(w2) < 0.01) {
      const x = -b / w1;
      return { x1: x, y1: yMin, x2: x, y2: yMax };
    }
    const y_left = -(w1 * xMin + b) / w2;
    const y_right = -(w1 * xMax + b) / w2;
    return { x1: xMin, y1: y_left, x2: xMax, y2: y_right };
  }, [w1, w2, b]);

  // Sample grid to color the plane
  const tiles: { x: number; y: number; v: number }[] = useMemo(() => {
    const result = [];
    const nx = 40;
    const ny = 26;
    for (let i = 0; i < nx; i++) {
      for (let j = 0; j < ny; j++) {
        const x = xMin + ((i + 0.5) / nx) * (xMax - xMin);
        const y = yMin + ((j + 0.5) / ny) * (yMax - yMin);
        const z = w1 * x + w2 * y + b;
        const s = 1 / (1 + Math.exp(-z * 2));
        result.push({ x, y, v: s });
      }
    }
    return result;
  }, [w1, w2, b]);

  const points = [
    { x: -1.5, y: 0.8, label: 0 },
    { x: -1.2, y: 1.3, label: 0 },
    { x: -2, y: 0.2, label: 0 },
    { x: -0.6, y: 1.1, label: 0 },
    { x: 1.3, y: -0.6, label: 1 },
    { x: 1.8, y: -1.1, label: 1 },
    { x: 0.8, y: -1.3, label: 1 },
    { x: 2.1, y: -0.2, label: 1 },
  ];

  const [l1x, l1y] = toPx(line.x1, line.y1);
  const [l2x, l2y] = toPx(line.x2, line.y2);

  const tileW = W / 40 + 1;
  const tileH = H / 26 + 1;

  const tileColor = (v: number) => {
    const blue = [26, 74, 122];
    const orange = [181, 83, 42];
    const r = Math.round(blue[0] * (1 - v) + orange[0] * v);
    const g = Math.round(blue[1] * (1 - v) + orange[1] * v);
    const bb = Math.round(blue[2] * (1 - v) + orange[2] * v);
    return `rgba(${r}, ${g}, ${bb}, 0.22)`;
  };

  return (
    <div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: "100%", height: "auto", display: "block", background: "#fbfaf7" }}
      >
        {tiles.map((t, i) => {
          const [px, py] = toPx(t.x, t.y);
          return (
            <rect
              key={i}
              x={px - tileW / 2}
              y={py - tileH / 2}
              width={tileW}
              height={tileH}
              fill={tileColor(t.v)}
            />
          );
        })}
        <line
          x1={l1x}
          y1={l1y}
          x2={l2x}
          y2={l2y}
          stroke="#1a1a1a"
          strokeWidth={2}
        />
        {points.map((p, i) => {
          const [px, py] = toPx(p.x, p.y);
          return (
            <circle
              key={i}
              cx={px}
              cy={py}
              r={7}
              fill={p.label === 0 ? "#1a4a7a" : "#b5532a"}
              stroke="#fbfaf7"
              strokeWidth={2}
            />
          );
        })}
        <text
          x={12}
          y={22}
          fontFamily="JetBrains Mono, monospace"
          fontSize={13}
          fill="#3a3a3a"
        >
          {`y = σ(${w1.toFixed(2)}·x₁ + ${w2.toFixed(2)}·x₂ + ${b.toFixed(2)})`}
        </text>
      </svg>
      <div className="controls">
        <label>
          <span className="ctrl-label">peso w₁ — {w1.toFixed(2)}</span>
          <input type="range" min={-3} max={3} step={0.05} value={w1} onChange={(e) => setW1(parseFloat(e.target.value))} />
        </label>
        <label>
          <span className="ctrl-label">peso w₂ — {w2.toFixed(2)}</span>
          <input type="range" min={-3} max={3} step={0.05} value={w2} onChange={(e) => setW2(parseFloat(e.target.value))} />
        </label>
        <label>
          <span className="ctrl-label">viés b — {b.toFixed(2)}</span>
          <input type="range" min={-3} max={3} step={0.05} value={b} onChange={(e) => setB(parseFloat(e.target.value))} />
        </label>
      </div>
    </div>
  );
}
