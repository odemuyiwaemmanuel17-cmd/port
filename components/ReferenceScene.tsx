"use client";
import { useEffect, useRef } from "react";
import ReferenceFallback from "./ReferenceFallback";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

type Variant = "hero" | "sculpture" | "coins" | "orbs" | "cube" | "wave";
/** Each scene reproduces a distinct shot from the supplied reference, not a shared hero ornament. */
export default function ReferenceScene({
  variant,
  paused = false,
}: {
  variant: Variant;
  paused?: boolean;
}) {
  const host = useRef<HTMLDivElement>(null);
  const pause = useRef(paused);
  pause.current = paused;
  useEffect(() => {
    const el = host.current!;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
    } catch {
      el.dataset.fallback = "true";
      return;
    }
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(
      Math.min(devicePixelRatio, innerWidth < 760 ? 1.25 : 1.7),
    );
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    el.appendChild(renderer.domElement);
    renderer.domElement.setAttribute("aria-hidden", "true");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const env = pmrem.fromScene(room, 0.02);
    scene.environment = env.texture;
    const chrome = new THREE.MeshPhysicalMaterial({
      color: 0xb2b3d3,
      metalness: 1,
      roughness: 0.17,
      clearcoat: 1,
      envMapIntensity: 1.5,
    });
    const black = new THREE.MeshPhysicalMaterial({
      color: 0x111019,
      metalness: 1,
      roughness: 0.24,
      envMapIntensity: 0.55,
    });
    const panel = new THREE.MeshStandardMaterial({
      color: 0x15141d,
      metalness: 0.75,
      roughness: 0.4,
    });
    const colors = [
      0xee13ff, 0xafff30, 0x74a7ff, 0xf7468e, 0xa5b0ff, 0x00eda4, 0xffffff,
      0xad37ff,
    ];
    const neon = colors.map(
      (color) =>
        new THREE.MeshStandardMaterial({
          color,
          emissive: color,
          emissiveIntensity: 2.4,
          roughness: 0.22,
          metalness: 0.3,
        }),
    );
    const objects = new THREE.Group();
    scene.add(objects);
    const key = new THREE.DirectionalLight(0xdfddff, 4);
    key.position.set(-3, 5, 5);
    scene.add(key);
    const fill = new THREE.PointLight(0x9378ff, 35, 30);
    fill.position.set(-4, 1, 5);
    scene.add(fill);
    const edge = new THREE.PointLight(0xb2cbff, 30, 30);
    edge.position.set(5, -3, 2);
    scene.add(edge);
    const moving: THREE.Object3D[] = [];
    let hinge: THREE.Group | undefined;
    const orb = (size: number, color: number) => {
      const group = new THREE.Group();
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(size, 40, 24),
        chrome,
      );
      group.add(sphere);
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(size * 1.025, 0.018, 8, 96),
        neon[color % 8],
      );
      ring.rotation.x = 0.35;
      ring.rotation.y = 0.24;
      group.add(ring);
      return group;
    };
    if (variant === "hero") {
      const glass = new THREE.MeshPhysicalMaterial({
        color: 0xc9c9ef,
        transmission: 0.62,
        thickness: 0.9,
        metalness: 0.25,
        roughness: 0.08,
        ior: 1.5,
        transparent: true,
        opacity: 0.75,
      });
      const shaft = new THREE.Group();
      shaft.rotation.z = -0.58;
      shaft.position.set(0, -0.45, -1.2);
      objects.add(shaft);
      for (let i = 0; i < 4; i++) {
        const tube = new THREE.Mesh(
          new THREE.CylinderGeometry(0.62, 0.62, 2.6, 48, 1, true),
          glass,
        );
        tube.rotation.z = Math.PI / 2;
        tube.position.x = (i - 1.5) * 2.75;
        shaft.add(tube);
        const crystal = new THREE.Mesh(
          new THREE.IcosahedronGeometry(0.72, 0),
          chrome,
        );
        crystal.scale.set(1.9, 0.7, 0.7);
        crystal.position.copy(tube.position);
        crystal.rotation.x = i;
        shaft.add(crystal);
        const collar = new THREE.Mesh(
          new THREE.CylinderGeometry(0.67, 0.67, 0.35, 48),
          chrome,
        );
        collar.rotation.z = Math.PI / 2;
        collar.position.x = tube.position.x - 1.24;
        shaft.add(collar);
      }
      const track = new THREE.Group();
      track.position.set(0, -1.45, 1);
      track.rotation.x = 0.25;
      track.rotation.z = 0.02;
      objects.add(track);
      const shape = new THREE.Shape();
      shape.absarc(0, -7, 7.3, 0.24, Math.PI - 0.24, false);
      shape.absarc(0, -7, 6.25, Math.PI - 0.24, 0.24, true);
      shape.closePath();
      track.add(
        new THREE.Mesh(
          new THREE.ExtrudeGeometry(shape, {
            depth: 0.16,
            bevelEnabled: true,
            bevelSize: 0.025,
            bevelThickness: 0.025,
            bevelSegments: 2,
            curveSegments: 100,
          }),
          panel,
        ),
      );
      for (const radius of [6.25, 7.3]) {
        const line = new THREE.Mesh(
          new THREE.TorusGeometry(radius, 0.035, 8, 150, Math.PI - 0.48),
          chrome,
        );
        line.rotation.z = 0.24;
        line.position.set(0, -7, 0.18);
        track.add(line);
      }
      for (let i = 0; i < 105; i++) {
        const angle = 0.25 + (i / 104) * (Math.PI - 0.5);
        const rib = new THREE.Mesh(
          new THREE.BoxGeometry(0.018, 1, 0.025),
          black,
        );
        rib.position.set(
          Math.cos(angle) * 6.77,
          Math.sin(angle) * 6.77 - 7,
          0.2,
        );
        rib.rotation.z = angle - Math.PI / 2;
        track.add(rib);
      }
      for (let i = 0; i < 5; i++) {
        const pod = new THREE.Group();
        const body = new THREE.Mesh(
          new THREE.BoxGeometry(0.48, 0.65, 0.48),
          new THREE.MeshPhysicalMaterial({
            color: colors[i],
            metalness: 0.25,
            roughness: 0.1,
            transmission: 0.7,
            thickness: 0.6,
            transparent: true,
            opacity: 0.9,
          }),
        );
        pod.add(body);
        const top = new THREE.Mesh(
          new THREE.BoxGeometry(0.53, 0.12, 0.53),
          chrome,
        );
        top.position.y = 0.38;
        pod.add(top);
        const glow = new THREE.Mesh(
          new THREE.BoxGeometry(0.1, 0.18, 0.15),
          neon[i],
        );
        pod.add(glow);
        pod.userData.angle = 0.45 + i * 0.54;
        moving.push(pod);
        track.add(pod);
      }
      objects.position.y = 0.9;
    } else if (variant === "sculpture") {
      const points = Array.from({ length: 100 }, (_, i) => {
        const t = (i / 100) * Math.PI * 2;
        const r = 1.65 + 0.42 * Math.cos(t * 4);
        return new THREE.Vector3(
          Math.cos(t) * r,
          Math.sin(t) * r,
          Math.sin(t * 2) * 0.18,
        );
      });
      const shape = new THREE.Mesh(
        new THREE.TubeGeometry(
          new THREE.CatmullRomCurve3(points, true),
          240,
          0.64,
          32,
          true,
        ),
        black,
      );
      shape.scale.setScalar(1.35);
      objects.add(shape);
      moving.push(shape);
      objects.rotation.z = Math.PI / 4;
      objects.rotation.y = -0.35;
      key.intensity = 2;
      edge.intensity = 55;
    } else if (variant === "coins") {
      for (let i = 0; i < 6; i++) {
        const coin = new THREE.Group();
        const material = new THREE.MeshStandardMaterial({
          color: i % 2 ? 0x284f70 : 0x839bcb,
          metalness: 0.75,
          roughness: 0.32,
        });
        const disk = new THREE.Mesh(
          new THREE.CylinderGeometry(0.7, 0.7, 0.12, 64),
          material,
        );
        disk.rotation.x = Math.PI / 2;
        coin.add(disk);
        const rim = new THREE.Mesh(
          new THREE.TorusGeometry(0.64, 0.012, 8, 64),
          chrome,
        );
        rim.position.z = 0.07;
        coin.add(rim);
        const mark = new THREE.Mesh(
          new THREE.OctahedronGeometry(0.28),
          material,
        );
        mark.scale.z = 0.16;
        mark.position.z = 0.1;
        coin.add(mark);
        coin.position.set((i - 2.5) * 1.65, Math.sin(i * 1.4) * 0.38, 0);
        coin.rotation.set(0.1, i * 0.15, 0.08);
        objects.add(coin);
        moving.push(coin);
      }
      objects.scale.setScalar(1.15);
    } else if (variant === "orbs") {
      for (let i = 0; i < 8; i++) {
        const node = orb(0.46, i);
        objects.add(node);
        moving.push(node);
      }
      objects.rotation.x = 0.18;
    } else if (variant === "cube") {
      const size = 2.7;
      const body = new THREE.Group();
      objects.add(body);
      body.rotation.set(0.32, -0.55, 0.06);
      const wall = (
        w: number,
        h: number,
        d: number,
        x: number,
        y: number,
        z: number,
      ) => {
        const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), panel);
        mesh.position.set(x, y, z);
        body.add(mesh);
      };
      wall(size, size, 0.12, 0, 0, -size / 2);
      wall(0.12, size, size, -size / 2, 0, 0);
      wall(0.12, size, size, size / 2, 0, 0);
      wall(size, 0.12, size, 0, size / 2, 0);
      wall(size, 0.12, size, 0, -size / 2, 0);
      hinge = new THREE.Group();
      hinge.position.set(-size / 2, 0, size / 2);
      body.add(hinge);
      const door = new THREE.Mesh(
        new THREE.BoxGeometry(size, size, 0.1),
        black,
      );
      door.position.x = size / 2;
      hinge.add(door);
      const ball = orb(0.79, 0);
      ball.position.set(0.2, -0.2, 0);
      body.add(ball);
      moving.push(ball);
      objects.position.y = 0.35;
    } else {
      for (let i = 0; i < 25; i++) {
        const points = Array.from({ length: 50 }, (_, j) => {
          const x = (j / 49) * 5 - 2.5;
          return new THREE.Vector3(
            x,
            Math.exp(-((x + 1.5) ** 2)) * 2.6 - i * 0.085,
            Math.sin((j / 49) * Math.PI) * 0.5,
          );
        });
        objects.add(
          new THREE.Line(
            new THREE.BufferGeometry().setFromPoints(points),
            new THREE.LineBasicMaterial({
              color: new THREE.Color().setHSL(0.64 - i * 0.003, 0.65, 0.65),
            }),
          ),
        );
      }
      objects.rotation.set(0.1, -0.35, -0.1);
    }
    let visible = false,
      dirty = true,
      raf = 0,
      last = 0,
      time = 0;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const resize = () => {
      const w = el.clientWidth,
        h = el.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.position.z =
        variant === "hero"
          ? Math.max(15, 12 / (camera.aspect * 0.63))
          : variant === "sculpture"
            ? 11.7
            : variant === "coins"
              ? Math.max(13, 11 / (camera.aspect * 0.63))
              : variant === "cube"
                ? 10
                : variant === "wave"
                  ? 10
                  : 11;
      camera.updateProjectionMatrix();
      dirty = true;
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        dirty = true;
      },
      { rootMargin: "100px" },
    );
    observer.observe(el);
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    const change = () => {
      dirty = true;
    };
    window.addEventListener("scroll", change, { passive: true });
    reduced.addEventListener("change", change);
    const loss = (e: Event) => {
      e.preventDefault();
      el.dataset.fallback = "true";
    };
    renderer.domElement.addEventListener("webglcontextlost", loss);
    const render = (now: number) => {
      raf = requestAnimationFrame(render);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!visible || document.hidden) return;
      const still = pause.current || reduced.matches;
      if (still && !dirty) return;
      if (!still) time += dt;
      dirty = false;
      const box = el.getBoundingClientRect();
      const story = el.closest("[data-shot]") as HTMLElement | null;
      const scroll = story
        ? Math.max(
            0,
            Math.min(
              1,
              -story.getBoundingClientRect().top /
                Math.max(1, story.offsetHeight - innerHeight),
            ),
          )
        : Math.max(0, Math.min(1, -box.top / Math.max(1, box.height)));
      if (variant === "hero") {
        objects.rotation.z = Math.sin(time * 0.18) * 0.016;
        objects.position.z = scroll * 2;
        moving.forEach((pod, i) => {
          const a = pod.userData.angle + Math.sin(time * 0.3 + i) * 0.055;
          pod.position.set(Math.cos(a) * 6.77, Math.sin(a) * 6.77 - 7, 0.52);
          pod.rotation.x = Math.PI / 2;
          pod.rotation.z = a;
        });
      }
      if (variant === "sculpture") {
        objects.rotation.x = scroll * 1.4 + Math.sin(time * 0.12) * 0.15;
        objects.rotation.y = -0.5 + scroll * 2.9;
        objects.rotation.z = Math.PI / 4 + scroll * 0.75;
        objects.scale.setScalar(1 + Math.sin(scroll * Math.PI) * 0.15);
      }
      if (variant === "coins")
        moving.forEach((node, i) => {
          node.rotation.y = 0.22 + Math.sin(time * 0.4 + i) * 0.3;
          node.position.y = Math.sin(time * 0.5 + i * 1.4) * 0.3;
        });
      if (variant === "orbs")
        moving.forEach((node, i) => {
          const angle = (i / 8) * Math.PI * 2 + time * 0.18;
          node.position.set(
            Math.cos(angle) * 1.92,
            Math.sin(angle) * 1.92,
            Math.sin(angle) * 0.2,
          );
          node.rotation.z = -angle;
        });
      if (variant === "cube" && hinge) {
        const opening = still
          ? scroll
          : (Math.sin(time * 0.7 - Math.PI / 2) + 1) / 2;
        hinge.rotation.y = -opening * 1.8;
        moving[0].position.z = 0.4 + opening * 2.2;
        moving[0].rotation.z = time * 0.3;
        objects.rotation.y = scroll * 0.4;
      }
      if (variant === "wave")
        objects.rotation.y = -0.35 + Math.sin(time * 0.25) * 0.12;
      renderer.render(scene, camera);
      el.dataset.ready = "true";
    };
    resize();
    raf = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      ro.disconnect();
      window.removeEventListener("scroll", change);
      reduced.removeEventListener("change", change);
      renderer.domElement.removeEventListener("webglcontextlost", loss);
      const geometries = new Set<THREE.BufferGeometry>(),
        materials = new Set<THREE.Material>();
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh || o instanceof THREE.Line) {
          geometries.add(o.geometry);
          (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) =>
            materials.add(m),
          );
        }
      });
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      chrome.dispose();
      black.dispose();
      panel.dispose();
      neon.forEach((m) => m.dispose());
      env.dispose();
      room.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [variant]);
  return (
    <div
      data-paused={paused}
      className={`reference-scene scene-${variant}`}
      ref={host}
    >
      <ReferenceFallback variant={variant} />
    </div>
  );
}
