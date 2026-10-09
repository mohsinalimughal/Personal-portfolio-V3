import { Icon, SectionHeading } from "./ui";
import { useInView, useTilt } from "../hooks";
import { IMG } from "../data/images";
import { PROJECTS } from "../data/projects";

function ProjectCard({ p, i }) {
  const [ref, inView] = useInView(0.25);
  const tiltRef = useTilt(7, 14);
  return (
    <div ref={ref} className={`reveal-3d tilt-wrap ${inView ? "in" : ""}`} style={{ transitionDelay: `${i * 70}ms` }}>
      <a href={p.url} target="_blank" rel="noreferrer"
        ref={tiltRef}
        className="tilt-el group block bg-white dark:bg-inkdim border border-ink/10 dark:border-cream/10 rounded-2xl overflow-hidden flex flex-col hover:border-orange hover:shadow-xl h-full">
        {p.img && (
          <div className="aspect-video overflow-hidden bg-ink/5 dark:bg-cream/5 border-b border-ink/10 dark:border-cream/10">
            <img src={IMG[p.img]} alt={p.title} className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-300" />
          </div>
        )}
        <div className="p-5 flex flex-col flex-1">
          <div className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-orange/15 text-orangedim dark:text-orange w-fit mb-3">{p.tag}</div>
          <h3 className="font-display font-700 text-lg text-ink dark:text-cream">{p.title}</h3>
          <p className="mt-2 font-body text-sm text-ink/60 dark:text-cream/60 leading-relaxed flex-1">{p.desc}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {p.stack.map((s) => <span key={s} className="text-[11px] font-mono text-ink/40 dark:text-cream/40">{s}</span>)}
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-sm font-display font-700 text-ink/40 dark:text-cream/40 group-hover:text-orange transition">
            <Icon name="github" className="w-3.5 h-3.5" /> View on GitHub <Icon name="arrow" className="w-3.5 h-3.5" />
          </div>
        </div>
      </a>
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="max-w-6xl mx-auto px-3 sm:px-6 mt-6">
      <SectionHeading icon="▤" kicker="Projects" title="Selected work" blurb="Real repositories — click through to the code on GitHub." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PROJECTS.map((p, i) => <ProjectCard key={p.title} p={p} i={i} />)}
      </div>
    </section>
  );
}

