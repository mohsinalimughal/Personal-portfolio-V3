import { Icon, OrgBadge, SectionHeading, SectionIconBadge } from "./ui";
import { useInView, useTilt } from "../hooks";
import { EXPERIENCE_GROUPS, EDUCATION } from "../data/timeline";

function TimelineRow({ t, i }) {
  const [ref, inView] = useInView(0.3);
  const badgeRef = useTilt(14, 10);
  return (
    <div ref={ref} className={`relative reveal-3d ${inView ? "in" : ""}`} style={{ transitionDelay: `${i * 60}ms` }}>
      <div className="absolute -left-8 sm:-left-9 top-1 w-4 h-4 rounded-full bg-orange border-4 border-cream dark:border-ink" />
      <div className="bg-white dark:bg-inkdim border border-ink/10 dark:border-cream/10 rounded-2xl p-4 flex items-center gap-3">
        <div className="tilt-wrap">
          <div ref={badgeRef} className="tilt-el">
            <OrgBadge initials={t.initials} logo={t.logo} tone={t.tag === "Current" ? "orange" : "ink"} size="w-12 h-12" />
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <h3 className="font-display font-700 text-sm sm:text-base text-ink dark:text-cream leading-snug">{t.role}</h3>
            {t.tag && <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-orange/15 text-orangedim dark:text-orange shrink-0">{t.tag}</span>}
          </div>
          <div className="font-body text-xs sm:text-sm text-ink/60 dark:text-cream/60">{t.org}</div>
          <div className="xl:hidden font-mono text-[10px] text-ink/40 dark:text-cream/40 mt-0.5">{t.period}</div>
        </div>
        <div className="hidden xl:block font-mono text-xs text-ink/40 dark:text-cream/40 shrink-0 text-right">{t.period}</div>
      </div>
    </div>
  );
}

function TimelineColumn({ items, icon, title, subtitle, tone = "orange" }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <SectionIconBadge icon={icon} tone={tone} />
        <div>
          <h3 className="font-display font-800 text-lg text-ink dark:text-cream leading-tight">{title}</h3>
          <p className="font-body text-xs text-ink/45 dark:text-cream/45">{subtitle}</p>
        </div>
      </div>
      <div className="relative pl-8 sm:pl-9">
        <div className="absolute left-[13px] sm:left-[15px] top-2 bottom-2 w-0.5 bg-ink/15 dark:bg-cream/15" />
        <div className="space-y-4">
          {items.map((t, i) => <TimelineRow key={t.org + t.role + i} t={t} i={i} />)}
        </div>
      </div>
    </div>
  );
}

function ExperienceGroup({ g, i }) {
  const [ref, inView] = useInView(0.2);
  const badgeRef = useTilt(12, 12);
  return (
    <div ref={ref} className={`reveal-3d ${inView ? "in" : ""}`} style={{ transitionDelay: `${i * 70}ms` }}>
      <div className="bg-white dark:bg-inkdim border border-ink/10 dark:border-cream/10 rounded-2xl p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="tilt-wrap shrink-0">
            <div ref={badgeRef} className="tilt-el">
              <OrgBadge initials={g.initials} logo={g.logo} tone={g.current ? "orange" : "ink"} size="w-14 h-14" />
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-display font-800 text-base sm:text-lg text-ink dark:text-cream">{g.company}</h3>
              {g.current && <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-orange/15 text-orangedim dark:text-orange">Current</span>}
            </div>
            <div className="font-mono text-[11px] sm:text-xs text-ink/40 dark:text-cream/40 mb-4">
              {g.span} · {g.roles.length} {g.roles.length > 1 ? "positions" : "position"}
            </div>

            <div className="relative pl-4">
              {g.roles.length > 1 && <div className="absolute left-[3px] top-1.5 bottom-1.5 w-px bg-ink/15 dark:bg-cream/15" />}
              <div className="space-y-3.5">
                {g.roles.map((r, ri) => (
                  <div key={ri} className="relative pl-4">
                    {g.roles.length > 1 && (
                      <div className={`absolute -left-1 top-1.5 w-2 h-2 rounded-full ${ri === 0 ? "bg-orange" : "bg-ink/25 dark:bg-cream/30"}`} />
                    )}
                    <div className="flex flex-wrap items-center gap-1.5">
                      <div className="font-display font-700 text-sm text-ink dark:text-cream leading-snug">{r.role}</div>
                      {r.promoted && (
                        <span className="inline-flex items-center gap-1 text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-teal/10 text-teal dark:text-cream/70 dark:bg-cream/10">
                          ↑ Promotion
                        </span>
                      )}
                    </div>
                    <div className="font-mono text-[11px] text-ink/40 dark:text-cream/40">{r.period}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Timeline() {
  return (
    <section id="timeline" className="max-w-6xl mx-auto px-3 sm:px-6 mt-6">
      <SectionHeading icon="↝" kicker="Career timeline" title="From the front desk to the front end." blurb="Experience first, education below." />
      <div className="space-y-10">
        <div>
          <div className="flex items-center gap-3 mb-5">
            <SectionIconBadge icon="briefcase" tone="orange" />
            <div>
              <h3 className="font-display font-800 text-lg text-ink dark:text-cream leading-tight">Work Experience</h3>
              <p className="font-body text-xs text-ink/45 dark:text-cream/45">{EXPERIENCE_GROUPS.length} companies · Feb 2021 – Present</p>
            </div>
          </div>
          <div className="space-y-4">
            {EXPERIENCE_GROUPS.map((g, i) => <ExperienceGroup key={g.company} g={g} i={i} />)}
          </div>
        </div>

        <TimelineColumn items={EDUCATION} icon="cap" title="Education" subtitle={`${EDUCATION.length} entries · 2018 – Present`} tone="teal" />
      </div>
    </section>
  );
}

