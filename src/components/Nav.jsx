import { useState, useEffect, useRef } from "react";
import { Icon } from "./ui";
import { NAV_LINKS } from "../data/nav";

export function CommandPalette({ open, setOpen }) {
  const [q, setQ] = useState("");
  const inputRef = useRef(null);
  useEffect(() => { if (open && inputRef.current) inputRef.current.focus(); }, [open]);
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen((o) => !o); }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setOpen]);
  if (!open) return null;
  const results = NAV_LINKS.filter((l) => l.label.toLowerCase().includes(q.toLowerCase()));
  const go = (id) => {
    setOpen(false); setQ("");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="fixed inset-0 z-[100] bg-ink/70 backdrop-blur-sm flex items-start justify-center pt-24 px-4" onClick={() => setOpen(false)}>
      <div className="w-full max-w-lg bg-cream dark:bg-inkdim rounded-2xl shadow-2xl border-2 border-ink dark:border-cream overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 px-4 py-3 border-b-2 border-ink/10 dark:border-cream/10">
          <Icon name="search" className="w-5 h-5 text-ink/50 dark:text-cream/50" />
          <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Jump to a section…"
            className="flex-1 bg-transparent outline-none font-body text-ink dark:text-cream placeholder:text-ink/40 dark:placeholder:text-cream/40" />
          <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-ink/20 dark:border-cream/20 text-ink/50 dark:text-cream/50">ESC</kbd>
        </div>
        <div className="max-h-72 overflow-y-auto py-2">
          {results.length === 0 && <div className="px-4 py-3 text-sm text-ink/50 dark:text-cream/50">No matches.</div>}
          {results.map((r) => (
            <button key={r.id} onClick={() => go(r.id)}
              className="w-full text-left px-4 py-2.5 hover:bg-orange/10 dark:hover:bg-orange/20 flex items-center justify-between group">
              <span className="font-body text-sm text-ink dark:text-cream">{r.label}</span>
              <Icon name="arrow" className="w-4 h-4 text-ink/30 dark:text-cream/30 group-hover:text-orange group-hover:translate-x-0.5 transition" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Nav({ theme, setTheme, setPaletteOpen }) {
  const [open, setOpen] = useState(false);
  const goTo = (id) => { setOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };
  return (
    <header className="sticky z-50 mx-3 sm:mx-6 mt-3" style={{ top: "calc(env(safe-area-inset-top, 0px) + 0.75rem)" }}>
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3 bg-ink dark:bg-cream text-cream dark:text-ink rounded-2xl pl-4 pr-2 sm:pl-5 sm:pr-3 py-2.5 shadow-lg">
        <button onClick={() => goTo("hero")} className="font-display font-900 text-sm sm:text-lg tracking-tight shrink-0 uppercase leading-none">
          Mohsin Ali<span className="text-orange">.</span>
        </button>
        <nav className="hidden lg:flex items-center gap-1 font-body text-sm">
          {NAV_LINKS.map((l) => (
            <button key={l.id} onClick={() => goTo(l.id)} className="px-3 py-1.5 rounded-full hover:bg-orange hover:text-ink transition-colors">
              {l.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2 shrink-0">
          <button onClick={() => setPaletteOpen(true)} title="Search (⌘K)"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-cream/25 dark:border-ink/25 text-xs font-mono hover:border-orange hover:text-orange transition">
            <Icon name="search" className="w-3.5 h-3.5" /> ⌘K
          </button>
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} title="Toggle theme"
            className="w-8 h-8 flex items-center justify-center rounded-full border border-cream/25 dark:border-ink/25 hover:border-orange hover:text-orange transition">
            <Icon name={theme === "dark" ? "sun" : "moon"} className="w-4 h-4" />
          </button>
          <a href="#" onClick={(e) => e.preventDefault()}
            className="hidden md:flex items-center gap-1.5 bg-orange text-ink font-display font-700 text-sm px-4 py-2 rounded-full hover:bg-orangedim transition">
            <Icon name="download" className="w-4 h-4" /> Resume
          </a>
          <button className="lg:hidden w-8 h-8 flex items-center justify-center" onClick={() => setOpen(!open)} aria-label="Menu">
            <div className="w-5 flex flex-col gap-1">
              <span className="h-0.5 bg-current rounded" /><span className="h-0.5 bg-current rounded" /><span className="h-0.5 bg-current rounded w-3" />
            </div>
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden max-w-6xl mx-auto mt-2 bg-ink dark:bg-cream text-cream dark:text-ink rounded-2xl p-3 shadow-lg grid grid-cols-2 gap-1 font-body text-sm">
          {NAV_LINKS.map((l) => (
            <button key={l.id} onClick={() => goTo(l.id)} className="px-3 py-2 rounded-xl text-left hover:bg-orange hover:text-ink transition-colors">
              {l.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

