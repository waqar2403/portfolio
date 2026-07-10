import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Comments } from "@/components/comments";
import { Mdx } from "@/components/mdx";
import { Views } from "@/components/views";
import { formatDate, getPost, getPosts, getSite } from "@/lib/content";

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

  return (
    <article className="py-10">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft size={13} />
        all posts
      </Link>

      <header className="mt-5 border-b border-border pb-6">
        <h1 className="text-2xl font-semibold tracking-tight">{post.title}</h1>
        <p className="mt-2 font-mono text-xs text-muted">
          {formatDate(post.date)}
          <Views code={site.goatcounter} path={`/blog/${post.slug}`} />
        </p>
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
    </article>
  );
}
