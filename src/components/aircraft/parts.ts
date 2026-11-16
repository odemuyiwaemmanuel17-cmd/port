export interface AircraftPart {
  id: string;
  label: string;
  blurb: string;
  /** Transform when fully assembled. */
  assembled: { position: [number, number, number]; rotation: [number, number, number] };
  /** Transform when fully exploded. Interpolation is deterministic in between. */
  exploded: { position: [number, number, number]; rotation?: [number, number, number] };
  hotspot: [number, number, number];
}

/**
 * The aircraft faces +X. Each part owns exactly one assembled and one
 * exploded transform; a single normalized progress value interpolates
 * position/rotation linearly, which keeps forward and backward scroll
 * perfectly reversible with no drift (no incremental accumulation).
 */
export const AIRCRAFT_PARTS: AircraftPart[] = [
  {
    id: 'fuselage',
    label: 'Fuselage',
    blurb: 'Semi-monocoque spine carrying the primary structural loads — frames, stringers and skin share the bending and pressure loads.',
    assembled: { position: [0, 0.35, 0], rotation: [0, 0, 0] },
    exploded: { position: [0, 1.9, 0], rotation: [0, 0, 0] },
    hotspot: [0.4, 0.95, 0],
  },
  {
    id: 'nose',
    label: 'Nose / Radar Cone',
    blurb: 'Radome housing the fire-control radar. Composite skin is RF-transparent and shaped for minimum drag at transonic speed.',
    assembled: { position: [3.55, 0.35, 0], rotation: [0, 0, 0] },
    exploded: { position: [5.6, 0.35, 0], rotation: [0, 0, 0] },
    hotspot: [4.1, 0.5, 0],
  },
  {
    id: 'canopy',
    label: 'Canopy',
    blurb: 'Blown acrylic bubble with a gold-oxide conductive coating for de-icing and radar cross-section control.',
    assembled: { position: [1.9, 0.92, 0], rotation: [0, 0, 0] },
    exploded: { position: [1.9, 2.9, 0], rotation: [0, 0, 0] },
    hotspot: [1.9, 1.35, 0],
  },
  {
    id: 'wing-left',
    label: 'Port Wing',
    blurb: 'Mid-mounted swept wing. Torsion box between front and rear spars carries lift; ailerons on the trailing edge roll the aircraft.',
    assembled: { position: [0.15, 0.3, 1.9], rotation: [0, 0.32, 0] },
    exploded: { position: [0.15, 0.3, 4.6], rotation: [0, 0.32, 0] },
    hotspot: [0.1, 0.5, 2.6],
  },
  {
    id: 'wing-right',
    label: 'Starboard Wing',
    blurb: 'Mirror of the port wing. Asymmetric ice or a stuck aileron shows up instantly as roll trim demand.',
    assembled: { position: [0.15, 0.3, -1.9], rotation: [0, -0.32, 0] },
    exploded: { position: [0.15, 0.3, -4.6], rotation: [0, -0.32, 0] },
    hotspot: [0.1, 0.5, -2.6],
  },
  {
    id: 'intake-left',
    label: 'Port Air Intake',
    blurb: 'Diverterless supersonic inlet feeding the engine at subsonic face velocity — boundary air is shed before the fan.',
    assembled: { position: [-0.6, 0.18, 1.05], rotation: [0, 0, 0] },
    exploded: { position: [-0.6, 0.18, 3.2], rotation: [0, 0, 0] },
    hotspot: [-0.6, 0.3, 1.25],
  },
  {
    id: 'intake-right',
    label: 'Starboard Air Intake',
    blurb: 'Mirror inlet. Distortion here is what single-engine testing programs measure against.',
    assembled: { position: [-0.6, 0.18, -1.05], rotation: [0, 0, 0] },
    exploded: { position: [-0.6, 0.18, -3.2], rotation: [0, 0, 0] },
    hotspot: [-0.6, 0.3, -1.25],
  },
  {
    id: 'engine-left',
    label: 'Port Powerplant',
    blurb: 'Afterburning turbofan. Core and bypass flows merge at the nozzle for dry and wet thrust ratings.',
    assembled: { position: [-0.55, 0.22, 1.05], rotation: [Math.PI / 2, 0, 0] },
    exploded: { position: [-0.55, 0.22, 3.9], rotation: [Math.PI / 2, 0, 0] },
    hotspot: [-0.55, 0.6, 1.05],
  },
  {
    id: 'engine-right',
    label: 'Starboard Powerplant',
    blurb: 'Mirror engine. Fuel trim between the two holds the aircraft straight at afterburner.',
    assembled: { position: [-0.55, 0.22, -1.05], rotation: [Math.PI / 2, 0, 0] },
    exploded: { position: [-0.55, 0.22, -3.9], rotation: [Math.PI / 2, 0, 0] },
    hotspot: [-0.55, 0.6, -1.05],
  },
  {
    id: 'nozzle-left',
    label: 'Port Exhaust Nozzle',
    blurb: 'Convergent-divergent nozzle. Throat area scheduling keeps the flow matched off design Mach.',
    assembled: { position: [-2.6, 0.22, 1.05], rotation: [Math.PI / 2, 0, 0] },
    exploded: { position: [-4.6, 0.22, 1.6], rotation: [Math.PI / 2, 0, 0] },
    hotspot: [-2.8, 0.5, 1.05],
  },
  {
    id: 'nozzle-right',
    label: 'Starboard Exhaust Nozzle',
    blurb: 'Mirror nozzle with the same position sensor feeding the FADEC thrust logic.',
    assembled: { position: [-2.6, 0.22, -1.05], rotation: [Math.PI / 2, 0, 0] },
    exploded: { position: [-4.6, 0.22, -1.6], rotation: [Math.PI / 2, 0, 0] },
    hotspot: [-2.8, 0.5, -1.05],
  },
  {
    id: 'fin-left',
    label: 'Port Vertical Tail',
    blurb: 'Canted twin fin. Yaw damping and rudder authority at high angle of attack where a single fin would blank.',
    assembled: { position: [-2.2, 1.15, 0.55], rotation: [0, 0, 0.22] },
    exploded: { position: [-2.2, 3.1, 1.7], rotation: [0, 0, 0.22] },
    hotspot: [-2.2, 1.7, 0.7],
  },
  {
    id: 'fin-right',
    label: 'Starboard Vertical Tail',
    blurb: 'Mirror fin. The pair also shields the nozzle exhaust from the stabilators.',
    assembled: { position: [-2.2, 1.15, -0.55], rotation: [0, 0, -0.22] },
    exploded: { position: [-2.2, 3.1, -1.7], rotation: [0, 0, -0.22] },
    hotspot: [-2.2, 1.7, -0.7],
  },
  {
    id: 'stabilator-left',
    label: 'Port Stabilator',
    blurb: 'All-moving horizontal tail. Pitches the aircraft and trims the nose-heavy fuel state.',
    assembled: { position: [-2.35, 0.42, 1.05], rotation: [0, 0.5, 0] },
    exploded: { position: [-2.35, 0.42, 3.1], rotation: [0, 0.5, 0] },
    hotspot: [-2.4, 0.6, 1.5],
  },
  {
    id: 'stabilator-right',
    label: 'Starboard Stabilator',
    blurb: 'Mirror stabilator, ganged for pitch and differential for direct pitch control at high alpha.',
    assembled: { position: [-2.35, 0.42, -1.05], rotation: [0, -0.5, 0] },
    exploded: { position: [-2.35, 0.42, -3.1], rotation: [0, -0.5, 0] },
    hotspot: [-2.4, 0.6, -1.5],
  },
  {
    id: 'gear',
    label: 'Landing Gear',
    blurb: 'Tricycle arrangement: nose wheel for steering, twin mains retracting into the wing torsion boxes.',
    assembled: { position: [0, 0, 0], rotation: [0, 0, 0] },
    exploded: { position: [0, -2.4, 0], rotation: [0, 0, 0] },
    hotspot: [0.6, -0.9, 0],
  },
];

export const PART_BY_ID = new Map(AIRCRAFT_PARTS.map((p) => [p.id, p]));
