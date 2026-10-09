import { useState } from "react";
import { Icon, OrgBadge, SectionHeading } from "./ui";
import { useInView, useTilt } from "../hooks";
import { IMG } from "../data/images";
import { CERT_ORG, CERT_CATEGORIES, CERTIFICATES, CERT_UNPICTURED } from "../data/certificates";

function Lightbox({ cert, onClose }) {
  if (!cert) return null;
  return (
    <div className="fixed inset-0 z-[100] bg-ink/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8" onClick={onClose}>
      <button onClick={onClose} className="absolute top-5 right-5 w-10 h-10 rounded-full bg-cream/10 hover:bg-orange hover:text-ink text-cream flex items-center justify-center">
        <Icon name="close" className="w-5 h-5" />
      </button>
      <div className="max-w-3xl w-full bg-cream rounded-2xl overflow-hidden max-h-[85vh] flex flex-col lightbox-in" onClick={(e) => e.stopPropagation()}>
        <div className="overflow-auto bg-ink/5 flex items-center justify-center p-3">
          <img src={IMG[cert.img]} alt={cert.title} className="max-h-[60vh] w-auto object-contain rounded-lg" />
        </div>
        <div className="p-4 sm:p-5 flex items-center gap-3 border-t border-ink/10">
          <OrgBadge initials={CERT_ORG[cert.logo]?.initials || "?"} logo={CERT_ORG[cert.logo]?.img} />
          <div className="min-w-0 flex-1">
            <div className="font-display font-700 text-ink">{cert.title}</div>
            <div className="font-body text-sm text-ink/60">{cert.org} · {cert.date}</div>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-teal shrink-0">
            <Icon name="check" className="w-3.5 h-3.5" /> {cert.cat}
          </span>
        </div>
      </div>
    </div>
  );
}

function CertTile({ c, i, onOpen }) {
  const [ref, inView] = useInView(0.15);
  const tiltRef = useTilt(6, 10);
  return (
    <div ref={ref} className={`reveal-3d tilt-wrap ${inView ? "in" : ""}`} style={{ transitionDelay: `${(i % 9) * 40}ms` }}>
      <button onClick={() => onOpen(c)}
        ref={tiltRef}
        className="tilt-el group flex items-center gap-3 w-full text-left bg-white dark:bg-inkdim rounded-xl border border-ink/10 dark:border-cream/10 p-3.5 shadow-sm hover:shadow-lg hover:border-orange/50 transition-shadow duration-300">
        <OrgBadge initials={CERT_ORG[c.logo]?.initials || "?"} logo={CERT_ORG[c.logo]?.img} size="w-12 h-12" />
        <div className="min-w-0 flex-1">
          <h3 className="font-display font-700 text-sm text-ink dark:text-cream leading-snug truncate group-hover:text-orangedim dark:group-hover:text-orange transition-colors">
            {c.title}
          </h3>
          <p className="font-body text-xs text-ink/55 dark:text-cream/55 mt-0.5 truncate">{c.org}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-mono text-[10px] text-ink/40 dark:text-cream/40">{c.date}</span>
            <span className="text-ink/20 dark:text-cream/20">·</span>
            <span className="text-[10px] font-mono uppercase tracking-wide text-ink/40 dark:text-cream/40 truncate">{c.cat}</span>
          </div>
        </div>
        <div className="shrink-0 w-8 h-8 rounded-full border border-ink/10 dark:border-cream/15 flex items-center justify-center text-ink/30 dark:text-cream/30 group-hover:border-orange group-hover:text-orange group-hover:bg-orange/10 transition-colors">
          <Icon name="eye" className="w-4 h-4" />
        </div>
      </button>
    </div>
  );
}

export function Certificates() {
  const [active, setActive] = useState(null);
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? CERTIFICATES : CERTIFICATES.filter((c) => c.cat === filter);
  return (
    <section id="certificates" className="max-w-6xl mx-auto px-3 sm:px-6 mt-6">
      <SectionHeading icon="▦" kicker="Certificate wall" title={`${CERTIFICATES.length} certifications, verified on file.`} blurb="Tap any card to view the full certificate." />
      <div className="flex flex-wrap gap-2 mb-6">
        {CERT_CATEGORIES.map((cat) => (
          <button key={cat} onClick={() => setFilter(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-display font-700 border-2 transition ${filter === cat ? "bg-ink text-cream border-ink dark:bg-cream dark:text-ink dark:border-cream" : "border-ink/15 text-ink/60 dark:border-cream/20 dark:text-cream/60 hover:border-orange hover:text-orange"}`}>
            {cat}
            {cat !== "All" && <span className="ml-1.5 opacity-50">· {CERTIFICATES.filter((c) => c.cat === cat).length}</span>}
          </button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((c, i) => <CertTile key={c.title + c.date} c={c} i={i} onOpen={setActive} />)}
      </div>
      {CERT_UNPICTURED.length > 0 && (
        <div className="mt-6 bg-white dark:bg-inkdim border border-dashed border-ink/20 dark:border-cream/20 rounded-2xl p-5">
          <div className="font-display font-700 text-sm text-ink dark:text-cream mb-2">Also earned (no scan on file yet):</div>
          <ul className="space-y-1">
            {CERT_UNPICTURED.map((t) => (
              <li key={t} className="font-body text-sm text-ink/60 dark:text-cream/60 flex gap-2"><span className="text-orange">·</span>{t}</li>
            ))}
          </ul>
        </div>
      )}
      <Lightbox cert={active} onClose={() => setActive(null)} />
    </section>
  );
}

