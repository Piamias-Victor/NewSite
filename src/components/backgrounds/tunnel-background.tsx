"use client";

import { useEffect, useRef } from "react";

export function TunnelBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrameId: number;

    // Configuration
    const tunnelColor = { r: 200, g: 80, b: 60 }; // Base copper
    const speed = 2;
    const fov = 300; // Field of view
    const numSquares = 30; // Number of tunnel segments
    const spaceBetween = 200; // Space between segments inside the tunnel (Z-depth)

    // State
    const squares: { z: number }[] = [];

    // Initialize squares distributed along Z-axis
    for (let i = 0; i < numSquares; i++) {
      squares.push({ z: i * spaceBetween });
    }

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", resize);
    resize();

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - width / 2) * 0.5;
      mouseY = (e.clientY - height / 2) * 0.5;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      // Fade effect for trails
      ctx.fillStyle = "rgba(10, 5, 3, 0.4)"; // Dark warm background with trail
      ctx.fillRect(0, 0, width, height);
      
      const cx = width / 2 + mouseX * 0.1;
      const cy = height / 2 + mouseY * 0.1;

      // Draw Tunnel
      ctx.lineWidth = 2;

      // Update and draw each square
      squares.forEach((sq, i) => {
        // Move towards camera
        sq.z -= speed;

        // Reset if behind camera
        if (sq.z <= 0) {
          sq.z = numSquares * spaceBetween;
        }

        // Perspective projection
        const scale = fov / (fov + sq.z);
        const nextSq = squares[(i + 1) % numSquares];
        // Only draw connectivity lines if next square is logically "behind" (higher Z) mostly
        // Simple wireframe tunnel: just draw rectangles

        const x = (width / 2 - cx) * scale + cx;
        const y = (height / 2 - cy) * scale + cy;
        
        // Base size of the tunnel square (world units)
        const size = 1000 * scale; 

        // Alpha based on depth (fog)
        const alpha = 1 - sq.z / (numSquares * spaceBetween);
        ctx.strokeStyle = `rgba(${tunnelColor.r}, ${tunnelColor.g}, ${tunnelColor.b}, ${alpha})`;

        ctx.beginPath();
        ctx.rect(x - size / 2, y - size / 2, size, size);
        ctx.stroke();

        // Optional: Diagonal connecting lines to create a "tube" feel
        // We can draw lines from corners of this rect to corners of the 'previous' rect in Z
        // Actually simpler: just draw lines from center? No, let's keep it clean squares first.
      });

      // Connecting lines (corners)
      // We draw 4 lines from center to corners to simulate the corners of the tunnel
      // But purely projected
      const maxDepth = numSquares * spaceBetween;
      const minScale = fov / (fov + maxDepth);
      const maxScale = fov / (fov + 100); // Close to camera

      // Draw 4 main perspective lines
      ctx.strokeStyle = `rgba(${tunnelColor.r}, ${tunnelColor.g}, ${tunnelColor.b}, 0.1)`;
      ctx.beginPath();
      
      // Top Left
      ctx.moveTo(cx, cy); // Vanishing point
      ctx.lineTo(0, 0); // Approximate... actually should trace corners of varying squares
      
      // Instead, let's just draw the squares, it looks more "holographic"
      
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      ctx.clearRect(0, 0, width, height);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-50 bg-black">
      <canvas ref={canvasRef} className="h-full w-full" />
      {/* Overlay Gradient for softness */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-background/50 to-background" />
    </div>
  );
}
