import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/mdx";
import { formatDate, getPost, getPosts } from "@/lib/content";

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

  return (
    <article className="py-8">
      <h1 className="text-lg font-semibold">{post.title}</h1>
      <p className="mt-1 font-mono text-xs text-muted">{formatDate(post.date)}</p>
      <div className="mt-8">
        <Mdx source={post.content} />
      </div>
    </article>
  );
}
