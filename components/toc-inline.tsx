"use client";

import { ChevronDown } from "lucide-react";
import type { TocItem } from "@/lib/toc";

// Collapsible "On this page" shown at the top of a post on screens too narrow
// for the right-margin sidebar (below xl). Hidden when the sidebar is visible.
export function TocInline({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null;

  return (
    <details className="group mb-8 rounded-lg border border-border bg-surface/40 xl:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-muted">
        On this page
        <ChevronDown size={14} className="transition-transform group-open:rotate-180" />
      </summary>
      <ul className="space-y-2 border-t border-border px-4 pb-4 pt-3">
        {items.map((item) => (
          <li key={item.id} className={item.depth === 3 ? "pl-4" : ""}>
            <a
              href={`#${item.id}`}
              className="block text-[13px] leading-snug text-muted transition-colors hover:text-foreground"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
