import { useEffect, useState } from "react";
import { Icon, Reveal } from "./ui";
import { useInView } from "../hooks";
import { GITHUB_USERNAME } from "../data/social";
import { calcStreak, summarizeRepos, timeAgo, LANG_COLORS } from "../lib/github";

const LEVEL_COLOR = ["bg-cream/10", "bg-orange/30", "bg-orange/55", "bg-orange/75", "bg-orange"];

function useGithub(username) {
  const [d, setD] = useState({ status: "loading", profile: null, summary: null, total: null, streak: null, levels: null });
  useEffect(() => {
    let off = false;
    (async () => {
      const [u, r, c] = await Promise.allSettled([
        fetch(`https://api.github.com/users/${username}`).then((x) => (x.ok ? x.json() : null)),
        fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`).then((x) => (x.ok ? x.json() : null)),
        fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`).then((x) => (x.ok ? x.json() : null)),
      ]);
      if (off) return;
      const profile = u.value || null;
      const repos = Array.isArray(r.value) ? r.value : null;
      const contrib = c.value || null;
      const days = contrib?.contributions ?? null; // oldest → newest
      setD({
        status: profile || repos || contrib ? "ok" : "error",
        profile,
        summary: repos ? summarizeRepos(repos) : null,
        total: contrib ? contrib.total?.lastYear ?? Object.values(contrib.total ?? {})[0] ?? null : null,
        streak: calcStreak(days),
        levels: days ? days.slice(-91).map((x) => x.level) : null,
      });
    })();
    return () => { off = true; };
  }, [username]);
  return d;
}

function SectionHeader({ title, hint }) {
  return (
    <div className="flex items-center justify-between gap-3 mb-3">
      <h4 className="font-display font-700 text-sm text-cream">{title}</h4>
      <span className="font-mono text-[10px] text-cream/35 shrink-0">{hint}</span>
    </div>
  );
}

// NOTE: the wrapper (and its ref) must always render. If this returned null while
// data was loading, the in-view observer would never attach and the cells would stay hidden.
function ContributionHeatmap({ levels, done }) {
  const [ref, inView] = useInView(0.3);
  return (
    <div ref={ref}>
      <SectionHeader title="Recent activity" hint="last 13 weeks" />
      {levels ? (
        <div className="grid grid-flow-col grid-rows-7 gap-[3px] w-fit max-w-full overflow-hidden">
          {levels.map((lvl, i) => (
            <div key={i}
              className={`w-[11px] h-[11px] sm:w-3 sm:h-3 rounded-[2px] ${LEVEL_COLOR[lvl] ?? LEVEL_COLOR[0]}`}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "scale(1)" : "scale(.4)",
                transition: `opacity .35s ease ${i * 6}ms, transform .35s cubic-bezier(.2,.8,.2,1) ${i * 6}ms`,
              }} />
          ))}
        </div>
      ) : done ? (
        <p className="font-body text-xs text-cream/40">Contribution graph unavailable right now.</p>
      ) : (
        <div className="h-[90px] rounded-lg bg-cream/5 animate-pulse" />
      )}
    </div>
  );
}

