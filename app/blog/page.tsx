import type { Metadata } from "next";
import Link from "next/link";
import { formatDate, getPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
};

export default function BlogPage() {
  const posts = getPosts();
  const byYear = new Map<string, typeof posts>();
  for (const post of posts) {
    const year = post.date.slice(0, 4);
    byYear.set(year, [...(byYear.get(year) ?? []), post]);
  }

  return (
    <div className="py-8">
      <h1 className="text-lg font-semibold">Blog</h1>
      {[...byYear.entries()].map(([year, yearPosts]) => (
        <section key={year} className="mt-10">
          <h2 className="font-mono text-sm text-muted">{year}</h2>
          <ul className="mt-4 space-y-4">
            {yearPosts.map((post) => (
              <li key={post.slug}>
                <div className="flex items-baseline justify-between gap-4">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="underline decoration-border underline-offset-4 hover:decoration-foreground"
                  >
                    {post.title}
                  </Link>
                  <span className="shrink-0 font-mono text-xs text-muted">{formatDate(post.date)}</span>
                </div>
                {post.summary && <p className="mt-1 text-sm text-muted">{post.summary}</p>}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
