"use client";

import { useEffect, useRef } from "react";

export function GradientMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let t = 0;

    // Resize handler
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    // Color configuration (Cuivre Brillant)
    const colors: { r: number; g: number; b: number }[] = [
      { r: 200, g: 80, b: 60 },   // Cuivre
      { r: 210, g: 120, b: 80 },  // Bronze
      { r: 240, g: 180, b: 140 }, // Or Rose
    ];

    const render = () => {
      t += 0.002;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create gradient blobs
      const w = canvas.width;
      const h = canvas.height;

      const c1 = colors[0]!;
      const c2 = colors[1]!;
      const c3 = colors[2]!;

      // Blob 1 - Top Left (Cuivre)
      const grad1 = ctx.createRadialGradient(
        w * 0.2 + Math.cos(t) * 100,
        h * 0.2 + Math.sin(t * 1.2) * 100,
        0,
        w * 0.2 + Math.cos(t) * 100,
        h * 0.2 + Math.sin(t * 1.2) * 100,
        w * 0.8
      );
      grad1.addColorStop(0, `rgba(${c1.r}, ${c1.g}, ${c1.b}, 0.15)`);
      grad1.addColorStop(1, "rgba(0,0,0,0)");

      // Blob 2 - Bottom Right (Bronze)
      const grad2 = ctx.createRadialGradient(
        w * 0.8 - Math.cos(t * 0.8) * 100,
        h * 0.8 - Math.sin(t) * 100,
        0,
        w * 0.8 - Math.cos(t * 0.8) * 100,
        h * 0.8 - Math.sin(t) * 100,
        w * 0.8
      );
      grad2.addColorStop(0, `rgba(${c2.r}, ${c2.g}, ${c2.b}, 0.15)`);
      grad2.addColorStop(1, "rgba(0,0,0,0)");

      // Blob 3 - Center (Or Rose)
      const grad3 = ctx.createRadialGradient(
        w * 0.5 + Math.sin(t * 1.5) * 50,
        h * 0.5 + Math.cos(t * 0.5) * 50,
        0,
        w * 0.5 + Math.sin(t * 1.5) * 50,
        h * 0.5 + Math.cos(t * 0.5) * 50,
        w * 0.6
      );
      grad3.addColorStop(0, `rgba(${c3.r}, ${c3.g}, ${c3.b}, 0.1)`);
      grad3.addColorStop(1, "rgba(0,0,0,0)");

      // Draw gradients
      ctx.globalCompositeOperation = "screen";
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = grad3;
      ctx.fillRect(0, 0, w, h);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 -z-10 h-full w-full opacity-60 mix-blend-screen pointer-events-none"
    />
  );
}
