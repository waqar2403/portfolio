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

function CardImage({ post }: { post: BlogItem }) {
  return (
    <div className="relative aspect-[5/2] w-full overflow-hidden bg-surface">
      {post.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.image}
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <span className="font-serif text-6xl text-muted/25 transition-transform duration-500 group-hover:scale-[1.03]">
            {post.title.charAt(0)}
          </span>
        </div>
      )}
      {post.category && (
        <span className="absolute bottom-3 left-3 rounded-md bg-black/70 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-white backdrop-blur-sm">
          {post.category}
        </span>
      )}
    </div>
  );
}

export function BlogList({ posts }: { posts: BlogItem[] }) {
  const categories = useMemo(
    () => ["all", ...Array.from(new Set(posts.map((p) => p.category).filter((c): c is string => !!c)))],
    [posts],
  );
  const [filter, setFilter] = useState("all");

  const visible = posts.filter((p) => filter === "all" || p.category === filter);

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

      <div className="mt-8 space-y-8">
        {visible.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block overflow-hidden rounded-2xl border border-border bg-surface/40 transition-colors hover:border-muted/60"
          >
            <CardImage post={post} />
            <div className="p-5">
              <div className="flex flex-wrap items-center gap-x-2 font-mono text-[11px] text-muted">
                <span>{post.dateLabel}</span>
                <span aria-hidden>·</span>
                <span>{post.minutes} min read</span>
              </div>
              <h2 className="mt-2 text-[18px] font-semibold leading-snug transition-colors group-hover:text-muted">
                {post.title}
              </h2>
              {post.summary && (
                <p className="mt-2 line-clamp-3 text-sm leading-[1.7] text-muted">{post.summary}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
