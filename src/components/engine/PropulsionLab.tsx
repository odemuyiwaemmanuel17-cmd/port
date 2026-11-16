import { Suspense, lazy, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ENGINE_PARTS } from './TurbofanModel';

const PropulsionScene = lazy(() => import('./PropulsionScene'));

const GAMMA_AIR = 1.4;
const GAMMA_GAS = 1.33;
const CP_AIR = 1004.5;
const CP_GAS = 1157;
const T0 = 288.15;
const P0 = 101.325;

export interface BraytonResult {
  t2Ideal: number;
  t2Actual: number;
  t4: number;
  t5: number;
  etaThermal: number;
  exhaustVelocity: number;
  thrustPerMassFlow: number;
}

/**
 * Simplified ideal-gas Brayton cycle (sea-level static). Single-spool
 * idealization: compressor work balances HP turbine work, LP turbine drives
 * the fan. Numbers are model output for education — not certified engine data.
 */
export function computeBrayton(pr: number, t4: number, bypassRatio: number): BraytonResult {
  const t2Ideal = T0 * Math.pow(pr, (GAMMA_AIR - 1) / GAMMA_AIR);
  const t2Actual = T0 + (t2Ideal - T0) / 0.9;
  const t5 = t4 - (t2Actual - T0) * (CP_AIR / CP_GAS);
  const etaThermal = 1 - 1 / Math.pow(pr, (GAMMA_AIR - 1) / GAMMA_AIR);
  const coreExitTemp = Math.max(T0, t5 * Math.pow(1 / pr, (GAMMA_GAS - 1) / GAMMA_GAS));
  const exhaustVelocity = Math.sqrt(Math.max(0, 2 * CP_GAS * (t5 - coreExitTemp)));
  const fanVelocity = exhaustVelocity * 0.32;
  const thrustPerMassFlow = exhaustVelocity + bypassRatio * fanVelocity;
  return { t2Ideal, t2Actual, t4, t5, etaThermal, exhaustVelocity, thrustPerMassFlow };
}

