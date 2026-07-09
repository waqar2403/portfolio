import Link from "next/link";
import { formatDate, getPosts, getProjects, getSite } from "@/lib/content";

export default function Home() {
  const site = getSite();
  const posts = getPosts().slice(0, 3);
  const projects = getProjects().filter((p) => p.featured).slice(0, 3);

  return (
    <div className="py-8">
      <h1 className="text-lg font-semibold">{site.name}</h1>
      <p className="mt-1 font-mono text-sm text-muted">{site.tagline}</p>
      <p className="mt-6 leading-7">{site.description}</p>

      <section className="mt-14">
        <div className="flex items-baseline justify-between">
          <h2 className="font-mono text-sm text-muted">recent posts</h2>
          <Link href="/blog" className="font-mono text-xs text-muted underline underline-offset-4 hover:text-foreground">
            all posts
          </Link>
        </div>
        <ul className="mt-4 space-y-3">
          {posts.map((post) => (
            <li key={post.slug} className="flex items-baseline justify-between gap-4">
              <Link href={`/blog/${post.slug}`} className="underline decoration-border underline-offset-4 hover:decoration-foreground">
                {post.title}
              </Link>
              <span className="shrink-0 font-mono text-xs text-muted">{formatDate(post.date)}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <div className="flex items-baseline justify-between">
          <h2 className="font-mono text-sm text-muted">featured work</h2>
          <Link href="/projects" className="font-mono text-xs text-muted underline underline-offset-4 hover:text-foreground">
            all projects
          </Link>
        </div>
        <ul className="mt-4 space-y-5">
          {projects.map((project) => (
            <li key={project.slug}>
              <div className="flex items-baseline gap-2">
                {project.link || project.repo ? (
                  <a
                    href={project.link ?? project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-border underline-offset-4 hover:decoration-foreground"
                  >
                    {project.title}
                  </a>
                ) : (
                  <span>{project.title}</span>
                )}
                <span className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-[10px] text-muted">
                  {project.type}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted">{project.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="font-mono text-sm text-muted">elsewhere</h2>
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          {site.socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-border underline-offset-4 hover:decoration-foreground"
            >
              {s.label}
            </a>
          ))}
          <a href={`mailto:${site.email}`} className="underline decoration-border underline-offset-4 hover:decoration-foreground">
            {site.email}
          </a>
        </div>
      </section>
    </div>
  );
}
