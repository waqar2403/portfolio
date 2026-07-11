import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { load as loadYaml } from "js-yaml";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type Social = { label: string; url: string };

export type GiscusConfig = {
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
};

export type Site = {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  email: string;
  socials: Social[];
  footer?: string;
  giscus?: GiscusConfig;
  goatcounter?: string;
  githubUsername?: string;
};

export type Post = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  category?: string;
  image?: string;
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
  logo?: string;
  order: number;
  content: string;
};

export type Experience = {
  slug: string;
  company: string;
  role: string;
  period: string;
  location: string;
  url?: string;
  logo?: string;
  order: number;
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
      category: data.data.category as string | undefined,
      image: data.data.image as string | undefined,
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
      logo: data.data.logo as string | undefined,
      order: (data.data.order as number) ?? 99,
      content: data.content,
    }))
    .sort((a, b) => a.order - b.order);
}

export function getExperience(): Experience[] {
  return readDir("experience")
    .map(({ slug, data }) => ({
      slug,
      company: data.data.company as string,
      role: (data.data.role as string) ?? "",
      period: (data.data.period as string) ?? "",
      location: (data.data.location as string) ?? "",
      url: data.data.url as string | undefined,
      logo: data.data.logo as string | undefined,
      order: (data.data.order as number) ?? 99,
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

export function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}
