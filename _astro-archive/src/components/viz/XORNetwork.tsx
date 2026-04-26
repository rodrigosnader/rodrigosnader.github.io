import { useEffect, useRef, useState } from "react";

// Live-training tiny MLP (2→6→1) on XOR.
// Shows decision boundary, network diagram with weight thickness, and loss curve.

type Net = {
  W1: number[][]; // [6][2]
  b1: number[]; // [6]
  W2: number[]; // [6]
  b2: number;
};

const tanh = Math.tanh;
const dtanh = (t: number) => 1 - t * t;
const sigmoid = (z: number) => 1 / (1 + Math.exp(-z));

function initNet(seed = 1): Net {
  // Simple LCG for reproducibility
  let s = seed;
  const rand = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return (s / 0x100000000) * 2 - 1;
  };
  return {
    W1: Array.from({ length: 6 }, () => [rand(), rand()]),
    b1: Array.from({ length: 6 }, () => rand() * 0.1),
    W2: Array.from({ length: 6 }, () => rand()),
    b2: rand() * 0.1,
  };
}

function forward(net: Net, x1: number, x2: number) {
  const h = net.W1.map((w, i) => tanh(w[0] * x1 + w[1] * x2 + net.b1[i]));
  const z2 = h.reduce((s, hi, i) => s + hi * net.W2[i], net.b2);
  const y = sigmoid(z2);
  return { h, y };
}

function trainStep(net: Net, data: [number, number, number][], lr: number) {
  // Full-batch gradient descent on cross entropy
  const n = data.length;
  const gW1 = net.W1.map((w) => w.map(() => 0));
  const gb1 = net.b1.map(() => 0);
  const gW2 = net.W2.map(() => 0);
  let gb2 = 0;
  let loss = 0;

  for (const [x1, x2, t] of data) {
    const { h, y } = forward(net, x1, x2);
    const eps = 1e-7;
    loss += -(t * Math.log(y + eps) + (1 - t) * Math.log(1 - y + eps));
    const dz2 = y - t;
    gb2 += dz2;
    for (let i = 0; i < 6; i++) {
      gW2[i] += dz2 * h[i];
      const dh = dz2 * net.W2[i] * dtanh(h[i]);
      gW1[i][0] += dh * x1;
      gW1[i][1] += dh * x2;
      gb1[i] += dh;
    }
  }

  for (let i = 0; i < 6; i++) {
    net.W2[i] -= (lr * gW2[i]) / n;
    net.b1[i] -= (lr * gb1[i]) / n;
    net.W1[i][0] -= (lr * gW1[i][0]) / n;
    net.W1[i][1] -= (lr * gW1[i][1]) / n;
  }
  net.b2 -= (lr * gb2) / n;
  return loss / n;
}

const xorData: [number, number, number][] = [
  [0, 0, 0],
  [0, 1, 1],
  [1, 0, 1],
  [1, 1, 0],
];

