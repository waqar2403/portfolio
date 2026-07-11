import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import { ContributionGraph } from "@/components/contribution-graph";
import { Mdx } from "@/components/mdx";
import { formatDate, getOpenSource, getSite } from "@/lib/content";
import { getContributionCalendar, getGithubReport } from "@/lib/github";

export const metadata: Metadata = {
  title: "Open Source",
};

// The GitHub report re-fetches roughly once a day.
export const revalidate = 86400;

function LiveBadge() {
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[10px] text-muted">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
      </span>
      auto · daily
    </span>
  );
}

function Rule({ label, badge }: { label: string; badge?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <h2 className="shrink-0 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">{label}</h2>
      <span className="h-px flex-1 bg-border" aria-hidden />
      {badge && <LiveBadge />}
    </div>
  );
}

export default async function OpenSourcePage() {
  const site = getSite();
  const entries = getOpenSource();
  const username = site.githubUsername;
  const [report, calendar] = username
    ? await Promise.all([getGithubReport(username), getContributionCalendar(username)])
    : [null, null];

  const stats = report?.stats
    ? [
        { label: "Merged PRs", value: report.stats.mergedPrs },
        { label: "Repos", value: report.stats.repos },
        { label: "Stars", value: report.stats.stars },
        { label: "Followers", value: report.stats.followers },
      ]
    : [];

  return (
    <div className="py-10">
      <header className="border-b border-border pb-6">
        <h1 className="font-serif text-[2rem] leading-tight tracking-tight sm:text-[2.25rem]">Open Source</h1>
        <p className="mt-2 text-sm text-muted">
          A live report pulled from my GitHub account, plus the contributions I think are worth a
          closer look.
        </p>
      </header>

      {(stats.length > 0 || calendar) && (
        <section className="mt-10">
          <Rule label="github report" badge />
          {stats.length > 0 && (
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-lg border border-border px-4 py-4 text-center transition-colors hover:bg-surface"
                >
                  <p className="font-mono text-2xl font-medium leading-none">{s.value}</p>
                  <p className="mt-2 text-[11px] uppercase tracking-wide text-muted">{s.label}</p>
                </div>
              ))}
            </div>
          )}
          {calendar && (
            <div className="mt-3">
              <ContributionGraph calendar={calendar} />
            </div>
          )}
        </section>
      )}

      {report && report.groups.length > 0 && (
        <section className="mt-14">
          <Rule label="recent pull requests" badge />
          <div className="mt-6 space-y-8">
            {report.groups.map((group) => (
              <div key={group.repo}>
                <div className="flex items-baseline justify-between gap-3">
                  <a
                    href={group.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-sm font-medium underline decoration-border underline-offset-4 hover:decoration-foreground"
                  >
                    {group.repo} <ArrowUpRight size={12} className="text-muted" />
                  </a>
                  <span className="shrink-0 font-mono text-[11px] text-muted">
                    {group.mergedCount > 0 && `${group.mergedCount} merged`}
                  </span>
                </div>
                <ul className="mt-2.5 space-y-2 border-l border-border pl-4">
                  {group.prs.map((pr) => (
                    <li key={pr.url} className="flex items-baseline justify-between gap-4">
                      <a
                        href={pr.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm leading-6 underline decoration-border underline-offset-4 hover:decoration-foreground"
                      >
                        {pr.title}
                      </a>
                      <span
                        className={`shrink-0 font-mono text-[11px] ${
                          pr.state === "open" ? "rounded-full border border-border px-2 py-px" : ""
                        } text-muted`}
                      >
                        {pr.state === "open" ? "open" : formatDate(pr.date)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-14">
        <Rule label="featured contributions" />
        <div className="mt-8 space-y-12">
          {entries.map((entry) => (
            <section key={entry.slug}>
              <div className="flex items-center gap-3.5">
                {entry.logo && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={entry.logo}
                    alt={`${entry.project} logo`}
                    className="h-10 w-10 shrink-0 rounded-md border border-border bg-white object-contain p-1"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
                    <h3 className="text-base font-semibold">{entry.project}</h3>
                    {entry.upstream && (
                      <a
                        href={`https://github.com/${entry.upstream}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-0.5 font-mono text-xs text-muted underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
                      >
                        {entry.upstream} <ArrowUpRight size={11} />
                      </a>
                    )}
                  </div>
                  <p className="mt-0.5 font-mono text-xs text-muted">{entry.role}</p>
                </div>
              </div>
              <div className="mt-4 text-[15px]">
                <Mdx source={entry.content} />
              </div>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}
