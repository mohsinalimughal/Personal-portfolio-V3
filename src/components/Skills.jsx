import { SectionHeading } from "./ui";
import { SKILLS_TECHNICAL, SKILLS_DOMAIN } from "../data/skills";

export function Skills() {
  return (
    <section id="skills" className="max-w-6xl mx-auto px-3 sm:px-6 mt-6">
      <SectionHeading icon="◧" kicker="Skills" title="Two skill sets, one workflow." />
      <div className="grid md:grid-cols-2 gap-4">
        <div className="relative bg-white dark:bg-inkdim border-2 border-ink dark:border-cream/20 rounded-2xl p-6 sm:p-7 overflow-hidden">
          <div className="flex items-center gap-1.5 mb-1">
            <h3 className="font-display font-800 text-xl text-ink dark:text-cream">Technical</h3>
            <span className="font-mono text-orange blink-cursor">_</span>
          </div>
          <p className="font-body text-sm text-ink/50 dark:text-cream/50 mb-5">What I build with.</p>
          <div className="flex flex-wrap gap-2">
            {SKILLS_TECHNICAL.map((s) => (
              <span key={s}
                className="px-3 py-1.5 rounded-full bg-ink/5 dark:bg-cream/10 text-ink dark:text-cream text-sm font-mono border border-transparent hover:border-orange hover:bg-orange/10 hover:text-orangedim dark:hover:text-orange hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 cursor-default">
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="relative bg-teal text-cream rounded-2xl p-6 sm:p-7 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.14] pointer-events-none">
            <svg viewBox="0 0 400 200" className="w-full h-full" preserveAspectRatio="none">
              <polyline points="0,100 120,100 140,55 158,150 178,100 400,100" fill="none" stroke="#F4EFE3" strokeWidth="2.5" />
            </svg>
          </div>
          <div className="relative flex items-center gap-2 mb-1">
            <h3 className="font-display font-800 text-xl">Domain</h3>
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange" />
            </span>
          </div>
          <p className="relative font-body text-sm text-cream/60 mb-5">What I build for.</p>
          <div className="relative flex flex-wrap gap-2">
            {SKILLS_DOMAIN.map((s) => (
              <span key={s}
                className="px-3 py-1.5 rounded-full bg-cream/10 text-cream text-sm font-body border border-cream/10 hover:border-orange hover:bg-cream/20 hover:-translate-y-0.5 transition-all duration-200 cursor-default">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

