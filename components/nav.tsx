"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { href: "/about", label: "about" },
  { href: "/blog", label: "blog" },
  { href: "/projects", label: "projects" },
  { href: "/opensource", label: "open source" },
];

export function Nav({ shortName }: { shortName: string }) {
  const pathname = usePathname();

  return (
    <header className="mx-auto w-full max-w-2xl px-6 pt-8">
      <nav className="flex items-center justify-between gap-4 border-b border-border pb-5 text-sm">
        <Link href="/" className="font-mono font-medium tracking-tight">
          <span className="text-muted">~/</span>
          {shortName}
        </Link>
        <div className="flex items-center gap-4 sm:gap-5">
          {links.map((l) => {
            const active = pathname === l.href || pathname.startsWith(`${l.href}/`);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`transition-colors ${
                  active
                    ? "font-medium text-foreground underline decoration-muted underline-offset-8"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
