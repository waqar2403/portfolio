import type { Site } from "@/lib/content";

export function Footer({ site }: { site: Site }) {
  return (
    <footer className="mx-auto mt-16 w-full max-w-2xl px-6 py-8">
      <div className="border-t border-border pt-6 font-mono text-xs text-muted">
        <div className="flex flex-wrap items-center justify-between gap-2">
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
        {site.footer && <p className="mt-3 text-muted/80">{site.footer}</p>}
      </div>
    </footer>
  );
}
