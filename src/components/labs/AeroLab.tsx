import { useEffect, useRef, useState } from 'react';

const RHO = 1.225;
const CHORD_M = 1;
const SPAN_M = 1;
const AR = 6;
const OSWALD = 0.82;
const CD0 = 0.012;
const ALPHA_STALL = 15;

export interface AeroResult {
  cl: number;
  cd: number;
  q: number;
  lift: number;
  drag: number;
  ld: number;
  stalled: boolean;
}

/**
 * Thin-airfoil theory + lifting-line induced drag. cl = 2π·α (rad) up to the
 * stall angle, then a linear bleed-off. This is a teaching model, not CFD.
 */
export function computeAero(alphaDeg: number, speed: number): AeroResult {
  const alphaRad = (alphaDeg * Math.PI) / 180;
  const stalled = Math.abs(alphaDeg) > ALPHA_STALL;
  let cl = 2 * Math.PI * alphaRad;
  if (stalled) {
    const over = Math.min(Math.abs(alphaDeg) - ALPHA_STALL, 12);
    cl = Math.sign(alphaDeg) * (2 * Math.PI * (ALPHA_STALL * Math.PI) / 180) * (1 - over * 0.055);
  }
  const cd = CD0 + (cl * cl) / (Math.PI * OSWALD * AR) + (stalled ? 0.06 : 0);
  const q = 0.5 * RHO * speed * speed;
  const area = CHORD_M * SPAN_M;
  return {
    cl,
    cd,
    q,
    lift: q * area * cl,
    drag: q * area * cd,
    ld: cd > 0 ? cl / cd : 0,
    stalled,
  };
}

interface Particle {
  x: number;
  y: number;
}

