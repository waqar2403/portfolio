import { ArrowUpRight, Mail } from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { formatDate, getPosts, getProjects, getSite } from "@/lib/content";

function Chip({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 font-mono text-xs text-muted transition-colors hover:border-muted hover:text-foreground"
    >
      {href.startsWith("mailto:") ? <Mail size={12} /> : <ArrowUpRight size={12} />}
      {label}
    </a>
  );
}

export default function Home() {
  const site = getSite();
  const posts = getPosts().slice(0, 3);
  const projects = getProjects().filter((p) => p.featured).slice(0, 3);

  return (
    <div className="py-10">
      <section>
        <h1 className="text-3xl font-semibold tracking-tight">{site.name}</h1>
        <p className="mt-2 font-mono text-sm text-muted">{site.tagline}</p>
        <p className="mt-6 max-w-prose leading-7">{site.description}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {site.socials.map((s) => (
            <Chip key={s.label} href={s.url} label={s.label} />
          ))}
          <Chip href={`mailto:${site.email}`} label="email" />
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading label="recent posts" href="/blog" linkLabel="all posts" />
        <ul className="mt-4">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group -mx-3 flex items-baseline justify-between gap-4 rounded-md px-3 py-2 transition-colors hover:bg-surface"
              >
                <span className="underline decoration-border underline-offset-4 group-hover:decoration-foreground">
                  {post.title}
                </span>
                <span className="shrink-0 font-mono text-xs text-muted">{formatDate(post.date)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <SectionHeading label="featured work" href="/projects" linkLabel="all projects" />
        <ul className="mt-5 space-y-4">
          {projects.map((project) => (
            <li
              key={project.slug}
              className="rounded-lg border border-border p-5 transition-colors hover:border-muted/50"
            >
              <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                {project.link || project.repo ? (
                  <a
                    href={project.link ?? project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline decoration-border underline-offset-4 hover:decoration-foreground"
                  >
                    {project.title}
                  </a>
                ) : (
                  <span className="font-medium">{project.title}</span>
                )}
                <span className="rounded-full border border-border bg-surface px-2 py-0.5 font-mono text-[10px] text-muted">
                  {project.type}
                </span>
                {project.year && <span className="ml-auto font-mono text-xs text-muted">{project.year}</span>}
              </div>
              <p className="mt-2 text-sm leading-6 text-muted">{project.description}</p>
              {project.tech.length > 0 && (
                <p className="mt-2.5 font-mono text-xs text-muted/80">{project.tech.join(" · ")}</p>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
