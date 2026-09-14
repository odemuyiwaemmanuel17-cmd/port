import test from "node:test";
import assert from "node:assert/strict";
import {
  projectAtScroll,
  scrollForProject,
  sceneAtScroll,
} from "../lib/scroll-timeline.ts";

test("every project button lands in its own beat across phone and desktop heights", () => {
  for (const viewport of [568, 667, 844, 900, 1080]) {
    for (const count of [1, 5, 8]) {
      const top = viewport * 2.25;
      const travel = viewport * 3.8;
      for (let index = 0; index < count; index++) {
        const position = scrollForProject(index, top, travel, count);
        assert.equal(projectAtScroll(position, top, travel, count), index);
      }
    }
  }
});

test("overscroll and degenerate viewport measurements never select a missing project", () => {
  assert.equal(projectAtScroll(-100, 1000, 3000, 5), 0);
  assert.equal(projectAtScroll(99999, 1000, 3000, 5), 4);
  assert.equal(projectAtScroll(1000, 1000, 0, 5), 0);
});

test("camera timeline is continuous, monotonic, and bounded through every chapter", () => {
  const anchors = [1000, 2200, 7000, 900];
  let previous = 0;
  for (let y = -100; y <= 12000; y += 5) {
    const phase = sceneAtScroll(y, ...anchors);
    assert.ok(phase >= previous && phase >= 0 && phase <= 4);
    assert.ok(phase - previous < 0.01);
    previous = phase;
  }
  assert.equal(sceneAtScroll(1000, ...anchors), 1);
  assert.equal(sceneAtScroll(2200, ...anchors), 2);
  assert.equal(sceneAtScroll(7000, ...anchors), 3);
});
