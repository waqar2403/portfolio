// Auto-fetched GitHub data for the open source page. All data is public;
// requests are cached for a day (ISR), so the sections stay fresh without
// rebuilds. Every fetcher fails soft — a null/empty return hides its section.

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

export type PrItem = {
  repo: string;
  repoUrl: string;
  title: string;
  url: string;
  date: string;
  state: "merged" | "open";
};

type SearchItem = {
  title: string;
  html_url: string;
  repository_url: string;
  closed_at: string | null;
  created_at: string;
};

type SearchResult = { items: SearchItem[] };

const LIST_LIMIT = 20;

// PRs the user authored in other people's repos, newest first.
export async function getRecentPrs(username: string): Promise<PrItem[]> {
  const q = (extra: string) => encodeURIComponent(`author:${username} type:pr ${extra}`);
  const [merged, open] = await Promise.all([
    gh<SearchResult>(`/search/issues?q=${q("is:merged")}&per_page=100`),
    gh<SearchResult>(`/search/issues?q=${q("is:open")}&per_page=100`),
  ]);

  const toPr = (item: SearchItem, state: "merged" | "open"): PrItem => {
    const repo = item.repository_url.replace(`${API}/repos/`, "");
    return {
      repo,
      repoUrl: `https://github.com/${repo}`,
      title: item.title,
      url: item.html_url,
      date: item.closed_at ?? item.created_at,
      state,
    };
  };

  return [
    ...(merged?.items ?? []).map((i) => toPr(i, "merged")),
    ...(open?.items ?? []).map((i) => toPr(i, "open")),
  ]
    .filter((pr) => !pr.repo.toLowerCase().startsWith(`${username.toLowerCase()}/`))
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, LIST_LIMIT);
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
