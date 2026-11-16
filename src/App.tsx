import { Component, type ErrorInfo, type ReactNode } from 'react';
import TechnicalHud from './components/hud/TechnicalHud';
import Navbar from './components/Navbar';
import CinematicVideo from './components/CinematicVideo';
import AircraftLab from './components/aircraft/AircraftLab';
import WebScene from './components/web/WebScene';
import AIScene from './components/ai/AIScene';
import AeroLab from './components/labs/AeroLab';
import SystemsLab from './components/labs/SystemsLab';
import PropulsionLab from './components/engine/PropulsionLab';
import { Showcase, Projects, About, Contact, Footer } from './components/Sections';

class Boundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  componentDidCatch(_error: Error, _info: ErrorInfo) {
    /* surface a readable fallback instead of a blank canvas */
  }
  render() {
    if (this.state.error) {
      return (
        <div className="panel mx-auto my-16 max-w-lg rounded-2xl p-8 text-center">
          <h2 className="display text-xl font-semibold text-white">This module hit turbulence</h2>
          <p className="mt-2 text-sm text-haze">
            The 3D scene or simulation failed to initialize on this device. Reload to retry —
            the rest of the site stays available.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="display mt-4 rounded-full bg-ion px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-void"
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function Hero() {
  return (
    <div id="laboratory" className="relative">
      <CinematicVideo
        src="/videos/fighter-laboratory.mp4"
        poster="/videos/fighter-laboratory-poster.jpg"
        trackHeight="340vh"
        label="Fighter laboratory introduction"
      >
        {(p) => (
          <div className="flex h-full flex-col justify-end px-5 pb-24 sm:px-10">
            <div className="mx-auto w-full max-w-7xl">
              <p className="eyebrow fade-up">Emmanuel Odemuyiwa // OAU AEROSPACE</p>
              <h1 className="display fade-up mt-3 max-w-4xl text-4xl font-bold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
                Aerospace Engineering,
                <br />
                <span className="text-ion">Web Systems &amp; AI.</span>
              </h1>
              <p className="fade-up mt-4 max-w-2xl text-sm leading-relaxed text-haze sm:text-base">
                An advanced engineering research facility rendered live in your browser: explore real-time 3D stealth fighter airframe assemblies, high-bypass turbofan engines, distributed web software architectures, and autonomous AI neural systems.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <a
                  href="#assembly"
                  className="display rounded-full bg-ion px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-void transition-colors hover:bg-white"
                >
                  Enter Flight Bay
                </a>
                <a
                  href="#web-engineering"
                  className="display rounded-full border hairline px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-haze transition-colors hover:text-white"
                >
                  Explore Web &amp; AI
                </a>
                <a
                  href="#projects"
                  className="display rounded-full border hairline px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-amber-400 border-amber-500/40 hover:bg-amber-500/10 transition-colors"
                >
                  View Flagships
                </a>
              </div>
            </div>
          </div>
        )}
      </CinematicVideo>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-6">
        <span className="scroll-hint mono text-[0.62rem] uppercase tracking-[0.3em] text-haze/70">
          Scroll to initiate facility journey ↓
        </span>
      </div>
    </div>
  );
}

function PropulsionIntro() {
  return (
    <CinematicVideo
      src="/videos/propulsion-engine.mp4"
      poster="/videos/propulsion-engine-poster.jpg"
      trackHeight="280vh"
      label="Propulsion engineering cinematic sequence"
    >
      {(p) => (
        <div className="flex h-full flex-col justify-center px-5 sm:px-10">
          <div className="mx-auto w-full max-w-7xl">
            <p className="eyebrow" style={{ opacity: 1 - p * 2 }}>
              CHAMBER 04 · PROPULSION ENGINEERING
            </p>
            <h2
              className="display mt-3 max-w-3xl text-4xl font-bold text-white sm:text-5xl"
              style={{ opacity: Math.max(0, 1 - Math.abs(p - 0.35) * 3) }}
            >
              Commercial Aircraft Maintenance Hangar
              <br />
              <span className="text-ember">&amp; Turbofan Test Cell.</span>
            </h2>
          </div>
        </div>
      )}
    </CinematicVideo>
  );
}

export default function App() {
  return (
    <>
      {/* Reference A Technical HUD Interface */}
      <TechnicalHud />

      {/* Primary Navigation Bar */}
      <Navbar />

      <main id="top" className="relative bg-[#070a0f] text-[#dbe4ee]">
        {/* Hero: Fighter Laboratory Cinematic (Reference B) */}
        <Hero />

        {/* Scene 1: 3D Stealth Fighter Aircraft Assembly */}
        <Boundary>
          <AircraftLab />
        </Boundary>

        {/* Scene 2: 3D Distributed Web Software Architecture */}
        <Boundary>
          <WebScene />
        </Boundary>

        {/* Scene 3: 3D AI Research & Multi-Agent Neural Graph */}
        <Boundary>
          <AIScene />
        </Boundary>

        {/* Scene 4: Commercial Aircraft & Turbofan Propulsion (Reference C) */}
        <section id="propulsion" className="relative">
          <PropulsionIntro />
          <Boundary>
            <PropulsionLab />
          </Boundary>
        </section>

        {/* Interactive Demonstrations: Aerodynamics & Systems Labs */}
        <section id="aerodynamics" className="relative">
          <Boundary>
            <AeroLab />
          </Boundary>
        </section>

        <section id="systems" className="relative">
          <Boundary>
            <SystemsLab />
          </Boundary>
        </section>

        {/* Flagship Projects Exhibition: OrbitalPulse & Forge 3D */}
        <Showcase />

        {/* Verified AI & Full-Stack Builds */}
        <Projects />

        {/* Professional Profile & Skills at OAU */}
        <About />

        {/* Contact & Telemetry Link */}
        <Contact />
      </main>

      {/* Engineering Footer */}
      <Footer />
    </>
  );
}
