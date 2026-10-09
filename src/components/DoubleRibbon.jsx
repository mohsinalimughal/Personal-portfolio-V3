import { RIBBON_ITEMS } from "../data/social";

function RibbonTrack({ tone = "dark", duration = 46, reverse = false }) {
  const textColor = tone === "dark" ? "text-cream/90" : "text-ink";
  const dotColor = tone === "dark" ? "text-orange" : "text-ink/70";
  const Row = () => (
    <div className="flex items-center gap-6 sm:gap-9 pr-6 sm:pr-9 shrink-0">
      {RIBBON_ITEMS.map((it, i) => (
        <span key={i} className="flex items-center gap-6 sm:gap-9 shrink-0">
          <span className={`font-display font-800 text-xs sm:text-sm tracking-wide uppercase whitespace-nowrap ${textColor}`}>{it}</span>
          <span className={`text-[8px] sm:text-[10px] shrink-0 ${dotColor}`}>⬡</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="flex w-max" style={{ animation: `marquee ${duration}s linear infinite`, animationDirection: reverse ? "reverse" : "normal" }}>
      <Row />
      <Row />
    </div>
  );
}

export function DoubleRibbon() {
  return (
    <div className="relative w-full h-14 sm:h-16 -my-3 sm:-my-4 z-30" style={{ overflow: "visible" }} aria-hidden="false">
      {/* back band — black, tilted the opposite way */}
      <div className="absolute left-1/2 top-1/2 w-[160%] sm:w-[145%] -translate-x-1/2 -translate-y-1/2 rotate-[1.5deg] bg-ink py-1.5 sm:py-2 overflow-hidden">
        <RibbonTrack tone="dark" duration={48} reverse />
      </div>
      {/* front band — orange, tilted slightly, scrolling left */}
      <div className="absolute left-1/2 top-1/2 w-[160%] sm:w-[145%] -translate-x-1/2 -translate-y-1/2 -rotate-[1.5deg] bg-orange py-2 sm:py-2.5 overflow-hidden">
        <RibbonTrack tone="light" duration={40} />
      </div>
    </div>
  );
}