function Languages({ languages }) {
  if (!languages || !languages.length) return null;
  return (
    <div>
      <SectionHeader title="Top languages" hint="by repository" />
      <div className="flex h-1.5 rounded-full overflow-hidden bg-cream/10 mb-3">
        {languages.map((l) => (
          <div key={l.name} style={{ width: `${l.pct}%`, backgroundColor: LANG_COLORS[l.name] || "#8b8b8b" }} title={`${l.name} ${l.pct}%`} />
        ))}
      </div>
      <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
        {languages.map((l) => (
          <li key={l.name} className="flex items-center gap-1.5 text-xs font-body text-cream/70">
            <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: LANG_COLORS[l.name] || "#8b8b8b" }} />
            {l.name} <span className="font-mono text-[10px] text-cream/35">{l.pct}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LatestRepos({ latest }) {
  return (
    <div className="min-w-0">
      <SectionHeader title="Latest repositories" hint="recently pushed" />
      {!latest ? (
        <div className="space-y-2">{[0, 1, 2].map((i) => <div key={i} className="h-[58px] rounded-lg bg-cream/5 animate-pulse" />)}</div>
      ) : (
        <ul className="space-y-2">
          {latest.map((r) => (
            <li key={r.name}>
              <a href={r.url} target="_blank" rel="noreferrer"
                className="group block rounded-lg bg-cream/5 border border-cream/10 hover:border-orange/50 hover:bg-cream/[0.08] px-3 py-2.5 transition-colors">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-display font-700 text-sm text-cream group-hover:text-orange truncate transition-colors">{r.name}</span>
                  <span className="font-mono text-[10px] text-cream/35 shrink-0">{timeAgo(r.pushed)}</span>
                </div>
                {r.desc && <p className="font-body text-xs text-cream/50 mt-0.5 line-clamp-1">{r.desc}</p>}
                <div className="flex items-center gap-3 mt-1.5 text-[11px] font-mono text-cream/45">
                  {r.lang && (
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: LANG_COLORS[r.lang] || "#8b8b8b" }} />{r.lang}
                    </span>
                  )}
                  <span>★ {r.stars}</span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function GithubWidget() {
  const g = useGithub(GITHUB_USERNAME);
  const p = g.profile;
  const metrics = [
    { label: "Public repos", value: p?.public_repos ?? "—" },
    { label: "Contributions (last yr)", value: g.total ?? "—" },
    { label: "Current streak", value: g.streak != null ? `${g.streak}d` : "—" },
    { label: "Stars earned", value: g.summary ? g.summary.stars : "—" },
  ];

  return (
    <section className="max-w-6xl mx-auto px-3 sm:px-6 mt-6">
      <Reveal className="bg-ink text-cream rounded-2xl p-5 sm:p-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 pb-4 mb-5 border-b border-cream/10">
          <div className="flex items-center gap-2 font-display font-800 text-base sm:text-lg">
            <Icon name="github" className="w-5 h-5 text-orange" /> GitHub activity
          </div>
          <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-display font-700 text-orange hover:underline truncate">
            @{GITHUB_USERNAME} <Icon name="arrow" className="w-3.5 h-3.5 shrink-0" />
          </a>
        </div>

        {/* Profile */}
        {p && (
          <div className="flex items-center gap-4 mb-5">
            <img src={p.avatar_url} alt={p.name || GITHUB_USERNAME} width="56" height="56"
              className="w-14 h-14 rounded-full border-2 border-orange/60 shrink-0 bg-cream/10 object-cover" />
            <div className="min-w-0">
              <div className="font-display font-800 text-base sm:text-lg leading-tight truncate">{p.name || GITHUB_USERNAME}</div>
              {p.bio && <p className="font-body text-[13px] text-cream/60 mt-0.5 line-clamp-2">{p.bio}</p>}
              <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5 font-mono text-[11px] text-cream/45">
                <span><b className="text-cream/80 font-medium">{p.followers}</b> followers</span>
                <span><b className="text-cream/80 font-medium">{p.following}</b> following</span>
                {p.location && <span>{p.location}</span>}
                <span>Joined {new Date(p.created_at).getFullYear()}</span>
              </div>
            </div>
          </div>
        )}

        {/* Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {metrics.map((m) => (
            <div key={m.label} className="bg-cream/5 border border-cream/10 rounded-lg px-3 py-2.5 text-center">
              <div className="font-display font-900 text-xl sm:text-2xl leading-none text-orange tabular-nums">{m.value}</div>
              <div className="font-body text-[11px] text-cream/60 mt-1.5 leading-tight">{m.label}</div>
            </div>
          ))}
        </div>

        {g.status === "error" ? (
          <p className="mt-5 font-body text-sm text-cream/50">
            Couldn't load live GitHub data right now (rate limit or network).{" "}
            <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer" className="text-orange hover:underline">
              View the profile on GitHub →
            </a>
          </p>
        ) : (
          <div className="mt-5 pt-5 border-t border-cream/10 grid lg:grid-cols-2 gap-6 lg:gap-8 items-start">
            <div className="space-y-5 min-w-0">
              <ContributionHeatmap levels={g.levels} done={g.status !== "loading"} />
              <Languages languages={g.summary?.languages} />
            </div>
            <LatestRepos latest={g.summary?.latest} />
          </div>
        )}
      </Reveal>
    </section>
  );
}