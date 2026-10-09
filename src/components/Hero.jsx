import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { Icon } from "./ui";
import { useTilt } from "../hooks";
import { IMG } from "../data/images";
import { SOCIALS } from "../data/social";

function Hero3D() {
  const mountRef = useRef(null);
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let w = mount.clientWidth, h = mount.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 0, 9);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setSize(w, h);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const ico = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.6, 1),
      new THREE.MeshBasicMaterial({ color: 0xff5a1f, wireframe: true, transparent: true, opacity: 0.55 })
    );
    group.add(ico);

    const shell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(3.4, 0),
      new THREE.MeshBasicMaterial({ color: 0xf4efe3, wireframe: true, transparent: true, opacity: 0.12 })
    );
    group.add(shell);

    const dotGeo = new THREE.BufferGeometry();
    const N = 60, positions = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const r = 4.4 + Math.random() * 1.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    dotGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const dots = new THREE.Points(dotGeo, new THREE.PointsMaterial({ color: 0xff5a1f, size: 0.045, transparent: true, opacity: 0.6 }));
    scene.add(dots);

    let raf;
    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.05 });
    io.observe(mount);

    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!visible) return;
      group.rotation.y += 0.0022;
      group.rotation.x += 0.0009;
      dots.rotation.y -= 0.0007;
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
      ico.geometry.dispose(); ico.material.dispose();
      shell.geometry.dispose(); shell.material.dispose();
      dotGeo.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);
  return <div ref={mountRef} className="absolute inset-0 pointer-events-none opacity-80" aria-hidden="true" />;
}

export function Hero() {
  const photoRef = useTilt(10, 14);
  return (
    <section id="hero" className="max-w-6xl mx-auto px-3 sm:px-6 pt-8">
      <div className="bg-ink text-cream rounded-3xl p-6 sm:p-10 lg:p-14 relative overflow-hidden">
        <Hero3D />
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-orange/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative grid lg:grid-cols-[1.3fr_1fr] gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 border border-cream/25 rounded-full px-3 py-1 text-xs font-mono text-cream/70 mb-6">
              <Icon name="pin" className="w-3.5 h-3.5 text-orange" /> Karachi, Pakistan
            </div>
            <h1 className="font-display font-900 text-4xl sm:text-5xl lg:text-6xl leading-[1.03] tracking-tight">
              Full-stack MERN.<br/>
              <span className="text-orange">Back-office savvy.</span><br/>
              Automation-minded.
            </h1>
            <p className="mt-6 font-body text-cream/75 text-base sm:text-lg max-w-lg leading-relaxed">
              I'm Mohsin Ali Mughal — a MERN stack developer and Computer Science student with hands-on experience in US healthcare back-office operations. I build tools that automate repetitive work, and I'm growing my skills in networking and cybersecurity.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#contact" onClick={(e)=>{e.preventDefault();document.getElementById('contact')?.scrollIntoView({behavior:'smooth'});}}
                className="inline-flex items-center gap-2 bg-orange text-ink font-display font-700 px-5 py-3 rounded-full hover:bg-cream transition">
                Let's talk <Icon name="arrow" className="w-4 h-4" />
              </a>
              <a href="#" onClick={(e)=>e.preventDefault()}
                className="inline-flex items-center gap-2 border border-cream/30 font-display font-700 px-5 py-3 rounded-full hover:border-orange hover:text-orange transition">
                <Icon name="download" className="w-4 h-4" /> Download resume
              </a>
            </div>
            <div className="mt-8 flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" title={s.label}
                  className="w-9 h-9 rounded-full border border-cream/20 flex items-center justify-center hover:bg-orange hover:text-ink hover:border-orange transition-transform hover:-translate-y-0.5">
                  <Icon name={s.icon} className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          <div className="relative mx-auto tilt-wrap">
            <div ref={photoRef} className="tilt-el w-56 sm:w-72 aspect-square rounded-[2rem] overflow-hidden border-4 border-orange shadow-2xl">
              <img src={IMG.profile} alt="Mohsin Ali Mughal" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-5 -left-5 bg-orange text-ink rounded-2xl px-4 py-3 shadow-xl -rotate-3">
              <div className="font-display font-900 text-2xl leading-none">7mo</div>
              <div className="font-body text-[11px] leading-tight">CSR → Team Lead</div>
            </div>
            <div className="absolute -top-4 -right-2 bg-cream text-ink rounded-full px-3 py-1.5 shadow-xl text-xs font-mono border border-ink/10 rotate-3">
              MERN · Automation
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

