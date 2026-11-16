import { create } from 'zustand';

export type SceneSection =
  | 'laboratory'
  | 'assembly'
  | 'web-engineering'
  | 'ai-chamber'
  | 'propulsion'
  | 'aerolab'
  | 'systemslab'
  | 'projects'
  | 'about'
  | 'contact';

export interface TelemetryData {
  mach: number;
  altitude: number;
  dynamicPressure: number;
  aoa: number;
  thrust: number;
  spoolN1: number;
  spoolN2: number;
  systemsStatus: 'NOMINAL' | 'CALIBRATING' | 'EXPLODED_VIEW' | 'ORBITAL_SYNC';
}

interface ScrollStoreState {
  // Scroll progress (0 to 1)
  scrollProgress: number;
  activeSection: SceneSection;
  
  // Camera & Mode state
  isOrbitEnabled: boolean;
  isAudioEnabled: boolean;
  activeComponentId: string | null;
  activeComponentInfo: {
    title: string;
    description: string;
    specs?: Record<string, string>;
  } | null;
  
  // Real-time HUD Telemetry
  telemetry: TelemetryData;
  
  // Actions
  setScrollProgress: (progress: number) => void;
  setActiveSection: (section: SceneSection) => void;
  setOrbitEnabled: (enabled: boolean) => void;
  toggleAudio: () => void;
  setActiveComponent: (
    id: string | null,
    info?: { title: string; description: string; specs?: Record<string, string> } | null
  ) => void;
  updateTelemetry: (data: Partial<TelemetryData>) => void;
}

export const useScrollStore = create<ScrollStoreState>((set) => ({
  scrollProgress: 0,
  activeSection: 'laboratory',
  isOrbitEnabled: false,
  isAudioEnabled: false,
  activeComponentId: null,
  activeComponentInfo: null,
  telemetry: {
    mach: 1.84,
    altitude: 42500,
    dynamicPressure: 28.4,
    aoa: 4.2,
    thrust: 145.2,
    spoolN1: 88.5,
    spoolN2: 96.2,
    systemsStatus: 'NOMINAL',
  },
  setScrollProgress: (scrollProgress) => set({ scrollProgress }),
  setActiveSection: (activeSection) => set({ activeSection }),
  setOrbitEnabled: (isOrbitEnabled) => set({ isOrbitEnabled }),
  toggleAudio: () => set((state) => ({ isAudioEnabled: !state.isAudioEnabled })),
  setActiveComponent: (activeComponentId, activeComponentInfo = null) =>
    set({ activeComponentId, activeComponentInfo }),
  updateTelemetry: (data) =>
    set((state) => ({ telemetry: { ...state.telemetry, ...data } })),
}));
