import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import { ContributionGraph } from "@/components/contribution-graph";
import { Mdx } from "@/components/mdx";
import { formatDate, getOpenSource, getSite } from "@/lib/content";
import { getContributionCalendar, getRecentPrGroups } from "@/lib/github";

export const metadata: Metadata = {
  title: "Open Source",
};

// The auto-fetched GitHub sections refresh roughly once a day.
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
  const [prGroups, calendar] = username
    ? await Promise.all([getRecentPrGroups(username), getContributionCalendar(username)])
    : [[], null];

  return (
    <div className="py-10">
      <header className="border-b border-border pb-6">
        <h1 className="font-serif text-[2rem] leading-tight tracking-tight sm:text-[2.25rem]">Open Source</h1>
        <p className="mt-2 text-sm text-muted">
          The contributions I think are worth a closer look, followed by a live feed from my GitHub
          account.
        </p>
      </header>

      <section className="mt-10">
        <Rule label="featured contributions" />
        <div className="divide-y divide-border">
          {entries.map((entry) => (
            <section key={entry.slug} className="py-8">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                {entry.logo && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={entry.logo}
                    alt={`${entry.project} logo`}
                    className="h-8 w-8 shrink-0 rounded-md border border-border bg-white object-contain p-0.5"
                  />
                )}
                <h3 className="text-[15px] font-medium">{entry.project}</h3>
                {entry.upstream && (
                  <a
                    href={`https://github.com/${entry.upstream}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 font-mono text-[11px] text-muted underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
                  >
                    {entry.upstream} <ArrowUpRight size={11} />
                  </a>
                )}
                <span className="ml-auto shrink-0 font-mono text-[11px] text-muted">{entry.role}</span>
              </div>
              <div className="mt-4 text-[15px]">
                <Mdx source={entry.content} />
              </div>
            </section>
          ))}
        </div>
      </section>

      {prGroups.length > 0 && (
        <section className="mt-6">
          <Rule label="recent pull requests" badge />
          <div className="mt-6 space-y-8">
            {prGroups.map((group) => (
              <div key={group.repo}>
                <div className="flex items-baseline justify-between gap-3">
                  <a
                    href={group.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-w-0 items-center gap-1 font-mono text-[13px] font-medium underline decoration-border underline-offset-4 hover:decoration-foreground"
                  >
                    <span className="truncate">{group.repo}</span>
                    <ArrowUpRight size={11} className="shrink-0 text-muted" />
                  </a>
                  {group.mergedCount > 0 && (
                    <span className="shrink-0 font-mono text-[11px] text-muted">
                      {group.mergedCount} merged
                    </span>
                  )}
                </div>
                <ul className="mt-1.5">
                  {group.prs.map((pr) => (
                    <li key={pr.url}>
                      <a
                        href={pr.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group -mx-4 flex items-baseline justify-between gap-4 rounded-lg px-4 py-2 transition-colors hover:bg-surface"
                      >
                        <span className="min-w-0 truncate text-sm underline decoration-border underline-offset-4 group-hover:decoration-foreground">
                          {pr.title}
                        </span>
                        <span
                          className={`shrink-0 font-mono text-[11px] text-muted ${
                            pr.state === "open" ? "rounded-full border border-border px-2 py-px" : ""
                          }`}
                        >
                          {pr.state === "open" ? "open" : formatDate(pr.date)}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {calendar && (
        <section className="mt-14">
          <Rule label="contribution graph" badge />
          <div className="mt-5">
            <ContributionGraph calendar={calendar} />
          </div>
        </section>
      )}
    </div>
  );
}