export default function XORNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const netRef = useRef<Net>(initNet(42));
  const lossHistRef = useRef<number[]>([]);
  const stepCountRef = useRef(0);
  const runningRef = useRef(true);
  const [running, setRunning] = useState(true);
  const [, setTick] = useState(0);

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

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.fillStyle = "#fbfaf7";
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Layout: left panel = decision boundary, middle = network diagram, right = loss curve
      const colW = rect.width / 3;

      // ---- LEFT: decision boundary ----
      const lx = 20;
      const ly = 40;
      const lw = colW - 40;
      const lh = rect.height - 60;

      // Sample grid
      const res = 36;
      const cell = lw / res;
      for (let i = 0; i < res; i++) {
        for (let j = 0; j < res; j++) {
          const x1 = i / (res - 1);
          const x2 = 1 - j / (res - 1);
          const { y } = forward(netRef.current, x1, x2);
          const blue = [26, 74, 122];
          const orange = [181, 83, 42];
          const r = Math.round(blue[0] * (1 - y) + orange[0] * y);
          const g = Math.round(blue[1] * (1 - y) + orange[1] * y);
          const b = Math.round(blue[2] * (1 - y) + orange[2] * y);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.45)`;
          ctx.fillRect(lx + i * cell, ly + j * (lh / res), cell + 1, lh / res + 1);
        }
      }
      // Border
      ctx.strokeStyle = "#c8c0a8";
      ctx.lineWidth = 1;
      ctx.strokeRect(lx, ly, lw, lh);
      // XOR points
      for (const [x1, x2, t] of xorData) {
        const px = lx + x1 * lw;
        const py = ly + (1 - x2) * lh;
        ctx.fillStyle = t === 0 ? "#1a4a7a" : "#b5532a";
        ctx.beginPath();
        ctx.arc(px, py, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#fbfaf7";
        ctx.lineWidth = 2.5;
        ctx.stroke();
      }
      ctx.fillStyle = "#7a7368";
      ctx.font = "11px Inter, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("fronteira de decisão", lx, 22);

      // ---- MIDDLE: network diagram ----
      const mx = colW + 10;
      const my = 40;
      const mw = colW - 20;
      const mh = rect.height - 60;

      const net = netRef.current;
      const inY = [my + mh * 0.35, my + mh * 0.65];
      const hX = mx + mw * 0.5;
      const hStep = mh / 7;
      const hY = Array.from({ length: 6 }, (_, i) => my + hStep * (i + 1));
      const outX = mx + mw - 16;
      const outY = my + mh * 0.5;
      const inX = mx + 16;

      // Edges: input -> hidden
      for (let i = 0; i < 6; i++) {
        for (let k = 0; k < 2; k++) {
          const w = net.W1[i][k];
          const abs = Math.min(Math.abs(w), 4);
          ctx.strokeStyle = w > 0 ? "rgba(181, 83, 42, 0.75)" : "rgba(26, 74, 122, 0.75)";
          ctx.lineWidth = 0.5 + abs * 1.2;
          ctx.beginPath();
          ctx.moveTo(inX, inY[k]);
          ctx.lineTo(hX, hY[i]);
          ctx.stroke();
        }
      }
      // Edges: hidden -> output
      for (let i = 0; i < 6; i++) {
        const w = net.W2[i];
        const abs = Math.min(Math.abs(w), 4);
        ctx.strokeStyle = w > 0 ? "rgba(181, 83, 42, 0.75)" : "rgba(26, 74, 122, 0.75)";
        ctx.lineWidth = 0.5 + abs * 1.2;
        ctx.beginPath();
        ctx.moveTo(hX, hY[i]);
        ctx.lineTo(outX, outY);
        ctx.stroke();
      }
      // Nodes
      const node = (x: number, y: number, label: string) => {
        ctx.fillStyle = "#fbfaf7";
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#1a1a1a";
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.fillStyle = "#1a1a1a";
        ctx.font = "10px JetBrains Mono, monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(label, x, y);
      };
      node(inX, inY[0], "x₁");
      node(inX, inY[1], "x₂");
      for (let i = 0; i < 6; i++) node(hX, hY[i], "");
      node(outX, outY, "ŷ");
      ctx.textAlign = "left";
      ctx.textBaseline = "alphabetic";
      ctx.fillStyle = "#7a7368";
      ctx.font = "11px Inter, sans-serif";
      ctx.fillText("arquitetura 2 → 6 → 1", mx, 22);

      // ---- RIGHT: loss curve ----
      const rx = 2 * colW + 20;
      const ry = 40;
      const rw = colW - 40;
      const rh = rect.height - 60;
      ctx.strokeStyle = "#c8c0a8";
      ctx.lineWidth = 1;
      ctx.strokeRect(rx, ry, rw, rh);

      const hist = lossHistRef.current;
      if (hist.length > 1) {
        const maxL = Math.max(...hist.slice(0, Math.min(hist.length, 30)), 0.8);
        ctx.strokeStyle = "#b5532a";
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        hist.forEach((l, i) => {
          const px = rx + (i / Math.max(hist.length - 1, 1)) * rw;
          const py = ry + rh - Math.min(l / maxL, 1) * rh;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        });
        ctx.stroke();
      }
      ctx.fillStyle = "#7a7368";
      ctx.font = "11px Inter, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("perda (cross-entropy)", rx, 22);
      const curLoss = hist.length ? hist[hist.length - 1] : 0;
      ctx.fillStyle = "#3a3a3a";
      ctx.font = "11px JetBrains Mono, monospace";
      ctx.fillText(
        `step ${stepCountRef.current}  L=${curLoss.toFixed(4)}`,
        rx,
        ry + rh + 22
      );
    };

    let raf = 0;
    const loop = () => {
      if (runningRef.current) {
        for (let i = 0; i < 5; i++) {
          const L = trainStep(netRef.current, xorData, 1.2);
          stepCountRef.current++;
          if (stepCountRef.current % 5 === 0) {
            lossHistRef.current.push(L);
            if (lossHistRef.current.length > 220) lossHistRef.current.shift();
          }
        }
      }
      draw();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const reset = () => {
    netRef.current = initNet(Math.floor(Math.random() * 10000));
    lossHistRef.current = [];
    stepCountRef.current = 0;
    setTick((t) => t + 1);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "360px",
          display: "block",
          borderRadius: "3px",
        }}
      />
      <div className="controls">
        <button onClick={() => setRunning((r) => !r)}>
          {running ? "Pausar" : "Treinar"}
        </button>
        <button className="ghost" onClick={reset}>
          Novos pesos aleatórios
        </button>
      </div>
    </div>
  );
}
