import { MOUSE, TOUCH } from 'three';

/**
 * Shared OrbitControls mapping: single-finger touch is intentionally a no-op
 * (TOUCH.PAN with enablePan=false) so vertical page scrolling always wins on
 * touch devices. Left-drag rotates, right-drag dollies. In scroll-driven
 * sections the wheel is additionally stopped from reaching the canvas so it
 * drives the page timeline instead of zoom (see AircraftLab).
 */
export const orbitProps = {
  makeDefault: true,
  enablePan: false,
  enableDamping: true,
  dampingFactor: 0.08,
  enableZoom: true,
  zoomSpeed: 0.9,
  mouseButtons: { LEFT: MOUSE.ROTATE, MIDDLE: MOUSE.DOLLY, RIGHT: MOUSE.DOLLY },
  touches: { ONE: TOUCH.PAN, TWO: TOUCH.DOLLY_ROTATE },
} as const;
