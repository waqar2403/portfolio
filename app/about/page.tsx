import type { Metadata } from "next";
import { Mdx } from "@/components/mdx";
import { getAbout } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <article className="py-8">
      <h1 className="text-lg font-semibold">About</h1>
      <div className="mt-6">
        <Mdx source={getAbout()} />
      </div>
    </article>
  );
}
