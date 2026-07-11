import type { Metadata } from "next";
import { BlogList } from "@/components/blog-list";
import { formatDate, getPosts, readingTime } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
};

export default function BlogPage() {
  const posts = getPosts().map((post) => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
    dateLabel: formatDate(post.date),
    summary: post.summary,
    category: post.category,
    image: post.image,
    minutes: readingTime(post.content),
  }));

  return (
    <div className="py-10">
      <header className="border-b border-border pb-6">
        <h1 className="font-serif text-[2rem] leading-tight tracking-tight sm:text-[2.25rem]">Blog</h1>
        <p className="mt-2 text-sm text-muted">
          Notes on things I build, break, and figure out along the way.
        </p>
      </header>
      <div className="mt-8">
        <BlogList posts={posts} />
      </div>
    </div>
  );
}