export default function AeroLab() {
  const [alpha, setAlpha] = useState(6);
  const [speed, setSpeed] = useState(60);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({ alpha, speed });
  stateRef.current = { alpha, speed };
  const [result, setResult] = useState<AeroResult>(() => computeAero(alpha, speed));

  useEffect(() => {
    setResult(computeAero(alpha, speed));
  }, [alpha, speed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let raf = 0;
    let particles: Particle[] = [];
    const seed = () => {
      particles = Array.from({ length: 90 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
      }));
    };
    seed();

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const { alpha: a, speed: v } = stateRef.current;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const cx = w * 0.5;
      const cy = h * 0.52;
      const chord = Math.min(w, h) * 0.34;
      const thickness = chord * 0.12;
      const camber = chord * 0.028;
      const alphaRad = (a * Math.PI) / 180;
      const res = computeAero(a, v);
      const flowSpeed = 0.4 + (v / 300) * 2.6;
      const downwash = res.cl * 0.55;

      ctx.clearRect(0, 0, w, h);

      const cosA = Math.cos(-alphaRad);
      const sinA = Math.sin(-alphaRad);
      const toAirfoil = (px: number, py: number) => ({
        x: cx + px * cosA - py * sinA,
        y: cy + px * sinA + py * cosA,
      });

      ctx.strokeStyle = 'rgba(103, 232, 249, 0.5)';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      for (let i = 0; i <= 60; i++) {
        const t = i / 60;
        const x = (t - 0.5) * chord;
        const yt =
          thickness *
          5 *
          (0.2969 * Math.sqrt(t) - 0.126 * t - 0.3516 * t * t + 0.2843 * t ** 3 - 0.1015 * t ** 4);
        const yc = camber * 4 * t * (1 - t);
        const p = toAirfoil(x, -yt + yc);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      for (let i = 60; i >= 0; i--) {
        const t = i / 60;
        const x = (t - 0.5) * chord;
        const yt =
          thickness *
          5 *
          (0.2969 * Math.sqrt(t) - 0.126 * t - 0.3516 * t * t + 0.2843 * t ** 3 - 0.1015 * t ** 4);
        const yc = camber * 4 * t * (1 - t);
        const p = toAirfoil(x, yt + yc);
        ctx.lineTo(p.x, p.y);
      }
      ctx.closePath();
      ctx.fillStyle = res.stalled ? 'rgba(245, 158, 11, 0.16)' : 'rgba(219, 228, 238, 0.1)';
      ctx.fill();
      ctx.stroke();

      particles.forEach((p) => {
        p.x += flowSpeed * (1 + Math.random() * 0.2);
        const dx = p.x - cx;
        const dy = p.y - cy;
        if (dx > -chord && dx < chord) {
          const influence = Math.exp(-(dy * dy) / (chord * chord * 0.16));
          p.y -= influence * flowSpeed * 0.55 * Math.sign(dy || 1) * -1;
        }
        if (dx > chord * 0.2) {
          const tail = Math.min(1, (dx - chord * 0.2) / (chord * 1.4));
          p.y += downwash * tail * flowSpeed * 0.32;
        }
        if (p.x > w + 8 || p.y > h + 8 || p.y < -8) {
          p.x = -8;
          p.y = Math.random() * h;
        }
        const speedNorm = Math.min(1, flowSpeed / 3);
        ctx.fillStyle = res.stalled
          ? `rgba(245, 158, 11, ${0.25 + speedNorm * 0.5})`
          : `rgba(103, 232, 249, ${0.2 + speedNorm * 0.55})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      });

      const arrow = (x: number, y: number, len: number, color: string, label: string) => {
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y - len);
        ctx.stroke();
        const head = len > 0 ? -1 : 1;
        ctx.beginPath();
        ctx.moveTo(x, y - len);
        ctx.lineTo(x - 5, y - len + head * -8);
        ctx.lineTo(x + 5, y - len + head * -8);
        ctx.closePath();
        ctx.fill();
        ctx.font = '11px "IBM Plex Mono", monospace';
        ctx.fillText(label, x + 8, y - len / 2);
      };
      const liftLen = Math.max(-70, Math.min(70, res.lift * 0.02));
      const dragLen = Math.max(-40, Math.min(40, -res.drag * 0.35));
      arrow(cx, cy - 6, liftLen, '#67e8f9', `L ${res.lift.toFixed(0)} N/m²`);
      arrow(cx - chord * 0.4, cy, dragLen, '#f59e0b', `D ${res.drag.toFixed(0)} N/m²`);

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section id="aerodynamics" className="border-t hairline py-20">
      <div className="mx-auto max-w-7xl px-5">
        <p className="eyebrow">Simulation A</p>
        <h2 className="display mt-2 text-3xl font-semibold text-white sm:text-4xl">Aerodynamics Lab</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-haze">
          A NACA-style 4-digit section at live angle of attack. Lift uses thin-airfoil theory
          (cl = 2π·α) with stall bleed-off past {ALPHA_STALL}°; drag adds induced
          (cl²/π·e·AR) and parasite terms. Particle field is a qualitative flow picture, not a
          solved velocity field.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="panel overflow-hidden rounded-2xl">
            <canvas ref={canvasRef} className="h-[360px] w-full sm:h-[460px]" aria-label="Airfoil airflow visualization" />
          </div>
          <div className="flex flex-col gap-4">
            <div className="panel rounded-2xl p-5">
              <label className="block">
                <span className="mono text-[0.68rem] uppercase tracking-[0.14em] text-haze">Angle of attack · {alpha}°</span>
                <input className="slider mt-2" type="range" min={-10} max={20} step={0.5} value={alpha} onChange={(e) => setAlpha(Number(e.target.value))} aria-label="Angle of attack" />
              </label>
              <label className="mt-4 block">
                <span className="mono text-[0.68rem] uppercase tracking-[0.14em] text-haze">Airspeed · {speed} m/s</span>
                <input className="slider mt-2" type="range" min={10} max={300} step={1} value={speed} onChange={(e) => setSpeed(Number(e.target.value))} aria-label="Airspeed" />
              </label>
            </div>
            <div className="panel rounded-2xl p-5">
              <h3 className="display text-sm font-semibold uppercase tracking-[0.18em] text-white">Live output</h3>
              <dl className="mono mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <dt className="text-haze">cl</dt><dd className={`text-right ${result.stalled ? 'text-ember' : 'text-ion'}`}>{result.cl.toFixed(3)}</dd>
                <dt className="text-haze">cd</dt><dd className="text-right text-ion">{result.cd.toFixed(4)}</dd>
                <dt className="text-haze">L/D</dt><dd className="text-right text-ion">{result.ld.toFixed(1)}</dd>
                <dt className="text-haze">q</dt><dd className="text-right text-ion">{result.q.toFixed(0)} Pa</dd>
                <dt className="text-haze">Lift /m²</dt><dd className="text-right text-ember">{result.lift.toFixed(0)} N</dd>
                <dt className="text-haze">Drag /m²</dt><dd className="text-right text-ember">{result.drag.toFixed(0)} N</dd>
              </dl>
              <p className={`mono mt-3 text-[0.68rem] uppercase tracking-[0.16em] ${result.stalled ? 'text-ember' : 'text-haze/60'}`}>
                {result.stalled ? '⚠ beyond stall — flow separated' : 'attached flow regime'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
