import { Suspense, lazy, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useScrollDriver, usePrefersReducedMotion } from '../../lib/hooks';
import { PART_BY_ID } from './parts';
import { createAircraftRig } from './rig';

const AircraftScene = lazy(() => import('./AircraftScene'));

export default function AircraftLab() {
  const trackRef = useRef<HTMLDivElement>(null);
  const rig = useRef(createAircraftRig()).current;
  const reducedMotion = usePrefersReducedMotion();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [assemblyUi, setAssemblyUi] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);

  useScrollDriver(trackRef, (p) => {
    const assembly = Math.min(1, p / 0.72);
    rig.assemblyTarget = assembly;
    if (barRef.current) barRef.current.style.transform = `scaleX(${assembly})`;
    setAssemblyUi((prev) => {
      const next = Math.round(assembly * 100);
      return Math.abs(prev - next) >= 2 ? next : prev;
    });
  });

  const selected = selectedId ? PART_BY_ID.get(selectedId) : undefined;

  return (
    <section id="assembly" aria-label="Interactive aircraft assembly">
      <div ref={trackRef} className="relative" style={{ height: reducedMotion ? '160vh' : '420vh' }}>
        <div
          className="sticky top-0 h-screen w-full overflow-hidden"
          onWheelCapture={(e) => e.stopPropagation()}
        >
          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center">
                <p className="mono text-sm text-haze">Loading flight hardware…</p>
              </div>
            }
          >
            <Canvas shadows dpr={[1, 1.75]} camera={{ fov: 42, position: [10.5, 5.8, 12.5] }} gl={{ antialias: true, alpha: true }}>
              <AircraftScene rig={rig} selectedId={selectedId} onSelect={setSelectedId} />
            </Canvas>
          </Suspense>

          <div className="pointer-events-none absolute inset-x-0 top-20 px-5">
            <div className="mx-auto flex max-w-7xl items-start justify-between gap-6">
              <div className="fade-up max-w-md">
                <p className="eyebrow">Sequence A · continued</p>
                <h2 className="display mt-2 text-3xl font-semibold text-white sm:text-4xl">
                  Assembly Bay
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-haze">
                  Scroll to drive the build — forward assembles, backward disassembles.
                  Drag to orbit, pinch or scroll-wheel over empty space to zoom, click any
                  part or its marker to inspect it.
                </p>
              </div>
              <div className="panel hidden rounded-xl px-4 py-3 sm:block">
                <p className="mono text-[0.65rem] uppercase tracking-[0.2em] text-haze">Airframe build</p>
                <p className="display mt-1 text-2xl font-semibold text-ion">{assemblyUi}%</p>
                <div className="mt-2 h-1 w-40 overflow-hidden rounded bg-white/10">
                  <div ref={barRef} className="h-full w-full origin-left scale-x-0 rounded bg-ion transition-none" />
                </div>
              </div>
            </div>
          </div>

          {selected && (
            <aside className="panel fade-up pointer-events-auto absolute bottom-6 left-1/2 w-[min(430px,calc(100vw-2rem))] -translate-x-1/2 rounded-2xl p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="mono text-[0.62rem] uppercase tracking-[0.22em] text-ember">Component {selected.id}</p>
                  <h3 className="display mt-1 text-lg font-semibold text-white">{selected.label}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedId(null)}
                  className="mono rounded-full border hairline px-2.5 py-1 text-[0.65rem] text-haze hover:text-white"
                  aria-label="Close component detail"
                >
                  ESC
                </button>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-haze">{selected.blurb}</p>
            </aside>
          )}

          <div className="mono pointer-events-none absolute bottom-5 right-6 hidden text-[0.65rem] uppercase tracking-[0.2em] text-haze/60 md:block">
            {reducedMotion ? 'static view · motion reduced' : 'scroll = assembly · drag = camera'}
          </div>
        </div>
      </div>
    </section>
  );
}
