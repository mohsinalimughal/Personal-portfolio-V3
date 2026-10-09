import { useState, useEffect } from "react";
import { useInView } from "../hooks";

export function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      setPct(max > 0 ? Math.min(100, (scrolled / max) * 100) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-ink/5 dark:bg-cream/5" style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}>
      <div className="relative h-[3px] bg-gradient-to-r from-orange to-teal transition-[width] duration-150 ease-out" style={{ width: `${pct}%` }}>
        <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-orange shadow-[0_0_8px_2px_rgba(255,90,31,0.7)]" />
      </div>
    </div>
  );
}

export function VitalDivider() {
  const [ref, inView] = useInView(0.5);
  return (
    <div ref={ref} className="max-w-6xl mx-auto px-3 sm:px-6 my-2" aria-hidden="true">
      <svg viewBox="0 0 1200 40" className="w-full h-6 sm:h-8 opacity-70" preserveAspectRatio="none">
        <polyline
          points="0,20 380,20 410,20 430,4 452,36 474,20 500,20 1200,20"
          fill="none" stroke="currentColor" className="text-orange"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          pathLength="100" strokeDasharray="100"
          style={{ strokeDashoffset: inView ? 0 : 100, transition: "stroke-dashoffset 1.4s cubic-bezier(.2,.7,.2,1)" }}
        />
      </svg>
    </div>
  );
}

