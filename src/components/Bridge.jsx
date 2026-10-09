import { useState, useEffect, useRef } from "react";
import * as THREE from "three";

function BridgeDNA() {
  const mountRef = useRef(null);
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let w = mount.clientWidth, h = mount.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 100);
    camera.position.set(0, 0, 11);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setSize(w, h);
    mount.appendChild(renderer.domElement);

    const helix = new THREE.Group();
    scene.add(helix);

    const TURNS = 3.2, SEGMENTS = 46, RADIUS = 1.6, HEIGHT = 8;
    const matA = new THREE.MeshBasicMaterial({ color: 0xff5a1f });
    const matB = new THREE.MeshBasicMaterial({ color: 0xf4efe3 });
    const rungMat = new THREE.LineBasicMaterial({ color: 0xf4efe3, transparent: true, opacity: 0.35 });
    const sphereGeo = new THREE.SphereGeometry(0.13, 10, 10);

    const strandA = [], strandB = [];
    for (let i = 0; i <= SEGMENTS; i++) {
      const t = i / SEGMENTS;
      const angle = t * Math.PI * 2 * TURNS;
      const y = (t - 0.5) * HEIGHT;
      const ax = Math.cos(angle) * RADIUS, az = Math.sin(angle) * RADIUS;
      const bx = Math.cos(angle + Math.PI) * RADIUS, bz = Math.sin(angle + Math.PI) * RADIUS;
      strandA.push(new THREE.Vector3(ax, y, az));
      strandB.push(new THREE.Vector3(bx, y, bz));

      const sa = new THREE.Mesh(sphereGeo, matA); sa.position.copy(strandA[i]); helix.add(sa);
      const sb = new THREE.Mesh(sphereGeo, matB); sb.position.copy(strandB[i]); helix.add(sb);

      if (i % 3 === 0) {
        const rungGeo = new THREE.BufferGeometry().setFromPoints([strandA[i], strandB[i]]);
        helix.add(new THREE.Line(rungGeo, rungMat));
      }
    }
    const curveA = new THREE.CatmullRomCurve3(strandA);
    const curveB = new THREE.CatmullRomCurve3(strandB);
    helix.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curveA.getPoints(120)), new THREE.LineBasicMaterial({ color: 0xff5a1f, transparent: true, opacity: 0.5 })));
    helix.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curveB.getPoints(120)), new THREE.LineBasicMaterial({ color: 0xf4efe3, transparent: true, opacity: 0.3 })));

    helix.rotation.z = 0.45;

    let raf, visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.05 });
    io.observe(mount);

    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!visible) return;
      helix.rotation.y += 0.0032;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      w = mount.clientWidth; h = mount.clientHeight;
      camera.aspect = w / h; camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      sphereGeo.dispose(); matA.dispose(); matB.dispose(); rungMat.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);
  return <div ref={mountRef} className="absolute inset-0 pointer-events-none opacity-60" aria-hidden="true" />;
}

export function Bridge() {
  return (
    <section id="bridge" className="max-w-6xl mx-auto px-3 sm:px-6 mt-6">
      <div className="bg-teal text-cream rounded-3xl p-6 sm:p-10 lg:p-14 grid lg:grid-cols-[1fr_1.2fr] gap-10 items-center relative overflow-hidden">
        <div className="absolute inset-0 lg:right-1/2">
          <BridgeDNA />
        </div>
        <div className="relative">
          <div className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1 rounded-full border border-cream/25 text-cream/70 mb-4">
            <span className="text-orange">⇄</span> The bridge
          </div>
          <h2 className="font-display font-900 text-3xl sm:text-4xl leading-tight tracking-tight">
            Operations experience. Engineering skills.
          </h2>
        </div>
        <div className="relative">
          <p className="font-body text-cream/85 text-base sm:text-lg leading-relaxed">
            Most developers build tools for workflows they've never worked inside. I've spent time in US healthcare back-office operations, so I know where repetitive, manual work piles up — and I build MERN-stack tools to automate it.
          </p>
          <p className="mt-4 font-body text-orange font-medium">
            That's the gap I fill: technical execution grounded in real operational context.
          </p>
        </div>
      </div>
    </section>
  );
}

