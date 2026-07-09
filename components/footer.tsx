import type { Site } from "@/lib/content";

export function Footer({ site }: { site: Site }) {
  return (
    <footer className="mx-auto mt-16 w-full max-w-2xl px-6 py-8">
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border pt-6 font-mono text-xs text-muted">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <div className="flex gap-4">
          {site.socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              {s.label}
            </a>
          ))}
          <a href={`mailto:${site.email}`} className="transition-colors hover:text-foreground">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
