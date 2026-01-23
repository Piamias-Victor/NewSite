"use client";

import { useEffect, useRef } from "react";

export function ModernBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    // Configuration
    const stars: { x: number; y: number; s: number; alpha: number }[] = [];
    const numStars = 50;

    // Initialize stars (dots)
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        s: Math.random() * 2,
        alpha: Math.random(),
      });
    }

    const render = () => {
      t += 0.005;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // 1. WAVE / GRADIENT BACKGROUND
      // Create a deeply layered gradient background
      const gradient = ctx.createLinearGradient(0, 0, w, h);
      gradient.addColorStop(0, "rgba(20, 15, 12, 1)"); // Darker base
      gradient.addColorStop(0.5, "rgba(35, 20, 15, 1)"); // Cuivre dark hint
      gradient.addColorStop(1, "rgba(20, 15, 12, 1)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      // 2. ANIMATED ORBS (The "Modern" colorful parts)
      const colors = ["200, 80, 60", "210, 120, 80", "240, 180, 140"]; // Cuivre, Bronze, Or Rose

      colors.forEach((color, i) => {
        const x = w * 0.5 + Math.cos(t * 0.5 + i) * (w * 0.3);
        const y = h * 0.5 + Math.sin(t * 0.3 + i) * (h * 0.3);
        const radius = w * 0.4;
        
        const orb = ctx.createRadialGradient(x, y, 0, x, y, radius);
        orb.addColorStop(0, `rgba(${color}, 0.15)`);
        orb.addColorStop(1, "rgba(0,0,0,0)");
        
        ctx.fillStyle = orb;
        ctx.globalCompositeOperation = "screen";
        ctx.fillRect(0, 0, w, h);
      });

      // 3. GRID DOTS PATTERN
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
      const gridSize = 40;
      
      for(let x = 0; x < w; x += gridSize) {
        for(let y = 0; y < h; y += gridSize) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

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
      className="fixed inset-0 -z-50 h-full w-full pointer-events-none"
    />
  );
}
