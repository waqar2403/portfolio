import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { load as loadYaml } from "js-yaml";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type Social = { label: string; url: string };

export type Site = {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  email: string;
  socials: Social[];
};

export type Post = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  content: string;
};

export type Project = {
  slug: string;
  title: string;
  type: "project" | "product";
  description: string;
  tech: string[];
  link?: string;
  repo?: string;
  year?: string;
  featured?: boolean;
  content: string;
};

export type OpenSourceEntry = {
  slug: string;
  project: string;
  upstream: string;
  role: string;
  order: number;
  links: { label: string; url: string }[];
  content: string;
};

export function getSite(): Site {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, "site.yml"), "utf8");
  return loadYaml(raw) as Site;
}

export function getAbout(): string {
  return fs.readFileSync(path.join(CONTENT_DIR, "about.mdx"), "utf8");
}

function readDir(dir: string): { slug: string; data: matter.GrayMatterFile<string> }[] {
  const full = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((f) => ({
      slug: f.replace(/\.mdx?$/, ""),
      data: matter(fs.readFileSync(path.join(full, f), "utf8")),
    }));
}

export function getPosts(): Post[] {
  return readDir("blog")
    .map(({ slug, data }) => ({
      slug,
      title: data.data.title as string,
      date: data.data.date as string,
      summary: (data.data.summary as string) ?? "",
      content: data.content,
    }))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}

export function getProjects(): Project[] {
  return readDir("projects")
    .map(({ slug, data }) => ({
      slug,
      title: data.data.title as string,
      type: (data.data.type as "project" | "product") ?? "project",
      description: (data.data.description as string) ?? "",
      tech: (data.data.tech as string[]) ?? [],
      link: data.data.link as string | undefined,
      repo: data.data.repo as string | undefined,
      year: data.data.year ? String(data.data.year) : undefined,
      featured: Boolean(data.data.featured),
      content: data.content,
    }))
    .sort((a, b) => Number(b.featured) - Number(a.featured) || (a.year && b.year ? b.year.localeCompare(a.year) : 0));
}

export function getOpenSource(): OpenSourceEntry[] {
  return readDir("opensource")
    .map(({ slug, data }) => ({
      slug,
      project: data.data.project as string,
      upstream: (data.data.upstream as string) ?? "",
      role: (data.data.role as string) ?? "Contributor",
      order: (data.data.order as number) ?? 99,
      links: (data.data.links as { label: string; url: string }[]) ?? [],
      content: data.content,
    }))
    .sort((a, b) => a.order - b.order);
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
