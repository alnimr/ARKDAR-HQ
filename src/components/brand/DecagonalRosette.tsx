"use client";

import { useEffect, useRef } from "react";

type DecagonalRosetteProps = {
  layers?: number;
  size?: number;
  opacity?: number;
};

export function DecagonalRosette({
  layers = 5,
  size = 300,
  opacity = 1,
}: DecagonalRosetteProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const cx = size / 2;
    const cy = size / 2;
    const maxR = size * 0.44;
    let t = 0;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, size, size);
      for (let layer = layers; layer >= 1; layer--) {
        const prog = layer / layers;
        const r = maxR * prog;
        const alpha = (1 - prog * 0.38) * opacity;
        const n = 10;
        const step = (Math.PI * 2) / n;
        const rot = t * 0.003 * (layer % 2 === 0 ? 1 : -1) + layer * (Math.PI / n);
        for (let i = 0; i < n; i++) {
          const a0 = i * step + rot;
          const a1 = (i + 1) * step + rot;
          const px0 = cx + Math.cos(a0) * r;
          const py0 = cy + Math.sin(a0) * r;
          const px1 = cx + Math.cos(a1) * r;
          const py1 = cy + Math.sin(a1) * r;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(px0, py0);
          ctx.lineTo(px1, py1);
          ctx.closePath();
          ctx.strokeStyle = `rgba(184,146,42,${alpha * 0.55})`;
          ctx.lineWidth = 0.55;
          ctx.stroke();
          const aMid = (a0 + a1) / 2;
          const px = cx + Math.cos(aMid) * r * 1.18;
          const py = cy + Math.sin(aMid) * r * 1.18;
          ctx.strokeStyle = `rgba(${layer <= 2 ? "212,175,106" : "184,146,42"},${alpha * 0.78})`;
          ctx.lineWidth = 0.85;
          ctx.beginPath();
          ctx.moveTo(px0, py0);
          ctx.lineTo(px, py);
          ctx.lineTo(px1, py1);
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(107,81,25,${alpha * 0.25})`;
        ctx.lineWidth = 0.3;
        ctx.stroke();
      }
      const cR = maxR * 0.11 * (Math.sin(t * 0.038) * 0.07 + 1);
      ctx.beginPath();
      for (let i = 0; i < 20; i++) {
        const a = i * ((Math.PI * 2) / 20) + t * 0.005;
        const rad = i % 2 === 0 ? cR : cR * 0.45;
        i === 0
          ? ctx.moveTo(cx + Math.cos(a) * rad, cy + Math.sin(a) * rad)
          : ctx.lineTo(cx + Math.cos(a) * rad, cy + Math.sin(a) * rad);
      }
      ctx.closePath();
      ctx.strokeStyle = "rgba(212,175,106,0.9)";
      ctx.lineWidth = 1.0;
      ctx.stroke();
      ctx.fillStyle = "rgba(184,146,42,0.1)";
      ctx.fill();
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 18);
      g.addColorStop(0, "rgba(212,175,106,0.75)");
      g.addColorStop(1, "rgba(184,146,42,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#D4AF6A";
      ctx.beginPath();
      ctx.arc(cx, cy, 2.8, 0, Math.PI * 2);
      ctx.fill();
    }

    function frame() {
      t++;
      draw();
      animRef.current = requestAnimationFrame(frame);
    }
    animRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animRef.current);
  }, [layers, size, opacity]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      aria-hidden="true"
      style={{ display: "block" }}
    />
  );
}
