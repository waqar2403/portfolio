import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getExperience } from "@/lib/content";

// Rendered from inside content/about.mdx as <Experience />.
// Entries live in content/experience/*.md — one file per job.
export function Experience() {
  const jobs = getExperience();

  return (
    <div className="not-prose my-6 space-y-4">
      {jobs.map((job) => (
        <div
          key={job.slug}
          className="rounded-lg border border-border p-5 transition-colors hover:border-muted/50"
        >
          <div className="flex items-center gap-3.5">
            {job.logo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={job.logo}
                alt={`${job.company} logo`}
                className="h-10 w-10 shrink-0 rounded-md border border-border bg-white object-contain p-1"
              />
            )}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
                {job.url ? (
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline decoration-border underline-offset-4 hover:decoration-foreground"
                  >
                    {job.company}
                  </a>
                ) : (
                  <span className="font-medium">{job.company}</span>
                )}
                <span className="text-sm text-muted">{job.role}</span>
              </div>
              <p className="mt-0.5 font-mono text-xs text-muted">
                {job.period}
                {job.location && ` · ${job.location}`}
              </p>
            </div>
          </div>
          <div className="prose mt-3 text-sm leading-6">
            <MDXRemote source={job.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
          </div>
        </div>
      ))}
    </div>
  );
}
