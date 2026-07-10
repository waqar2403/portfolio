import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
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
    <div className="py-10">
      <header className="border-b border-border pb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Blog</h1>
        <p className="mt-2 text-sm text-muted">
          Notes on things I build, break, and figure out along the way.
        </p>
      </header>

      {[...byYear.entries()].map(([year, yearPosts]) => (
        <section key={year} className="mt-10">
          <SectionHeading label={year} />
          <ul className="mt-5 space-y-5">
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
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="font-medium underline decoration-border underline-offset-4 group-hover:decoration-foreground">
                        {post.title}
                      </span>
                      <span className="shrink-0 font-mono text-xs text-muted">{formatDate(post.date)}</span>
                    </div>
                    {post.summary && (
                      <p className="mt-1 line-clamp-2 text-sm leading-6 text-muted">{post.summary}</p>
                    )}
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
