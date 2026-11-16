import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { createAircraftRig } from '../aircraft/rig';

const SystemsScene = lazy(() => import('./SystemsScene'));

export interface ControlState {
  aileron: number;
  elevator: number;
  rudder: number;
  gear: number;
}

const ANNOTATIONS: { id: string; title: string; text: string }[] = [
  { id: 'wing-left', title: 'Wing structure', text: 'Front and rear spars form the torsion box; ribs hold the airfoil shape and stringers carry skin compression. Ailerons are the outboard trailing-edge surfaces.' },
  { id: 'stabilator-left', title: 'Pitch control', text: 'The whole horizontal surface rotates (stabilator) — both sides deflect together for pitch, and the FADEC-free hydraulics drive them at up to 20° per second.' },
  { id: 'fin-left', title: 'Yaw control', text: 'Rudder hinges on the trailing edge of each canted fin. Asymmetric rudder also coordinates turns and is the engine-out trim on twins.' },
  { id: 'gear', title: 'Landing gear', text: 'Tricycle gear: nose wheel steers on the ground, mains retract rearward into the wing boxes. Gear-down is confirmed by three-way green lights, not position alone.' },
];

export default function SystemsLab() {
  const rig = useRef(createAircraftRig()).current;
  const [controls, setControls] = useState<ControlState>({ aileron: 0, elevator: 0, rudder: 0, gear: 1 });
  const [noteId, setNoteId] = useState<string | null>('wing-left');

  useEffect(() => {
    rig.assemblyTarget = 0;
    rig.assembly = 0;
  }, [rig]);

  const note = ANNOTATIONS.find((n) => n.id === noteId);

  const slider = (key: keyof ControlState, label: string, min: number, max: number) => (
    <label className="block">
      <span className="mono text-[0.68rem] uppercase tracking-[0.14em] text-haze">
        {label} · {key === 'gear' ? `${Math.round(controls[key] * 100)}% down` : `${controls[key]}°`}
      </span>
      <input
        className="slider mt-2"
        type="range"
        min={min}
        max={max}
        step={key === 'gear' ? 0.01 : 1}
        value={controls[key]}
        onChange={(e) => setControls((c) => ({ ...c, [key]: Number(e.target.value) }))}
        aria-label={label}
      />
    </label>
  );

  return (
    <section id="systems" className="border-t hairline py-20">
      <div className="mx-auto max-w-7xl px-5">
        <p className="eyebrow">Simulation C</p>
        <h2 className="display mt-2 text-3xl font-semibold text-white sm:text-4xl">Aircraft Systems Lab</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-haze">
          Drive the control surfaces and the gear actuation on the same airframe from the
          Assembly Bay. Deflections are visual and geometric — hinge moments and control
          authority are not simulated here.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="panel relative h-[420px] overflow-hidden rounded-2xl sm:h-[520px]">
            <Suspense fallback={<div className="flex h-full items-center justify-center"><p className="mono text-sm text-haze">Pressurizing hydraulics…</p></div>}>
              <Canvas shadows dpr={[1, 1.75]} camera={{ fov: 42, position: [7, 3.4, 8] }} gl={{ alpha: true }}>
                <SystemsScene rig={rig} controls={controls} selectedId={noteId} onSelect={setNoteId} />
              </Canvas>
            </Suspense>
          </div>

          <div className="flex flex-col gap-4">
            <div className="panel rounded-2xl p-5">
              <h3 className="display text-sm font-semibold uppercase tracking-[0.18em] text-white">Surface commands</h3>
              <div className="mt-4 flex flex-col gap-4">
                {slider('aileron', 'Aileron (roll)', -25, 25)}
                {slider('elevator', 'Stabilator (pitch)', -20, 20)}
                {slider('rudder', 'Rudder (yaw)', -30, 30)}
                {slider('gear', 'Landing gear', 0, 1)}
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => setControls((c) => ({ ...c, gear: c.gear > 0.5 ? 0 : 1 }))}
                  className="display rounded-full border border-ion/50 px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ion hover:bg-ion hover:text-void"
                >
                  {controls.gear > 0.5 ? 'Retract gear' : 'Extend gear'}
                </button>
                <button
                  type="button"
                  onClick={() => setControls({ aileron: 0, elevator: 0, rudder: 0, gear: 1 })}
                  className="display rounded-full border hairline px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-haze hover:text-white"
                >
                  Neutral
                </button>
              </div>
            </div>

            {note && (
              <div className="panel fade-up rounded-2xl p-5">
                <p className="mono text-[0.62rem] uppercase tracking-[0.22em] text-ember">{note.id}</p>
                <h3 className="display mt-1 text-base font-semibold text-white">{note.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-haze">{note.text}</p>
              </div>
            )}
            <p className="mono text-[0.62rem] uppercase tracking-[0.16em] text-haze/50">
              click a component on the airframe to move the annotation
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