export default function PropulsionLab() {
  const [pr, setPr] = useState(30);
  const [t4, setT4] = useState(1600);
  const [bpr, setBpr] = useState(5);
  const [throttle, setThrottle] = useState(0.6);
  const [explode, setExplode] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const result = computeBrayton(pr, t4, bpr);
  const selected = ENGINE_PARTS.find((p) => p.id === selectedId);

  return (
    <section id="propulsion-lab" className="relative border-t hairline py-20">
      <div className="mx-auto max-w-7xl px-5">
        <p className="eyebrow">Interactive · real-time 3D</p>
        <h2 className="display mt-2 text-3xl font-semibold text-white sm:text-4xl">
          Turbofan Test Cell
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-haze">
          The actual 3D model — not the video — provides the interactive engine: spools spin with
          throttle, the cowl opens, and the cycle math below is a simplified ideal-gas Brayton
          model computed live from your inputs.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="panel relative h-[420px] overflow-hidden rounded-2xl sm:h-[520px]">
            <Suspense fallback={<div className="flex h-full items-center justify-center"><p className="mono text-sm text-haze">Spooling up…</p></div>}>
              <Canvas shadows dpr={[1, 1.75]} camera={{ fov: 42, position: [6.5, 3.2, 7.5] }} gl={{ alpha: true }}>
                <PropulsionScene explode={explode} throttle={throttle} selectedId={selectedId} onSelect={setSelectedId} />
              </Canvas>
            </Suspense>
            <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2">
              {ENGINE_PARTS.map((part) => (
                <button
                  key={part.id}
                  type="button"
                  onClick={() => setSelectedId(selectedId === part.id ? null : part.id)}
                  className={`mono rounded-full border px-2.5 py-1 text-[0.62rem] transition-colors ${
                    selectedId === part.id
                      ? 'border-ion bg-ion/15 text-ion'
                      : 'hairline text-haze hover:text-white'
                  }`}
                >
                  {part.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="panel rounded-2xl p-5">
              <h3 className="display text-sm font-semibold uppercase tracking-[0.18em] text-white">Controls</h3>
              <label className="mt-4 block">
                <span className="mono text-[0.68rem] uppercase tracking-[0.14em] text-haze">Throttle · N1 {(throttle * 100).toFixed(0)}%</span>
                <input className="slider mt-2" type="range" min={0} max={1} step={0.01} value={throttle} onChange={(e) => setThrottle(Number(e.target.value))} aria-label="Engine throttle" />
              </label>
              <label className="mt-4 block">
                <span className="mono text-[0.68rem] uppercase tracking-[0.14em] text-haze">Exploded view {(explode * 100).toFixed(0)}%</span>
                <input className="slider mt-2" type="range" min={0} max={1} step={0.01} value={explode} onChange={(e) => setExplode(Number(e.target.value))} aria-label="Exploded view amount" />
              </label>
              <label className="mt-4 block">
                <span className="mono text-[0.68rem] uppercase tracking-[0.14em] text-haze">Overall pressure ratio · {pr}:1</span>
                <input className="slider mt-2" type="range" min={10} max={45} step={1} value={pr} onChange={(e) => setPr(Number(e.target.value))} aria-label="Overall pressure ratio" />
              </label>
              <label className="mt-4 block">
                <span className="mono text-[0.68rem] uppercase tracking-[0.14em] text-haze">Turbine inlet T4 · {t4} K</span>
                <input className="slider mt-2" type="range" min={1250} max={1850} step={10} value={t4} onChange={(e) => setT4(Number(e.target.value))} aria-label="Turbine inlet temperature" />
              </label>
              <label className="mt-4 block">
                <span className="mono text-[0.68rem] uppercase tracking-[0.14em] text-haze">Bypass ratio · {bpr.toFixed(1)}:1</span>
                <input className="slider mt-2" type="range" min={1} max={10} step={0.5} value={bpr} onChange={(e) => setBpr(Number(e.target.value))} aria-label="Bypass ratio" />
              </label>
            </div>

            <div className="panel rounded-2xl p-5">
              <h3 className="display text-sm font-semibold uppercase tracking-[0.18em] text-white">Cycle readout</h3>
              <p className="mono mt-1 text-[0.6rem] uppercase tracking-[0.14em] text-haze/70">
                Ideal Brayton · sea-level static · γ_air {GAMMA_AIR}, γ_gas {GAMMA_GAS} · η_c 0.9
              </p>
              <dl className="mono mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <dt className="text-haze">T2 (ideal comp.)</dt><dd className="text-right text-ion">{result.t2Ideal.toFixed(0)} K</dd>
                <dt className="text-haze">T2 (η=0.9)</dt><dd className="text-right text-ion">{result.t2Actual.toFixed(0)} K</dd>
                <dt className="text-haze">T4 (turbine inlet)</dt><dd className="text-right text-ember">{result.t4.toFixed(0)} K</dd>
                <dt className="text-haze">T5 (after HPT)</dt><dd className="text-right text-ion">{result.t5.toFixed(0)} K</dd>
                <dt className="text-haze">η thermal (ideal)</dt><dd className="text-right text-ion">{(result.etaThermal * 100).toFixed(1)} %</dd>
                <dt className="text-haze">Core jet velocity</dt><dd className="text-right text-ion">{result.exhaustVelocity.toFixed(0)} m/s</dd>
                <dt className="text-haze">F / ṁ (model)</dt><dd className="text-right text-ember">{result.thrustPerMassFlow.toFixed(0)} N/(kg/s)</dd>
                <dt className="text-haze">Ambient</dt><dd className="text-right text-haze/70">288.15 K / {P0} kPa</dd>
              </dl>
            </div>

            {selected && (
              <div className="panel fade-up rounded-2xl p-5">
                <p className="mono text-[0.62rem] uppercase tracking-[0.22em] text-ember">{selected.id}</p>
                <h3 className="display mt-1 text-base font-semibold text-white">{selected.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-haze">{selected.blurb}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
