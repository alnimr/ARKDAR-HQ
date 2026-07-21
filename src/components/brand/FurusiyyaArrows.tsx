"use client";

import { useEffect, useRef } from "react";

type Arrow = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  trail: { x: number; y: number }[];
  maxTrail: number;
  alpha: number;
  tier: number;
  phase: number;
};

type FurusiyyaArrowsProps = {
  count?: number;
  speed?: number;
  gravity?: number;
};

export function FurusiyyaArrows({
  count = 10,
  speed = 1.4,
  gravity = 0.042,
}: FurusiyyaArrowsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width;
    const H = canvas.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function mkArrow(i: number): Arrow {
      const angle = (-(12 + Math.random() * 32) * Math.PI) / 180;
      const v0 = speed * (3 + Math.random() * 2.2);
      return {
        x: -20,
        y: H * (0.2 + (i / count) * 0.55),
        vx: Math.cos(angle) * v0,
        vy: Math.sin(angle) * v0,
        trail: [],
        maxTrail: 70 + Math.random() * 50,
        alpha: 0.45 + Math.random() * 0.55,
        tier: Math.random(),
        phase: Math.random() * 180,
      };
    }

    const arrows: Arrow[] = Array.from({ length: count }, (_, i) => mkArrow(i));
    let t = 0;
    ctx.fillStyle = "#0D0B08";
    ctx.fillRect(0, 0, W, H);

    function frame() {
      if (!ctx) return;
      t++;
      ctx.fillStyle = "rgba(13,11,8,0.13)";
      ctx.fillRect(0, 0, W, H);
      for (let i = 0; i < arrows.length; i++) {
        const ar = arrows[i];
        if (t < ar.phase) continue;
        ar.vy += gravity;
        ar.x += ar.vx;
        ar.y += ar.vy;
        ar.trail.push({ x: ar.x, y: ar.y });
        if (ar.trail.length > ar.maxTrail) ar.trail.shift();
        if (ar.x > W + 60 || ar.y > H + 60) {
          arrows[i] = mkArrow(i);
          arrows[i].phase = 0;
          continue;
        }
        for (let j = 1; j < ar.trail.length; j++) {
          const p = j / ar.trail.length;
          const a =
            p * ar.alpha * (ar.tier > 0.62 ? 0.85 : ar.tier > 0.32 ? 0.42 : 0.14);
          const [r, g, b] =
            ar.tier > 0.62
              ? [184, 146, 42]
              : ar.tier > 0.32
                ? [212, 175, 106]
                : [242, 235, 217];
          ctx.strokeStyle = `rgba(${r},${g},${b},${a})`;
          ctx.lineWidth = p * (ar.tier > 0.62 ? 1.5 : 0.75);
          ctx.beginPath();
          ctx.moveTo(ar.trail[j - 1].x, ar.trail[j - 1].y);
          ctx.lineTo(ar.trail[j].x, ar.trail[j].y);
          ctx.stroke();
        }
      }
      animRef.current = requestAnimationFrame(frame);
    }
    animRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animRef.current);
  }, [count, speed, gravity]);

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
