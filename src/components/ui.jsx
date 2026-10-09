import { useState, useEffect, useRef } from "react";
import { IMG } from "../data/images";
import { useInView } from "../hooks";

export const Icon = ({ name, className }) => {
  const p = { className: className || "w-5 h-5", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", viewBox: "0 0 24 24" };
  switch (name) {
    case "linkedin": return <svg {...p}><path d="M6.94 8.5v10M6.94 5.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zM11 8.5v10M11 12.5c0-2 1.5-3.3 3.3-3.3 2 0 2.7 1.4 2.7 3.5v5.8" /></svg>;
    case "github": return <svg {...p}><path d="M12 2a10 10 0 0 0-3.16 19.5c.5.1.68-.22.68-.48v-1.7c-2.78.6-3.37-1.2-3.37-1.2-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.35 4.68-4.58 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.59.69.48A10 10 0 0 0 12 2z" /></svg>;
    case "medium": return <svg {...p}><circle cx="6.5" cy="12" r="3.2" /><ellipse cx="14" cy="12" rx="2" ry="3.2" /><ellipse cx="19.5" cy="12" rx="1" ry="3.2" /></svg>;
    case "mail": return <svg {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>;
    case "globe": return <svg {...p}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.7-3.8-9s1.3-6.4 3.8-9z" /></svg>;
    case "sun": return <svg {...p}><circle cx="12" cy="12" r="4.2" /><path d="M12 2.5v2M12 19.5v2M4.5 4.5l1.4 1.4M18.1 18.1l1.4 1.4M2.5 12h2M19.5 12h2M4.5 19.5l1.4-1.4M18.1 5.9l1.4-1.4" /></svg>;
    case "moon": return <svg {...p}><path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z" /></svg>;
    case "search": return <svg {...p}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>;
    case "arrow": return <svg {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
    case "close": return <svg {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>;
    case "check": return <svg {...p}><path d="M20 6 9 17l-5-5" /></svg>;
    case "eye": return <svg {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></svg>;
    case "briefcase": return <svg {...p}><rect x="3" y="7.5" width="18" height="12" rx="2" /><path d="M8 7.5V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1.5M3 12.5h18" /></svg>;
    case "cap": return <svg {...p} strokeLinejoin="round"><path d="M12 4 2 9l10 5 10-5-10-5z" /><path d="M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5M22 9v6" /></svg>;
    case "download": return <svg {...p}><path d="M12 3v12m0 0 4.5-4.5M12 15l-4.5-4.5M4 19.5h16" /></svg>;
    case "pin": return <svg {...p}><path d="M12 21s-6.5-5.7-6.5-11A6.5 6.5 0 0 1 12 3.5 6.5 6.5 0 0 1 18.5 10c0 5.3-6.5 11-6.5 11z" /><circle cx="12" cy="10" r="2.2" /></svg>;
    case "star": return <svg {...p} fill="currentColor" stroke="none"><path d="M12 2l2.9 6.6 7.1.7-5.4 4.7 1.6 7-6.2-3.7L5.8 21l1.6-7-5.4-4.7 7.1-.7z"/></svg>;
    default: return null;
  }
};

export const OrgBadge = ({ initials, size = "w-9 h-9", tone = "orange", logo }) => {
  const tones = {
    orange: "bg-orange text-cream",
    teal: "bg-teal text-cream",
    ink: "bg-ink text-cream dark:bg-cream dark:text-ink",
  };
  if (logo && IMG[logo]) {
    return (
      <div className={`${size} shrink-0 rounded-xl bg-white border border-ink/10 flex items-center justify-center overflow-hidden p-1.5`}>
        <img src={IMG[logo]} alt="" className="w-full h-full object-contain" />
      </div>
    );
  }
  return (
    <div className={`${size} shrink-0 rounded-lg ${tones[tone]} flex items-center justify-center font-display font-800 text-xs tracking-wide`}>
      {initials}
    </div>
  );
};

export function Reveal({ children, className = "", threshold = 0.2 }) {
  const [ref, inView] = useInView(threshold);
  return <div ref={ref} className={`reveal-3d ${inView ? "in" : ""} ${className}`}>{children}</div>;
}

export function SectionHeading({ icon, kicker, title, blurb, dark }) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mb-8 pb-4 border-b-2 ${dark ? "border-cream/15" : "border-ink/10"}`}>
      <div className="flex items-center gap-3 shrink-0">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${dark ? "bg-cream text-ink" : "bg-orange text-ink"}`}>
          <span className="text-base leading-none">{icon}</span>
        </div>
        <h2 className={`font-display font-900 text-xl sm:text-2xl uppercase tracking-tight whitespace-nowrap ${dark ? "text-cream" : "text-ink"}`}>
          {kicker}
        </h2>
      </div>
      <div className={`hidden sm:block flex-1 border-t ${dark ? "border-cream/10" : "border-ink/10"}`} />
      <div className="sm:text-right">
        {title && <p className={`font-body text-sm sm:text-base leading-snug ${dark ? "text-cream/80" : "text-ink/75"}`}>{title}</p>}
        {blurb && <p className={`font-body text-xs sm:text-sm mt-0.5 ${dark ? "text-cream/45" : "text-ink/45"}`}>{blurb}</p>}
      </div>
    </div>
  );
}

export function SectionIconBadge({ icon, tone = "orange" }) {
  const styles = {
    orange: "bg-gradient-to-br from-orange to-orangedim shadow-[0_8px_18px_-6px_rgba(255,90,31,0.6)]",
    teal: "bg-gradient-to-br from-teal to-tealdim shadow-[0_8px_18px_-6px_rgba(15,61,62,0.55)]",
  };
  return (
    <div className={`w-11 h-11 rounded-2xl ${styles[tone]} text-cream flex items-center justify-center shrink-0 ring-1 ring-white/15`}>
      <Icon name={icon} className="w-5 h-5" />
    </div>
  );
}

