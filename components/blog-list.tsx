"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export type BlogItem = {
  slug: string;
  title: string;
  date: string;
  dateLabel: string;
  summary: string;
  category?: string;
  image?: string;
  minutes: number;
};

export function BlogList({ posts }: { posts: BlogItem[] }) {
  const categories = useMemo(
    () => ["all", ...Array.from(new Set(posts.map((p) => p.category).filter((c): c is string => !!c)))],
    [posts],
  );
  const [filter, setFilter] = useState("all");

  const visible = posts.filter((p) => filter === "all" || p.category === filter);
  const byYear = new Map<string, BlogItem[]>();
  for (const post of visible) {
    const year = post.date.slice(0, 4);
    byYear.set(year, [...(byYear.get(year) ?? []), post]);
  }

  return (
    <div>
      {categories.length > 1 && (
        <div className="flex flex-wrap gap-2 font-mono text-xs">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              className={`cursor-pointer rounded-full border px-3 py-1 transition-colors ${
                filter === c
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted hover:border-muted hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      {[...byYear.entries()].map(([year, yearPosts]) => (
        <section key={year} className="mt-8">
          <div className="flex items-center gap-3">
            <h2 className="shrink-0 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
              {year}
            </h2>
            <span className="h-px flex-1 bg-border" aria-hidden />
          </div>
          <ul className="mt-4 space-y-5">
            {yearPosts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group flex gap-4">
                  {post.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.image}
                      alt=""
                      className="h-16 w-24 shrink-0 rounded-md border border-border object-cover transition-colors group-hover:border-muted/60"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <span className="font-medium underline decoration-border underline-offset-4 group-hover:decoration-foreground">
                      {post.title}
                    </span>
                    {post.summary && (
                      <p className="mt-1 line-clamp-2 text-sm leading-6 text-muted">{post.summary}</p>
                    )}
                    <p className="mt-1.5 flex flex-wrap items-center gap-x-2 font-mono text-[11px] text-muted">
                      {post.category && (
                        <>
                          <span className="rounded-full border border-border px-2 py-px text-[10px] uppercase tracking-wider">
                            {post.category}
                          </span>
                          <span aria-hidden>·</span>
                        </>
                      )}
                      <span>{post.dateLabel}</span>
                      <span aria-hidden>·</span>
                      <span>{post.minutes} min read</span>
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
