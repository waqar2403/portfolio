import type { Metadata } from "next";
import { Mdx } from "@/components/mdx";
import { getAbout } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <article className="py-10">
      <header className="border-b border-border pb-6">
        <h1 className="text-2xl font-semibold tracking-tight">About</h1>
      </header>
      <div className="mt-8">
        <Mdx source={getAbout()} />
      </div>
    </article>
  );
}
