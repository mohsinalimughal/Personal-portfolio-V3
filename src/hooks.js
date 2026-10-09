import { useState, useEffect, useRef } from "react";

export function useCountUp(target, active) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf, start;
    const dur = 1400;
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target]);
  return val;
}

export function useInView(threshold = 0.4) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

export function useTilt(max = 8, popDepth = 18) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e) => {
      if (e.pointerType === "touch") return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rx = (0.5 - py) * 2 * max;
      const ry = (px - 0.5) * 2 * max;
      el.dataset.tilting = "true";
      el.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(${popDepth}px)`;
    };
    const leave = () => {
      el.dataset.tilting = "false";
      el.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [max, popDepth]);
  return ref;
}

export function useTheme() {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    let saved = "light";
    try {
      saved = localStorage.getItem("mam-theme") || "light";
    } catch (e) {}
    setTheme(saved);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem("mam-theme", theme);
    } catch (e) {}
  }, [theme]);
  return [theme, setTheme];
}
