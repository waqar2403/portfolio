// Auto-fetched GitHub report for the open source page. All data is public;
// requests are cached for a day (ISR), so the section stays fresh without
// rebuilds. Every fetcher fails soft — a null return hides its section.

const API = "https://api.github.com";
const DAY = 86400;

function headers(): HeadersInit {
  return {
    Accept: "application/vnd.github+json",
    ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
  };
}

async function gh<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API}${path}`, { headers: headers(), next: { revalidate: DAY } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export type GithubStats = {
  repos: number;
  stars: number;
  followers: number;
  mergedPrs: number;
};

export type PrItem = {
  title: string;
  url: string;
  date: string;
  state: "merged" | "open";
};

export type RepoGroup = {
  repo: string;
  url: string;
  mergedCount: number;
  prs: PrItem[];
};

type SearchItem = {
  title: string;
  html_url: string;
  repository_url: string;
  closed_at: string | null;
  created_at: string;
};

type SearchResult = { items: SearchItem[] };

export type GithubReport = {
  stats: GithubStats | null;
  groups: RepoGroup[];
};

const PER_REPO_LIMIT = 6;

export async function getGithubReport(username: string): Promise<GithubReport> {
  const q = (extra: string) => encodeURIComponent(`author:${username} type:pr ${extra}`);
  const [user, repos, merged, open] = await Promise.all([
    gh<{ public_repos: number; followers: number }>(`/users/${username}`),
    gh<{ stargazers_count: number }[]>(`/users/${username}/repos?per_page=100&type=owner`),
    gh<SearchResult>(`/search/issues?q=${q("is:merged")}&per_page=100`),
    gh<SearchResult>(`/search/issues?q=${q("is:open")}&per_page=100`),
  ]);

  const toPr = (item: SearchItem, state: "merged" | "open"): PrItem & { repo: string } => ({
    repo: item.repository_url.replace(`${API}/repos/`, ""),
    title: item.title,
    url: item.html_url,
    date: item.closed_at ?? item.created_at,
    state,
  });

  // Upstream contributions only — skip PRs against the user's own repos.
  const all = [
    ...(merged?.items ?? []).map((i) => toPr(i, "merged")),
    ...(open?.items ?? []).map((i) => toPr(i, "open")),
  ].filter((pr) => !pr.repo.toLowerCase().startsWith(`${username.toLowerCase()}/`));

  const byRepo = new Map<string, (PrItem & { repo: string })[]>();
  for (const pr of all) byRepo.set(pr.repo, [...(byRepo.get(pr.repo) ?? []), pr]);

  const groups: RepoGroup[] = [...byRepo.entries()]
    .map(([repo, prs]) => ({
      repo,
      url: `https://github.com/${repo}`,
      mergedCount: prs.filter((p) => p.state === "merged").length,
      prs: prs
        .sort((a, b) => (a.date < b.date ? 1 : -1))
        .slice(0, PER_REPO_LIMIT)
        .map(({ repo: _repo, ...pr }) => pr),
    }))
    .sort((a, b) => b.mergedCount - a.mergedCount || b.prs.length - a.prs.length);

  const mergedUpstream = all.filter((p) => p.state === "merged").length;
  const stats: GithubStats | null =
    user && repos
      ? {
          repos: user.public_repos,
          stars: repos.reduce((sum, r) => sum + r.stargazers_count, 0),
          followers: user.followers,
          mergedPrs: mergedUpstream,
        }
      : null;

  return { stats, groups };
}

export type CalendarDay = { date: string; level: number; dow: number };
export type Calendar = {
  total: number | null;
  weeks: CalendarDay[][];
  months: { label: string; x: number }[];
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const WEEK_PITCH = 13; // 10px cell + 3px gap

// GitHub's public contributions page — same data as the profile heatmap.
export async function getContributionCalendar(username: string): Promise<Calendar | null> {
  try {
    const res = await fetch(`https://github.com/users/${username}/contributions`, {
      next: { revalidate: DAY },
    });
    if (!res.ok) return null;
    const html = await res.text();

    const days: CalendarDay[] = [];
    const cellRe =
      /data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="(\d)"|data-level="(\d)"[^>]*data-date="(\d{4}-\d{2}-\d{2})"/g;
    for (const m of html.matchAll(cellRe)) {
      const date = m[1] ?? m[4];
      const level = Number(m[2] ?? m[3]);
      days.push({ date, level, dow: new Date(`${date}T00:00:00Z`).getUTCDay() });
    }
    if (days.length < 30) return null;
    days.sort((a, b) => (a.date < b.date ? -1 : 1));

    const start = Date.parse(`${days[0].date}T00:00:00Z`) - days[0].dow * 86400000;
    const weeks: CalendarDay[][] = [];
    for (const day of days) {
      const idx = Math.floor((Date.parse(`${day.date}T00:00:00Z`) - start) / (7 * 86400000));
      (weeks[idx] ??= []).push(day);
    }

    const months: Calendar["months"] = [];
    let prevMonth = -1;
    weeks.forEach((week, wi) => {
      const month = new Date(`${week[0].date}T00:00:00Z`).getUTCMonth();
      if (month !== prevMonth) {
        const x = wi * WEEK_PITCH;
        const last = months[months.length - 1];
        if (!last || x - last.x >= 3 * WEEK_PITCH) months.push({ label: MONTHS[month], x });
        prevMonth = month;
      }
    });

    const totalMatch = /([\d,]+)\s+contributions?\s+in the last year/i.exec(html);
    return {
      total: totalMatch ? Number(totalMatch[1].replace(/,/g, "")) : null,
      weeks: weeks.filter((w) => w?.length),
      months,
    };
  } catch {
    return null;
  }
}
