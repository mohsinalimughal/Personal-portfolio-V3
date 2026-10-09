import { Icon, Reveal } from "./ui";

function Heartbeat() {
  return (
    <svg viewBox="0 0 300 40" className="w-40 sm:w-56 h-8 mx-auto mb-4 overflow-visible">
      <polyline
        points="0,20 60,20 75,6 90,34 105,20 300,20"
        fill="none" stroke="#FF5A1F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        pathLength="100" strokeDasharray="100" strokeDashoffset="100"
      >
        <animate attributeName="stroke-dashoffset" from="100" to="0" dur="1.6s" begin="0s" fill="freeze" />
      </polyline>
    </svg>
  );
}

export function Contact() {
  return (
    <section id="contact" className="max-w-6xl mx-auto px-3 sm:px-6 mt-6">
      <Reveal className="bg-teal text-cream rounded-3xl p-6 sm:p-10 lg:p-14 text-center" threshold={0.15}>
        <Heartbeat />
        <div className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1 rounded-full border border-cream/25 text-cream/70 mb-4">
          <span className="text-orange">✉</span> Get in touch
        </div>
        <h2 className="font-display font-900 text-3xl sm:text-4xl lg:text-5xl tracking-tight max-w-2xl mx-auto">
          Let's build something useful together.
        </h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 max-w-full px-2">
          <a href="mailto:mohsinalimughaofficial786@gmail.com"
            className="inline-flex items-center gap-2 bg-orange text-ink font-display font-700 px-4 sm:px-5 py-3 rounded-full hover:bg-cream transition max-w-full">
            <Icon name="mail" className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline break-all">mohsinalimughaofficial786@gmail.com</span>
            <span className="sm:hidden">Email me</span>
          </a>
          <a href="https://linkedin.com/in/mohsin-ali-mughal" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-cream/30 font-display font-700 px-5 py-3 rounded-full hover:border-orange hover:text-orange transition">
            <Icon name="linkedin" className="w-4 h-4" /> LinkedIn
          </a>
          <a href="https://mohsinalimughal.tech" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-cream/30 font-display font-700 px-5 py-3 rounded-full hover:border-orange hover:text-orange transition">
            <Icon name="globe" className="w-4 h-4" /> mohsinalimughal.tech
          </a>
        </div>
      </Reveal>
    </section>
  );
}

