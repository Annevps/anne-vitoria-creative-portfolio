import { useEffect, useRef } from "react";

const GLYPHS = "01{}<>/=+*#;:AV[]()";

export function MatrixBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cellSize = 28;
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let grid: { char: string; alpha: number; gold: boolean; phase: number }[] = [];
    let frameId = 0;

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = Math.min(window.innerHeight, 920);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(width / cellSize);
      rows = Math.ceil(height / cellSize);
      grid = Array.from({ length: cols * rows }, (_, i) => ({
        char: GLYPHS[i % GLYPHS.length] ?? "0",
        alpha: 0.03 + ((i * 17) % 10) * 0.008,
        gold: i % 23 === 0,
        phase: (i * 0.37) % (Math.PI * 2),
      }));
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.font = '11px "IBM Plex Mono", monospace';
      ctx.textAlign = "center";

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cell = grid[r * cols + c];
          if (!cell) continue;
          const wave = reduced ? 0.5 : (Math.sin(time * 0.0011 + cell.phase + r * 0.14) + 1) * 0.5;
          const a = cell.alpha + wave * (cell.gold ? 0.16 : 0.055);
          ctx.fillStyle = cell.gold
            ? `rgba(235, 212, 142, ${a.toFixed(3)})`
            : `rgba(180, 194, 214, ${a.toFixed(3)})`;
          ctx.fillText(cell.char, c * cellSize + cellSize / 2, r * cellSize + cellSize / 2);
        }
      }

      if (!reduced) {
        frameId = requestAnimationFrame(draw);
      }
    };

    setup();
    draw(0);
    window.addEventListener("resize", setup);
    return () => {
      window.removeEventListener("resize", setup);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[920px] overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full opacity-85" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 68% 52% at 50% 18%, transparent 15%, var(--color-background) 88%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-48"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--color-background))",
        }}
      />
    </div>
  );
}