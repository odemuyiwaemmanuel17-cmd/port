import { useEffect, useRef, useState } from 'react';

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

/**
 * Drives `callback(progress 0..1)` from the scroll position of a tall track
 * element whose child is sticky-viewport. No React state is involved, so
 * consumers can write directly into DOM/WebGL without re-render storms.
 */
export function useScrollDriver(
  trackRef: React.RefObject<HTMLElement | null>,
  callback: (progress: number) => void,
): void {
  const cbRef = useRef(callback);
  cbRef.current = callback;

  useEffect(() => {
    let frame = 0;
    let last = -1;
    const emit = () => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const scrollable = Math.max(1, track.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      if (Math.abs(progress - last) > 0.0005) {
        last = progress;
        cbRef.current(progress);
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(emit);
    };
    emit();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [trackRef]);
}

/** State-backed variant for UI that legitimately needs to re-render. */
export function useScrollProgress(
  trackRef: React.RefObject<HTMLElement | null>,
): number {
  const [progress, setProgress] = useState(0);
  useScrollDriver(trackRef, setProgress);
  return progress;
}

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const smoothstep = (edge0: number, edge1: number, v: number) => {
  const t = clamp01((v - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
};
