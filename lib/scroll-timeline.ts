/** Pure scroll mapping shared by the narrative and project navigation. */
export function projectAtScroll(
  y: number,
  top: number,
  travel: number,
  count: number,
) {
  return Math.max(
    0,
    Math.min(count - 1, Math.floor(((y - top) / Math.max(1, travel)) * count)),
  );
}

export function scrollForProject(
  index: number,
  top: number,
  travel: number,
  count: number,
) {
  // Aim inside the beat, clear of floating-point and viewport rounding boundaries.
  return (
    top +
    ((Math.max(0, Math.min(count - 1, index)) + 0.15) / count) *
      Math.max(1, travel)
  );
}

export function sceneAtScroll(
  y: number,
  about: number,
  work: number,
  skills: number,
  viewport: number,
) {
  if (y < about) return Math.max(0, y / Math.max(1, about));
  if (y < work) return 1 + (y - about) / Math.max(1, work - about);
  if (y < skills) return 2 + (y - work) / Math.max(1, skills - work);
  return 3 + Math.min((y - skills) / Math.max(1, viewport * 3), 1);
}
