import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Comments } from "@/components/comments";
import { Mdx } from "@/components/mdx";
import { Toc } from "@/components/toc";
import { Views } from "@/components/views";
import { formatDate, getPost, getPosts, getSite, readingTime } from "@/lib/content";
import { extractToc } from "@/lib/toc";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.summary };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const site = getSite();
  const toc = extractToc(post.content);
  const minutes = readingTime(post.content);

  return (
    <article className="relative py-10">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft size={13} />
        back to blog
      </Link>

      <header className="mt-8 border-b border-border pb-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] text-muted">
          {post.category && (
            <span className="rounded-full border border-border px-2.5 py-0.5 text-[10px] uppercase tracking-wider">
              {post.category}
            </span>
          )}
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden>·</span>
          <span>{minutes} min read</span>
          <Views code={site.goatcounter} path={`/blog/${post.slug}`} />
        </div>
        <h1 className="mt-4 font-serif text-[1.75rem] leading-[1.25] tracking-tight sm:text-[2.25rem]">
          {post.title}
        </h1>
      </header>

      {post.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.image}
          alt=""
          className="mt-8 w-full rounded-lg border border-border"
        />
      )}

      <div className="mt-8">
        <Mdx source={post.content} />
      </div>

      {site.giscus && (
        <div className="mt-14 border-t border-border pt-10">
          <Comments config={site.giscus} />
        </div>
      )}

      {toc.length > 0 && (
        <aside className="absolute left-full top-10 hidden h-[calc(100%-5rem)] xl:block">
          <div className="sticky top-16 ml-12 w-56 max-h-[calc(100vh-8rem)] overflow-y-auto">
            <Toc items={toc} />
          </div>
        </aside>
      )}
    </article>
  );
}
