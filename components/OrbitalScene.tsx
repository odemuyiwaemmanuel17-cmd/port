"use client";

import { useEffect, useRef } from "react";
import { sceneAtScroll } from "../lib/scroll-timeline";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/** A single persistent scene; scroll controls the camera and mechanical assembly. */
export default function OrbitalScene({
  paused,
  wireframe,
}: {
  paused: boolean;
  wireframe: boolean;
}) {
  const host = useRef<HTMLDivElement>(null);
  const flags = useRef({ paused, wireframe });
  flags.current = { paused, wireframe };
  useEffect(() => {
    const container = host.current!;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: window.innerWidth > 700,
        alpha: true,
        powerPreference: "low-power",
      });
    } catch {
      container.dataset.fallback = "true";
      return;
    }
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, window.innerWidth < 700 ? 1.25 : 1.75),
    );
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x060807, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);
    renderer.domElement.setAttribute("aria-hidden", "true");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      37,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    );
    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const env = pmrem.fromScene(room, 0.04);
    scene.environment = env.texture;
    const chrome = new THREE.MeshStandardMaterial({
      color: 0x9ba9a4,
      metalness: 1,
      roughness: 0.23,
    });
    const dark = new THREE.MeshStandardMaterial({
      color: 0x242a27,
      metalness: 0.9,
      roughness: 0.26,
    });
    const lime = new THREE.MeshStandardMaterial({
      color: 0xd4f799,
      emissive: 0xb9ef76,
      emissiveIntensity: 1.1,
      roughness: 0.35,
      metalness: 0.3,
    });
    const assembly = new THREE.Group();
    scene.add(assembly);
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.68, 3), dark);
    assembly.add(core);
    const rings: THREE.Mesh[] = [];
    for (let i = 0; i < 3; i++) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(1.23 + i * 0.34, 0.115 - i * 0.02, 20, 120),
        i === 1 ? dark : chrome,
      );
      rings.push(ring);
      assembly.add(ring);
      const seam = new THREE.Mesh(
        new THREE.TorusGeometry(1.23 + i * 0.34, 0.017, 8, 120, Math.PI * 0.6),
        lime,
      );
      seam.position.z = 0.09;
      ring.add(seam);
    }
    const satellites = Array.from({ length: 5 }, (_, i) => {
      const node = new THREE.Mesh(
        i === 4
          ? new THREE.OctahedronGeometry(0.19)
          : new THREE.SphereGeometry(0.12 + i * 0.016, 24, 16),
        i % 2 ? lime : chrome,
      );
      assembly.add(node);
      return node;
    });
    const orbit = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints(
        Array.from(
          { length: 160 },
          (_, i) =>
            new THREE.Vector3(
              Math.cos((i / 160) * Math.PI * 2) * 2.45,
              Math.sin((i / 160) * Math.PI * 2) * 2.45,
              0,
            ),
        ),
      ),
      new THREE.LineBasicMaterial({
        color: 0x859279,
        transparent: true,
        opacity: 0.22,
      }),
    );
    orbit.rotation.x = 1.25;
    assembly.add(orbit);
    const stars = new Float32Array(210 * 3);
    // Deterministic placement avoids random layouts between visits.
    for (let i = 0; i < 210; i++) {
      stars[i * 3] = Math.sin(i * 127.1) * 19;
      stars[i * 3 + 1] = Math.cos(i * 311.7) * 12;
      stars[i * 3 + 2] = -3 - Math.abs(Math.sin(i * 71.2)) * 15;
    }
    const dust = new THREE.Points(
      new THREE.BufferGeometry().setAttribute(
        "position",
        new THREE.BufferAttribute(stars, 3),
      ),
      new THREE.PointsMaterial({
        color: 0x9aab93,
        size: 0.025,
        transparent: true,
        opacity: 0.5,
      }),
    );
    scene.add(dust);
    const key = new THREE.DirectionalLight(0xe9f5ff, 4);
    key.position.set(-3, 4, 5);
    scene.add(key);
    const rim = new THREE.PointLight(0xd6f49f, 25, 20);
    rim.position.set(3, -1, 3);
    scene.add(rim);
    const fill = new THREE.PointLight(0x92acdc, 35, 20);
    fill.position.set(-4, 2, -1);
    scene.add(fill);
    let raf = 0,
      progress = 0,
      time = 0,
      previous = 0,
      dirty = true;
    const pointer = new THREE.Vector2();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const markDirty = () => {
      dirty = true;
    };
    reduced.addEventListener("change", markDirty);
    const move = (e: PointerEvent) => {
      pointer.set(e.clientX / innerWidth - 0.5, e.clientY / innerHeight - 0.5);
      dirty = true;
    };
    const resize = () => {
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
      dirty = true;
    };
    const lost = (e: Event) => {
      e.preventDefault();
      container.dataset.fallback = "true";
    };
    const restored = () => {
      delete container.dataset.fallback;
      dirty = true;
    };
    renderer.domElement.addEventListener("webglcontextlost", lost);
    renderer.domElement.addEventListener("webglcontextrestored", restored);
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", markDirty, { passive: true });
    window.addEventListener("pointermove", move, { passive: true });
    function frame(now: number) {
      raf = requestAnimationFrame(frame);
      if (document.hidden) {
        previous = now;
        return;
      }
      const dt = Math.min((now - previous) / 1000, 0.05);
      previous = now;
      const still = flags.current.paused || reduced.matches;
      if (still && !dirty && chrome.wireframe === flags.current.wireframe)
        return;
      if (!still) time += dt;
      dirty = false;
      const about = document.getElementById("about")?.offsetTop || innerHeight;
      const work =
        document.getElementById("projects")?.offsetTop || innerHeight * 2;
      const skills =
        document.getElementById("skills")?.offsetTop || innerHeight * 5;
      const y = window.scrollY;
      const target = sceneAtScroll(y, about, work, skills, innerHeight);
      progress = still
        ? target
        : THREE.MathUtils.lerp(progress, target, 1 - Math.exp(-dt * 7));
      const mobile = innerWidth < 760;
      camera.position.set(
        mobile ? 0 : Math.sin(progress * Math.PI) * 0.18,
        0,
        mobile ? 10.6 : 8.7 - Math.sin(progress * Math.PI) * 0.4,
      );
      camera.lookAt(0, 0, 0);
      const p = progress;
      assembly.position.x = mobile
        ? 0
        : p < 1
          ? 1.8 - p * 3.25
          : p < 2
            ? -1.45 + (p - 1) * 2.95
            : p < 3
              ? 1.5
              : 1.5 - (p - 3) * 1.5;
      assembly.position.y = mobile
        ? THREE.MathUtils.lerp(-2.1, 0.7, Math.min(p / 0.8, 1))
        : 0.12;
      assembly.scale.setScalar(mobile ? 0.85 : p > 3 ? 1 - (p - 3) * 0.25 : 1);
      assembly.rotation.set(
        0.2 + p * 0.36 + (still ? 0 : pointer.y * 0.13),
        -0.35 + p * 0.52 + (still ? 0 : pointer.x * 0.18),
        -0.28 + time * 0.065,
      );
      core.rotation.set(time * 0.12, p * 0.9, time * 0.06);
      rings.forEach((ring, i) => {
        ring.rotation.set(
          i * 0.72 + p * (i === 1 ? 0.48 : -0.28),
          i * 0.65 + time * 0.035 * (i + 1),
          i * 0.8 + p * 0.2,
        );
        ring.position.y =
          Math.sin((Math.min(Math.max(p - 1, 0), 1) * Math.PI) / 2) *
          (i - 1) *
          0.48;
        ring.scale.setScalar(
          1 + (p > 2 ? Math.sin((p - 2) * Math.PI) * 0.15 : 0),
        );
      });
      satellites.forEach((node, i) => {
        const a = (i / 5) * Math.PI * 2 + time * 0.11 + p * 0.5;
        node.position.set(
          Math.cos(a) * 2.5,
          Math.sin(a) * 1.75,
          Math.sin(a + 0.5) * 0.85,
        );
      });
      chrome.wireframe = dark.wireframe = flags.current.wireframe;
      renderer.render(scene, camera);
    }
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      reduced.removeEventListener("change", markDirty);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", markDirty);
      window.removeEventListener("pointermove", move);
      renderer.domElement.removeEventListener("webglcontextlost", lost);
      renderer.domElement.removeEventListener("webglcontextrestored", restored);
      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>();
      scene.traverse((object) => {
        if (
          object instanceof THREE.Mesh ||
          object instanceof THREE.Line ||
          object instanceof THREE.Points
        ) {
          geometries.add(object.geometry);
          (Array.isArray(object.material)
            ? object.material
            : [object.material]
          ).forEach((m) => materials.add(m));
        }
      });
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      env.dispose();
      room.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);
  return (
    <div className="orbital-scene" ref={host}>
      <div className="scene-fallback" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
    </div>
  );
}
