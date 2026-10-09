import { Icon } from "./ui";
import { SOCIALS } from "../data/social";

export function Footer() {
  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  return (
    <footer className="max-w-6xl mx-auto px-3 sm:px-6 mt-6 mb-6">
      <div className="bg-cream dark:bg-inkdim border-2 border-ink dark:border-cream/20 text-ink dark:text-cream rounded-3xl p-6 sm:p-10 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-8 pb-6 mb-6 border-b border-ink/10 dark:border-cream/10">
          <div>
            <div className="font-display font-900 text-2xl">Mohsin Ali Mughal</div>
            <p className="font-body text-ink/55 dark:text-cream/55 text-sm mt-2 max-w-xs">Full-Stack MERN Developer · Computer Science Student, Karachi, Pakistan.</p>
            <a href="#" onClick={(e) => e.preventDefault()} className="mt-4 inline-flex items-center gap-2 text-sm font-display font-700 text-orangedim dark:text-orange hover:underline">
              <Icon name="download" className="w-4 h-4" /> Download one-pager (PDF)
            </a>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-body text-ink/65 dark:text-cream/65 hover:text-orangedim dark:hover:text-orange transition">
                <Icon name={s.icon} className="w-4 h-4" /> {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-4 py-4 border-y border-ink/10 dark:border-cream/10 font-mono text-[10px] sm:text-[11px] text-ink/40 dark:text-cream/40 text-center sm:text-left">
          <span>Designed by: Claude</span>
          <span>Copyright © {today.getFullYear()} Mohsin Ali Mughal, All rights reserved</span>
          <span>Powered by: React &amp; Vite</span>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-ink/35 dark:text-cream/35">
          <span>© {today.getFullYear()} Mohsin Ali Mughal. Built with React &amp; Tailwind.</span>
          <span className="px-3 py-1 rounded-full bg-ink/5 dark:bg-cream/10 text-ink/50 dark:text-cream/50">Last updated {dateStr}</span>
        </div>

        <div className="mt-2 -mx-6 sm:-mx-10 -mb-6 sm:-mb-10 overflow-hidden select-none pointer-events-none">
          <div
            className="ghost-text font-display font-900 text-center whitespace-nowrap leading-[0.78] text-orange"
            style={{
              fontSize: "16vw",
              WebkitMaskImage: "linear-gradient(to bottom, transparent, black 85%)",
              maskImage: "linear-gradient(to bottom, transparent, black 85%)",
            }}
          >
            MOHSIN
          </div>
        </div>
      </div>
    </footer>
  );
}

