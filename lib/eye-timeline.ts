export const EYE_CHAPTERS = 8;
export function eyePose(chapter: number, reduced = false) {
  const q = Math.max(0, Math.min(7, chapter));
  const fraction = q - Math.floor(q);
  const passage = reduced ? 0 : Math.sin(Math.PI * Math.max(0, Math.min(1, (fraction - 0.55) / 0.45)));
  return {
    rotation: reduced ? 0 : q * 0.62,
    spread: reduced ? 0.15 : 0.18 + Math.sin(q * 0.7) * 0.12 + passage * 0.65,
    zoom: reduced ? 1 : 1 + passage * 0.7,
    tilt: reduced ? 0 : Math.sin(q * 0.9) * 0.18,
    aperture: 0.4 + Math.min(q / 7, 1) * 0.5,
    chapter: Math.min(7, Math.floor(q)),
  };
}
