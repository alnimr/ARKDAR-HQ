"use client";

import { useEffect, useRef } from "react";

type GirihBackgroundProps = {
  opacity?: number;
  scale?: number;
  animate?: boolean;
};

export function GirihBackground({
  opacity = 0.1,
  scale = 1,
  animate = true,
}: GirihBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let t = 0;

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const R = 52 * scale;
      const r = R * Math.cos(Math.PI / 5);
      const W = canvas.width;
      const H = canvas.height;
      const breathe = Math.sin(t * 0.005) * 0.008 + 1;
      ctx.save();
      ctx.translate(W / 2, H / 2);
      for (let row = -6; row <= 6; row++) {
        for (let col = -9; col <= 9; col++) {
          const ox = col * r * 2 + (row % 2) * r;
          const oy = row * R * 1.538;
          const dist = Math.hypot(ox, oy);
          const maxD = Math.max(W, H) * 0.7;
          if (dist > maxD) continue;
          const fade = Math.pow(1 - dist / maxD, 1.3);
          const wave = Math.sin(dist * 0.016 - t * 0.008) * 0.28 + 0.72;
          const a = fade * wave * opacity;
          const n = 10;
          const step = (Math.PI * 2) / n;
          const rot = (row + col) % 2 === 0 ? 0 : step / 2;
          ctx.beginPath();
          for (let i = 0; i < n; i++) {
            const ang = i * step + rot - Math.PI / 2;
            const x = ox + Math.cos(ang) * R * breathe;
            const y = oy + Math.sin(ang) * R * breathe;
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.strokeStyle = `rgba(184,146,42,${a * 0.85})`;
          ctx.lineWidth = 0.9;
          ctx.stroke();
          ctx.fillStyle = `rgba(107,81,25,${a * 0.04})`;
          ctx.fill();
        }
      }
      ctx.restore();
    }

    function frame() {
      if (animate) t++;
      draw();
      animRef.current = requestAnimationFrame(frame);
    }
    animRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animRef.current);
  }, [opacity, scale, animate]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}
