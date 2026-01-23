"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";
import { useTheme } from "next-themes";
import gsap from "gsap";

export function InfiniteTunnel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  // Refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const segmentsRef = useRef<THREE.Group[]>([]);
  const scrollPosRef = useRef(0);

  // Unsplash images - tech/abstract/pharma
  const IMAGE_URLS = [
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80", 
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1614850523060-8da1d56ae167?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1581093458791-9f302e68383e?auto=format&fit=crop&w=600&q=80",
  ];

  const CONFIG = {
    TUNNEL_WIDTH: 24, 
    TUNNEL_HEIGHT: 16,
    SEGMENT_DEPTH: 8, // Square-ish segments
    NUM_SEGMENTS: 16,   
    FOG_NEAR: 30,      
    FOG_FAR: 100,      
    SPEED: 0.15,
    // Grid settings
    WALL_ROWS: 3, // How many rows of tiles on the wall
    COLORS: {
      light: {
        bg: 0xffffff,
        fog: 0xffffff,
        lines: 0xffaa88, // Salmon/Copper tint
        linesOpacity: 0.5,
      },
      dark: {
        bg: 0x030303, 
        fog: 0x030303, 
        lines: 0xffdcb3, // Radiant Light Orange (Halo effect)
        linesOpacity: 0.25, 
      }
    }
  };

  const createSegment = (zPos: number) => {
    const group = new THREE.Group();
    group.position.z = zPos;

    const w = CONFIG.TUNNEL_WIDTH / 2;
    const h = CONFIG.TUNNEL_HEIGHT / 2;
    const d = CONFIG.SEGMENT_DEPTH;

    // --- 1. CLEAN GRID LINES ---
    // User said "too many lines everywhere", so we reduce to essential structure.
    
    const material = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.1
    });

    const points: THREE.Vector3[] = [];

    // A. Longitudinal Lines (The "Speed Lines" into depth)
    // Only corners + maybe one mid-line to define the rows
    const rowHeight = CONFIG.TUNNEL_HEIGHT / CONFIG.WALL_ROWS;
    
    // Corners
    points.push(new THREE.Vector3(-w, h, 0), new THREE.Vector3(-w, h, -d));
    points.push(new THREE.Vector3(w, h, 0), new THREE.Vector3(w, h, -d));
    points.push(new THREE.Vector3(w, -h, 0), new THREE.Vector3(w, -h, -d));
    points.push(new THREE.Vector3(-w, -h, 0), new THREE.Vector3(-w, -h, -d));

    // Horizontal Lines on Walls (Defining the rows)
    for (let i = 1; i < CONFIG.WALL_ROWS; i++) {
        const y = -h + (i * rowHeight);
        // Left Wall Line
        points.push(new THREE.Vector3(-w, y, 0), new THREE.Vector3(-w, y, -d));
        // Right Wall Line
        points.push(new THREE.Vector3(w, y, 0), new THREE.Vector3(w, y, -d));
    }
    
    // NO floor/ceiling rail lines (User wanted cleaner)

    // B. Latitudinal Lines (Ring at the far end of segment)
    // Only separate segments visually
    points.push(new THREE.Vector3(-w, h, -d), new THREE.Vector3(w, h, -d)); // Top
    points.push(new THREE.Vector3(w, h, -d), new THREE.Vector3(w, -h, -d)); // Right
    points.push(new THREE.Vector3(w, -h, -d), new THREE.Vector3(-w, -h, -d)); // Bottom
    points.push(new THREE.Vector3(-w, -h, -d), new THREE.Vector3(-w, h, -d)); // Left
    
    // Wall dividers (vertical lines on walls at end of segment)
    // To complete the "grid cell" look
    for (let i = 1; i < CONFIG.WALL_ROWS; i++) {
        const y = -h + (i * rowHeight);
        // We actually don't need extra geometry points if we just want a box, 
        // but for tile look, the "Ring" above handles the vertical cut.
        // We might want horizontal cuts on the ring too?
        // Let's keep it simple.
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const lines = new THREE.LineSegments(geometry, material);
    group.add(lines);


    // --- 2. TILED IMAGES (Delphi Style) ---
    // Place images into specific "cells" of the grid defined by WALL_ROWS
    const textureLoader = new THREE.TextureLoader();
    const cellHeight = CONFIG.TUNNEL_HEIGHT / CONFIG.WALL_ROWS;
    const cellDepth = CONFIG.SEGMENT_DEPTH;

    // Helper to add image to a cell
    const addImageTile = (wall: 'left' | 'right', rowIdx: number) => {
        const url = IMAGE_URLS[Math.floor(Math.random() * IMAGE_URLS.length)];
        
        // Image should nearly fill the cell but have padding (margin)
        const contentW = cellDepth * 0.85; // Along Z
        const contentH = cellHeight * 0.85; // Vertical

        // Use MeshBasic for clean, illuminated look
        const mat = new THREE.MeshBasicMaterial({ 
            color: 0x222222, // Dark placeholder
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0, 
        });

        textureLoader.load(url!, (tex) => {
            mat.map = tex;
            mat.color.setHex(0xffffff);
            mat.needsUpdate = true;
            gsap.to(mat, { opacity: 0.9, duration: 0.5 });
        });

        const geo = new THREE.PlaneGeometry(contentW, contentH);
        const mesh = new THREE.Mesh(geo, mat);

        // Position
        const y = -h + (rowIdx * cellHeight) + (cellHeight / 2);
        const z = -d / 2; // Center of segment depth
        const x = wall === 'left' ? -w : w;

        mesh.position.set(x, y, z);
        
        // Rotation: Flat against wall
        mesh.rotation.y = wall === 'left' ? Math.PI / 2 : -Math.PI / 2;

        group.add(mesh);
    };

    // Randomly populate cells
    // Iterate rows on Left Wall
    for (let r = 0; r < CONFIG.WALL_ROWS; r++) {
        // 30% chance of image per cell
        if (Math.random() > 0.7) {
            addImageTile('left', r);
        }
    }
    // Iterate rows on Right Wall
    for (let r = 0; r < CONFIG.WALL_ROWS; r++) {
        if (Math.random() > 0.7) {
            addImageTile('right', r);
        }
    }

    return group;
  };

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    // --- SETUP ---
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Antialias true for sharp lines
    const renderer = new THREE.WebGLRenderer({ 
        canvas: canvasRef.current, 
        alpha: false,
        antialias: true,
        powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 1000);
    camera.position.z = 0;
    cameraRef.current = camera;

    // --- SEGMENTS ---
    const segments: THREE.Group[] = [];
    for (let i = 0; i < CONFIG.NUM_SEGMENTS; i++) {
        const z = -i * CONFIG.SEGMENT_DEPTH;
        const group = createSegment(z);
        scene.add(group);
        segments.push(group);
    }
    segmentsRef.current = segments;

    // --- LOOP ---
    let frameId: number;
    let baseSpeed = CONFIG.SPEED;

    const animate = () => {
        frameId = requestAnimationFrame(animate);
        if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;

        // Scroll influence
        const targetSpeed = CONFIG.SPEED;
        baseSpeed += (targetSpeed - baseSpeed) * 0.1;
        
        segmentsRef.current.forEach(segment => {
            segment.position.z += baseSpeed;
            if (segment.position.z > CONFIG.SEGMENT_DEPTH) {
                // Loop: Move far back
                let minZ = 1000;
                segmentsRef.current.forEach(s => minZ = Math.min(minZ, s.position.z));
                // Perfect tiling: ensure it snaps exactly to grid
                segment.position.z = minZ - CONFIG.SEGMENT_DEPTH;
                
                // Note: For a true infinite variety, we would destroy/recreate contents here.
                // Keeping static for performance stability as requested.
            }
        });

        rendererRef.current.render(sceneRef.current, cameraRef.current);
    };
    animate();

    const handleScroll = () => { scrollPosRef.current = window.scrollY; };
    const handleResize = () => {
        if (!cameraRef.current || !rendererRef.current) return;
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(frameId);
        rendererRef.current?.dispose();
    };
  }, []);

  // --- THEME ---
  useEffect(() => {
    if (!sceneRef.current) return;
    const currentTheme = resolvedTheme || "dark";
    const isDark = currentTheme === "dark";
    const colors = isDark ? CONFIG.COLORS.dark : CONFIG.COLORS.light;

    sceneRef.current.background = new THREE.Color(colors.bg);
    sceneRef.current.fog = new THREE.Fog(colors.fog, CONFIG.FOG_NEAR, CONFIG.FOG_FAR);

    segmentsRef.current.forEach(group => {
        group.children.forEach(child => {
            if (child instanceof THREE.Line || child instanceof THREE.LineSegments) {
                const mat = child.material as THREE.LineBasicMaterial;
                mat.color.setHex(colors.lines);
                mat.opacity = colors.linesOpacity;
                mat.needsUpdate = true;
            }
        });
    });
  }, [resolvedTheme]);

  return (
    <div ref={containerRef} className="fixed inset-0 -z-50 h-full w-full">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
