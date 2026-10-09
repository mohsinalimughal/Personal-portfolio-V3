import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrgBadge, Reveal, SectionHeading } from "./ui";
import { useInView, useTilt } from "../hooks";
import { LEADERSHIP } from "../data/leadership";
import { LEARNING } from "../data/skills";

function OrbitDecor({ tone = "orange", size = 64 }) {
  const color = tone === "orange" ? "bg-orange" : "bg-teal";
  return (
    <div className="absolute top-4 right-4 pointer-events-none opacity-70" style={{ perspective: "260px" }} aria-hidden="true">
      <div className="relative" style={{ width: size, height: size, transformStyle: "preserve-3d", transform: "rotateX(62deg)" }}>
        <div className="absolute inset-0 rounded-full border border-current opacity-25" />
        <div className="absolute inset-0 orbit-spin" style={{ transformStyle: "preserve-3d" }}>
          {[0, 120, 240].map((deg) => (
            <span key={deg} className={`absolute w-2 h-2 rounded-full ${color}`}
              style={{ top: "50%", left: "50%", transform: `translate(-50%,-50%) rotate(${deg}deg) translate(${size / 2}px) rotate(${-deg}deg)` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function LeadershipRow({ l, i }) {
  const [ref, inView] = useInView(0.3);
  const tiltRef = useTilt(6, 10);
  return (
    <div ref={ref} className={`reveal-3d tilt-wrap ${inView ? "in" : ""}`} style={{ transitionDelay: `${i * 80}ms` }}>
      <div ref={tiltRef} className="tilt-el group flex items-center gap-3 bg-cream/5 hover:bg-orange/10 border border-cream/10 hover:border-orange/40 rounded-xl p-3 transition-colors duration-300">
        <OrgBadge initials={l.initials} logo={l.logo} tone="orange" size="w-11 h-11" />
        <div className="min-w-0">
          <div className="font-display font-700 text-cream text-sm sm:text-base group-hover:text-orange transition-colors">{l.org}</div>
          <div className="font-body text-xs sm:text-sm text-cream/55">{l.role}</div>
        </div>
      </div>
    </div>
  );
}

function LearningOrbit3D() {
  const mountRef = useRef(null);
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let w = mount.clientWidth, h = mount.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 1.4, 7.5);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setSize(w, h);
    mount.appendChild(renderer.domElement);

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.15, 1),
      new THREE.MeshBasicMaterial({ color: 0xf4efe3, wireframe: true, transparent: true, opacity: 0.4 })
    );
    scene.add(core);

    const orbitGroup = new THREE.Group();
    scene.add(orbitGroup);
    const radii = [2.1, 2.75, 3.4];
    const speeds = [0.011, -0.008, 0.006];
    const sats = radii.map((r, i) => {
      const g = new THREE.Group();
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(r - 0.004, r + 0.004, 64),
        new THREE.MeshBasicMaterial({ color: 0xf4efe3, transparent: true, opacity: 0.1, side: THREE.DoubleSide })
      );
      ring.rotation.x = Math.PI / 2 + i * 0.15;
      g.add(ring);
      const sat = new THREE.Mesh(
        new THREE.SphereGeometry(0.14, 14, 14),
        new THREE.MeshBasicMaterial({ color: 0xff5a1f })
      );
      sat.position.set(r, 0, 0);
      const holder = new THREE.Group();
      holder.rotation.x = Math.PI / 2 + i * 0.15;
      holder.add(sat);
      g.add(holder);
      orbitGroup.add(g);
      return { holder, angle: (i * Math.PI * 2) / 3 };
    });

    let raf, visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.05 });
    io.observe(mount);

    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!visible) return;
      core.rotation.y += 0.004;
      core.rotation.x += 0.0015;
      sats.forEach((s, i) => {
        s.angle += speeds[i];
        s.holder.rotation.z = s.angle;
      });
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
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);
  return <div ref={mountRef} className="absolute inset-0 pointer-events-none opacity-70" aria-hidden="true" />;
}

function LearningFlipCard({ l, i }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className={`flip-card float-y w-full h-24 cursor-pointer ${flipped ? "flipped" : ""}`}
      style={{ animationDelay: `${i * 0.4}s` }}
      onClick={() => setFlipped((f) => !f)}
    >
      <div className="flip-inner relative w-full h-full">
        <div className="flip-front absolute inset-0 rounded-xl bg-ink/85 backdrop-blur-sm text-cream flex flex-col items-center justify-center text-center px-2 border border-cream/15 shadow-lg">
          <span className="text-xl mb-1 leading-none">{l.icon}</span>
          <span className="font-display font-700 text-xs leading-tight">{l.label}</span>
        </div>
        <div className="flip-back absolute inset-0 rounded-xl bg-cream text-ink flex flex-col items-center justify-center text-center px-2 border-2 border-ink shadow-lg">
          <span className="font-body text-[10px] leading-tight">{l.blurb}</span>
        </div>
      </div>
    </div>
  );
}

export function Leadership() {
  return (
    <section id="leadership" className="max-w-6xl mx-auto px-3 sm:px-6 mt-6">
      <div className="grid lg:grid-cols-[1.3fr_1fr] gap-4">
        <Reveal className="relative bg-ink rounded-2xl p-6 sm:p-7 overflow-hidden">
          <OrbitDecor tone="orange" />
          <SectionHeading icon="◉" kicker="Youth leadership" title="Public speaking & leadership" dark />
          <div className="space-y-3 mt-1">
            {LEADERSHIP.map((l, i) => <LeadershipRow key={l.role} l={l} i={i} />)}
          </div>
        </Reveal>
        <Reveal className="relative bg-teal rounded-2xl p-6 sm:p-7 overflow-hidden flex flex-col min-h-[300px]">
          <LearningOrbit3D />
          <div className="relative">
            <div className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1 rounded-full border border-cream/25 text-cream/70 mb-2 w-fit">
              <span className="text-orange">◐</span> Currently learning
            </div>
            <p className="font-body text-cream/55 text-xs">Networking · Cybersecurity · AI Agents · Web3</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

