import { Icon, SectionHeading } from "./ui";
import { useInView, useCountUp, useTilt } from "../hooks";
import { STATS } from "../data/stats";

function GaugeMini({ value, max = 20 }) {
  const pct = Math.min(1, value / max);
  const needleAngle = 180 - pct * 180;
  const rad = (Math.PI / 180) * needleAngle;
  const nx = 50 + 32 * Math.cos(rad);
  const ny = 50 - 32 * Math.sin(rad);
  return (
    <svg viewBox="0 0 100 56" className="w-full h-16 mt-3 overflow-visible">
      <path d="M6 50 A44 44 0 0 1 94 50" fill="none" strokeWidth="6" strokeLinecap="round" className="stroke-ink/10 dark:stroke-cream/15" />
      <path d="M6 50 A44 44 0 0 1 94 50" fill="none" stroke="#FF5A1F" strokeWidth="6" strokeLinecap="round" strokeDasharray={`${pct * 138} 138`} />
      <line x1="50" y1="50" x2={nx} y2={ny} strokeWidth="2.5" strokeLinecap="round" className="stroke-ink dark:stroke-cream" />
      <circle cx="50" cy="50" r="3" className="fill-ink dark:fill-cream" />
    </svg>
  );
}

function StatCard({ stat, i }) {
  const [ref, inView] = useInView(0.5);
  const val = useCountUp(stat.value, inView);
  const tiltRef = useTilt(7, 12);

  return (
    <div ref={ref} className={`reveal-3d tilt-wrap ${inView ? "in" : ""}`} style={{ transitionDelay: `${i * 70}ms` }}>
      <div ref={tiltRef} className={`tilt-el rounded-2xl p-6 h-full flex flex-col ${stat.variant === "dark" ? "bg-ink text-cream" : "bg-cream border-2 border-ink dark:bg-inkdim dark:border-cream/30"}`}>
        <div className={`font-display font-900 text-4xl sm:text-5xl ${stat.variant === "dark" ? "text-cream" : "text-ink dark:text-cream"}`}>
          {val}{stat.suffix}
        </div>
        <div className={`mt-2 font-body text-sm ${stat.variant === "dark" ? "text-cream/60" : "text-ink/60 dark:text-cream/60"}`}>{stat.label}</div>

        {stat.variant === "pills" && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {stat.pills.map((p, pi) => (
              <span key={p} className={`text-[10px] font-mono px-2 py-1 rounded-full border border-ink/15 dark:border-cream/20 text-ink/55 dark:text-cream/55 ${pi % 2 ? "rotate-1" : "-rotate-1"}`}>
                {p}
              </span>
            ))}
          </div>
        )}

        {stat.variant === "gauge" && <GaugeMini value={stat.value} max={20} />}

        {stat.variant === "dark" && (
          <div className="mt-auto pt-4">
            <div className="bg-cream/5 rounded-xl p-3 border border-cream/10">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-5 h-5 rounded-full bg-orange flex items-center justify-center text-[9px] font-display font-800 text-ink shrink-0">M</span>
                <span className="font-mono text-[10px] text-cream/45">Automation log</span>
              </div>
              <p className="font-body text-xs text-cream/85 leading-snug">Repetitive task automated — 42s ⚡</p>
              <div className="font-mono text-[9px] text-cream/30 mt-1.5 flex items-center gap-1">
                <Icon name="check" className="w-2.5 h-2.5" /> synced just now
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function StatsBar() {
  return (
    <section className="max-w-6xl mx-auto px-3 sm:px-6 mt-10 sm:mt-12">
      <SectionHeading icon="#" kicker="Stats" title="A quick look at the measurable impact behind Mohsin's work." blurb="Numbers from both the ops side and the code side." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
        {STATS.map((s, i) => <StatCard key={s.label} stat={s} i={i} />)}
      </div>
    </section>
  );
}

