import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion, useScrollDriver } from '../lib/hooks';

export interface CinematicVideoProps {
  src: string;
  poster: string;
  /** Track height in viewport units; the stage is sticky inside it. */
  trackHeight?: string;
  /** Overlay content receives the live progress (0..1) via render prop. */
  children?: (progress: number) => React.ReactNode;
  /** Called once when the video's real duration is known. */
  label?: string;
}

/**
 * Scroll-scrubbed cinematic sequence: forward scroll advances actual footage,
 * backward scroll reverses it. Uses currentTime mapping against the real
 * loadedmetadata duration. If seeking is unreliable (or reduced motion is set)
 * it degrades to a normally-playing muted loop — never a frozen frame.
 */
export default function CinematicVideo({
  src,
  poster,
  trackHeight = '320vh',
  children,
  label,
}: CinematicVideoProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [seekHealthy, setSeekHealthy] = useState(true);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reducedMotion || !seekHealthy) {
      video.muted = true;
      video.loop = true;
      void video.play().catch(() => undefined);
      return () => video.pause();
    }
    video.pause();
    video.currentTime = 0;
  }, [reducedMotion, seekHealthy]);

  useScrollDriver(trackRef, (progress) => {
    const video = videoRef.current;
    if (!video || !inView) return;
    if (reducedMotion || !seekHealthy) {
      if (overlayRef.current) overlayRef.current.style.opacity = String(1 - progress * 1.6);
      return;
    }
    if (video.readyState < 1) return;
    const duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 10;
    const target = progress * (duration - 0.05);
    if (Math.abs(video.currentTime - target) > 0.045 && !video.seeking) {
      try {
        video.currentTime = target;
      } catch {
        setSeekHealthy(false);
      }
    }
    if (overlayRef.current) overlayRef.current.style.opacity = String(1 - progress * 1.6);
  });

  return (
    <div ref={trackRef} className="relative" style={{ height: trackHeight }} aria-label={label}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-void">
        <video
          ref={videoRef}
          className="video-surface"
          src={src}
          poster={poster}
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <div className="scrim-top pointer-events-none absolute inset-x-0 top-0 h-28" />
        <div className="scrim-bottom pointer-events-none absolute inset-x-0 bottom-0 h-40" />
        <div ref={overlayRef} className="pointer-events-none absolute inset-0">
          {children?.(0)}
        </div>
      </div>
    </div>
  );
}
