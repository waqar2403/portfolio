import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import { Mdx } from "@/components/mdx";
import { getOpenSource } from "@/lib/content";

export const metadata: Metadata = {
  title: "Open Source",
};

export default function OpenSourcePage() {
  const entries = getOpenSource();

  return (
    <div className="py-10">
      <header className="border-b border-border pb-6">
        <h1 className="font-serif text-[2rem] leading-tight tracking-tight sm:text-[2.25rem]">Open Source</h1>
        <p className="mt-2 text-sm text-muted">
          My upstream contributions, with the context behind each one. Click a contribution to expand
          the details.
        </p>
      </header>

      <div className="mt-10 space-y-12">
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
                  <h2 className="text-base font-semibold">{entry.project}</h2>
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
    </div>
  );
}
