import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { href: "/about", label: "about" },
  { href: "/blog", label: "blog" },
  { href: "/projects", label: "projects" },
  { href: "/opensource", label: "open source" },
];

export function Nav({ shortName }: { shortName: string }) {
  return (
    <header className="mx-auto w-full max-w-2xl px-6 py-8">
      <nav className="flex items-center justify-between gap-4 text-sm">
        <Link href="/" className="font-mono font-medium">
          {shortName}
        </Link>
        <div className="flex items-center gap-4 sm:gap-5">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-muted transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
