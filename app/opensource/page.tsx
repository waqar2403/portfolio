import type { Metadata } from "next";
import { Mdx } from "@/components/mdx";
import { getOpenSource } from "@/lib/content";

export const metadata: Metadata = {
  title: "Open Source",
};

export default function OpenSourcePage() {
  const entries = getOpenSource();

  return (
    <div className="py-8">
      <h1 className="text-lg font-semibold">Open Source</h1>
      <p className="mt-2 text-sm text-muted">
        My contributions to open-source projects, with context on what each one involved.
      </p>

      <div className="mt-10 space-y-12">
        {entries.map((entry) => (
          <section key={entry.slug} className="border-b border-border pb-12 last:border-b-0">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h2 className="text-base font-semibold">{entry.project}</h2>
              <span className="font-mono text-xs text-muted">{entry.upstream}</span>
            </div>
            <p className="mt-1 font-mono text-xs text-muted">{entry.role}</p>
            <div className="mt-4 text-[15px]">
              <Mdx source={entry.content} />
            </div>
            {entry.links.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-4 text-sm">
                {entry.links.map((l) => (
                  <a
                    key={l.url}
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-border underline-offset-4 hover:decoration-foreground"
                  >
                    {l.label} ↗
                  </a>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
