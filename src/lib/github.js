// Pure helpers for the GitHub widget (no React) — easy to test.

export const LANG_COLORS = {
  JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5", HTML: "#e34c26",
  CSS: "#563d7c", Java: "#b07219", "C++": "#f34b7d", C: "#555555", PHP: "#4F5D95",
  Shell: "#89e051", Jupyter: "#DA5B0B", "Jupyter Notebook": "#DA5B0B", Dart: "#00B4AB",
  Go: "#00ADD8", Rust: "#dea584", Kotlin: "#A97BFF", SCSS: "#c6538c", Vue: "#41b883",
};

// Consecutive days with activity, counted back from today.
// Today may still be 0 (the day isn't over), so it is skipped rather than breaking the streak.
export function calcStreak(days) {
  if (!days || !days.length) return null;
  let streak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) streak++;
    else if (i === days.length - 1) continue;
    else break;
  }
  return streak;
}

export function summarizeRepos(repos) {
  const own = (repos || []).filter((r) => !r.fork);
  const stars = own.reduce((s, r) => s + (r.stargazers_count || 0), 0);

  const counts = {};
  own.forEach((r) => { if (r.language) counts[r.language] = (counts[r.language] || 0) + 1; });
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const languages = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({ name, count, pct: total ? Math.round((count / total) * 100) : 0 }));

  const latest = [...own]
    .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
    .slice(0, 5)
    .map((r) => ({
      name: r.name, url: r.html_url, desc: r.description,
      lang: r.language, stars: r.stargazers_count || 0, pushed: r.pushed_at,
    }));

  return { stars, languages, latest, ownCount: own.length };
}

export function timeAgo(iso, now = Date.now()) {
  const s = Math.max(0, Math.floor((now - new Date(iso).getTime()) / 1000));
  const units = [["year", 31536000], ["month", 2592000], ["week", 604800], ["day", 86400], ["hour", 3600], ["minute", 60]];
  for (const [name, secs] of units) {
    const n = Math.floor(s / secs);
    if (n >= 1) return `${n} ${name}${n > 1 ? "s" : ""} ago`;
  }
  return "just now";
}
