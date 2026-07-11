"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/toc";

// "On this page" sidebar with scroll-spy: the heading currently in view gets
// a foreground-colored marker on the left rail.
export function Toc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string | undefined>(items[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "0% 0% -75% 0%" },
    );
    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of contents">
      <p className="mb-4 font-mono text-[10px] uppercase tracking-wider text-muted">
        On this page
      </p>
      <ul className="space-y-2 border-l border-border">
        {items.map((item) => (
          <li key={item.id} className={item.depth === 3 ? "pl-3" : ""}>
            <a
              href={`#${item.id}`}
              className={`-ml-px block border-l py-1 pl-3 text-xs leading-snug transition-colors ${
                active === item.id
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
