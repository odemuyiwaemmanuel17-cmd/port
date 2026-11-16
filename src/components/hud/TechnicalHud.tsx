import { useEffect, useRef, useState } from 'react';
import { useScrollStore } from '../../store/useScrollStore';
import { Volume2, VolumeX, Compass, Cpu, Navigation, Eye, Maximize2 } from 'lucide-react';

// Web Audio API simple synthesized telemetry sounds
class SoundEngine {
  private ctx: AudioContext | null = null;

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
  }

  playBeep(freq = 880, duration = 0.05, type: OscillatorType = 'sine') {
    try {
      this.init();
      if (!this.ctx || this.ctx.state === 'suspended') return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  playTelemetryTick() {
    this.playBeep(1200, 0.03, 'triangle');
  }

  playAlarm() {
    this.playBeep(440, 0.12, 'sawtooth');
  }
}

const soundEngine = new SoundEngine();

export default function TechnicalHud() {
  const {
    activeSection,
    telemetry,
    isAudioEnabled,
    toggleAudio,
    isOrbitEnabled,
    setOrbitEnabled,
    activeComponentInfo,
    setActiveComponent,
  } = useScrollStore();

  const [timeStr, setTimeStr] = useState('');
  const [radarAngle, setRadarAngle] = useState(0);

  // Time & Radar loop
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTimeStr(
        `${String(now.getUTCHours()).padStart(2, '0')}:${String(
          now.getUTCMinutes()
        ).padStart(2, '0')}:${String(now.getUTCSeconds()).padStart(2, '0')}.` +
          `${Math.floor(now.getUTCMilliseconds() / 100)} UTC`
      );
    }, 100);

    const radarTimer = setInterval(() => {
      setRadarAngle((prev) => (prev + 3) % 360);
    }, 40);

    return () => {
      clearInterval(timer);
      clearInterval(radarTimer);
    };
  }, []);

  const handleAudioToggle = () => {
    toggleAudio();
    if (!isAudioEnabled) {
      soundEngine.init();
      soundEngine.playTelemetryTick();
    }
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden font-mono text-[10px] select-none">
      {/* 4 Corner Tech Brackets (Reference A) */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-cyan-400/60" />
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-cyan-400/60" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-cyan-400/60" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-cyan-400/60" />

      {/* Top Telemetry Header Bar */}
      <header className="pointer-events-auto absolute top-0 inset-x-0 h-11 border-b border-cyan-500/15 bg-[#070a0f]/80 backdrop-blur-md px-6 flex items-center justify-between text-slate-400">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
            <span className="text-cyan-400 font-bold tracking-widest text-[11px] font-display uppercase">
              SYS-TEL // LIVE
            </span>
          </div>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="hidden md:inline tracking-wider text-slate-400">
            LOC: <span className="text-slate-200">7.522°N 4.520°E</span> [OAU AERO LAB]
          </span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-slate-300 tracking-widest">{timeStr}</span>
        </div>

        {/* Center Section Telemetry Pill */}
        <div className="hidden lg:flex items-center gap-3 px-3 py-1 rounded border border-cyan-500/20 bg-cyan-950/20 text-cyan-300">
          <Navigation className="w-3.5 h-3.5 text-cyan-400" />
          <span className="tracking-widest font-semibold uppercase">
            ACTIVE REGIME: {activeSection.toUpperCase().replace('-', ' ')}
          </span>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleAudioToggle}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-slate-700/60 bg-slate-900/60 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors"
            title="Toggle synthesized telemetry audio"
          >
            {isAudioEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-cyan-400 hidden sm:inline">AUDIO ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-slate-500 hidden sm:inline">MUTED</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setOrbitEnabled(!isOrbitEnabled);
              if (isAudioEnabled) soundEngine.playTelemetryTick();
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded border transition-colors ${
              isOrbitEnabled
                ? 'border-cyan-400 bg-cyan-950/60 text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.2)]'
                : 'border-slate-700/60 bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:border-slate-600'
            }`}
            title="Toggle 3D Orbit Inspection"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {isOrbitEnabled ? 'ORBIT ACTIVE' : 'FREE ORBIT'}
            </span>
          </button>
        </div>
      </header>

      {/* Left Vertical HUD Panel: Concentric Orbital Telemetry Rings (Reference A) */}
      <aside className="hidden xl:flex flex-col gap-4 absolute left-6 top-20 w-56 text-slate-400">
        <div className="p-3.5 rounded-lg border border-cyan-500/20 bg-[#070a0f]/85 backdrop-blur-md relative overflow-hidden">
          {/* Subtle animated scanline */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none" />

          <div className="flex items-center justify-between mb-3 border-b border-cyan-500/20 pb-1.5">
            <span className="text-cyan-400 font-display font-semibold tracking-wider flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" /> ORBITAL RADAR
            </span>
            <span className="text-[9px] text-amber-400 font-bold px-1 rounded bg-amber-950/40 border border-amber-500/30">
              POLAR GRID
            </span>
          </div>

          {/* Polar Radar Visualizer with rotating beam */}
          <div className="relative w-40 h-40 mx-auto my-2 rounded-full border border-cyan-500/30 flex items-center justify-center">
            {/* Concentric rings */}
            <div className="absolute inset-2 rounded-full border border-cyan-500/20" />
            <div className="absolute inset-6 rounded-full border border-cyan-500/25" />
            <div className="absolute inset-10 rounded-full border border-cyan-500/35 border-dashed" />
            <div className="absolute inset-14 rounded-full border border-cyan-500/40" />

            {/* Crosshair lines */}
            <div className="absolute w-full h-[1px] bg-cyan-500/25" />
            <div className="absolute h-full w-[1px] bg-cyan-500/25" />

            {/* Rotating radar sweep */}
            <div
              className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
              style={{
                background: `conic-gradient(from ${radarAngle}deg, rgba(34, 211, 238, 0.35) 0deg, transparent 65deg)`,
              }}
            />

            {/* Ping blips */}
            <div className="absolute top-8 right-10 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
            <div className="absolute bottom-9 left-11 w-1 h-1 rounded-full bg-amber-400 shadow-[0_0_6px_#f59e0b]" />

            {/* Center target node */}
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400/40 border border-cyan-300 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-white" />
            </div>

            {/* Degree indicators */}
            <span className="absolute top-0.5 text-[8px] text-cyan-400/80">000°</span>
            <span className="absolute right-0.5 text-[8px] text-cyan-400/80">090°</span>
            <span className="absolute bottom-0.5 text-[8px] text-cyan-400/80">180°</span>
            <span className="absolute left-0.5 text-[8px] text-cyan-400/80">270°</span>
          </div>

          {/* Flight Dynamics Data */}
          <div className="space-y-1.5 pt-2 border-t border-cyan-500/20 text-[10px]">
            <div className="flex justify-between">
              <span className="text-slate-500">VELOCITY / MACH:</span>
              <span className="text-cyan-300 font-bold">M {telemetry.mach.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">PRESSURE (q):</span>
              <span className="text-slate-300">{telemetry.dynamicPressure.toFixed(1)} kPa</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">AOA (α):</span>
              <span className="text-slate-300">+{telemetry.aoa.toFixed(1)}°</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">THRUST (Fn):</span>
              <span className="text-amber-400 font-bold">{telemetry.thrust.toFixed(1)} kN</span>
            </div>
          </div>
        </div>

        {/* Avionics Diagnostics Box */}
        <div className="p-3 rounded-lg border border-cyan-500/20 bg-[#070a0f]/85 backdrop-blur-md space-y-1.5">
          <div className="flex items-center justify-between text-slate-300 font-display font-semibold">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <Cpu className="w-3.5 h-3.5" /> AVIONICS BUS
            </span>
            <span className="text-emerald-400 font-bold text-[9px]">NOMINAL</span>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 w-[94%]" />
          </div>
          <p className="text-[9px] text-slate-500 leading-tight">
            DATA LINK: 48.2 MB/s · SGP4 PROPAGATOR SYNCED
          </p>
        </div>
      </aside>

      {/* Right Vertical HUD Panel: Component Inspector (when active) */}
      {activeComponentInfo && (
        <aside className="pointer-events-auto absolute right-6 top-20 w-72 p-4 rounded-xl border border-cyan-500/40 bg-[#070a0f]/90 backdrop-blur-xl text-slate-200 shadow-[0_0_24px_rgba(34,211,238,0.15)] animate-fade-in">
          <div className="flex items-center justify-between border-b border-cyan-500/30 pb-2 mb-3">
            <span className="text-xs font-display font-bold text-cyan-300 flex items-center gap-1.5 uppercase tracking-wider">
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              {activeComponentInfo.title}
            </span>
            <button
              type="button"
              onClick={() => setActiveComponent(null)}
              className="text-slate-500 hover:text-slate-300 text-xs px-1.5 py-0.5 rounded border border-slate-700 hover:border-slate-500"
            >
              ✕
            </button>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed mb-3">
            {activeComponentInfo.description}
          </p>
          {activeComponentInfo.specs && (
            <div className="space-y-1.5 border-t border-cyan-500/20 pt-2.5">
              {Object.entries(activeComponentInfo.specs).map(([k, v]) => (
                <div key={k} className="flex justify-between text-[10px]">
                  <span className="text-slate-400 uppercase">{k}:</span>
                  <span className="text-cyan-300 font-semibold">{v}</span>
                </div>
              ))}
            </div>
          )}
        </aside>
      )}

      {/* Bottom Center Reticle & Target Crosshairs */}
      <div className="absolute bottom-8 inset-x-0 flex justify-center pointer-events-none">
        <div className="flex items-center gap-6 text-[10px] text-slate-400 tracking-wider">
          <span className="hidden sm:inline border border-cyan-500/20 px-2 py-0.5 rounded bg-slate-900/60">
            PITCH: +0.4°
          </span>
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 font-bold text-xs">[</span>
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-slate-300 font-display uppercase tracking-widest text-[11px]">
              RESEARCH FACILITY // TELEMETRY LOCK
            </span>
            <span className="text-cyan-400 font-bold text-xs">]</span>
          </div>
          <span className="hidden sm:inline border border-cyan-500/20 px-2 py-0.5 rounded bg-slate-900/60">
            ROLL: 0.0°
          </span>
        </div>
      </div>
    </div>
  );
}
