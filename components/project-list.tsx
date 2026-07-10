"use client";

import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

export type ProjectItem = {
  slug: string;
  title: string;
  type: "project" | "product";
  description: string;
  tech: string[];
  link?: string;
  repo?: string;
  year?: string;
};

const filters = ["all", "projects", "products"] as const;
type Filter = (typeof filters)[number];

export function ProjectList({ projects }: { projects: ProjectItem[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const visible = projects.filter(
    (p) =>
      filter === "all" ||
      (filter === "projects" && p.type === "project") ||
      (filter === "products" && p.type === "product"),
  );

  return (
    <div>
      <div className="flex gap-2 font-mono text-xs">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`cursor-pointer rounded-full border px-3 py-1 transition-colors ${
              filter === f
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted hover:border-muted hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <ul className="mt-6 space-y-4">
        {visible.map((project) => (
          <li
            key={project.slug}
            className="rounded-lg border border-border p-5 transition-colors hover:border-muted/50"
          >
            <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
              <h2 className="font-medium">{project.title}</h2>
              <span className="rounded-full border border-border bg-surface px-2 py-0.5 font-mono text-[10px] text-muted">
                {project.type}
              </span>
              {project.year && <span className="ml-auto font-mono text-xs text-muted">{project.year}</span>}
            </div>
            <p className="mt-2 text-sm leading-6 text-muted">{project.description}</p>
            {project.tech.length > 0 && (
              <p className="mt-2.5 font-mono text-xs text-muted/80">{project.tech.join(" · ")}</p>
            )}
            {(project.link || project.repo) && (
              <div className="mt-3 flex gap-4 text-sm">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 underline decoration-border underline-offset-4 hover:decoration-foreground"
                  >
                    visit <ArrowUpRight size={13} />
                  </a>
                )}
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 underline decoration-border underline-offset-4 hover:decoration-foreground"
                  >
                    source <ArrowUpRight size={13} />
                  </a>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
