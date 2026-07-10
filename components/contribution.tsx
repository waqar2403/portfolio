"use client";

import { ChevronRight, CircleDot, GitPullRequest } from "lucide-react";
import { useState } from "react";

type Props = {
  title: string;
  pr?: string;
  issue?: string;
  status?: string;
  children: React.ReactNode;
};

function HeaderLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="inline-flex items-center gap-1 font-mono text-xs text-muted underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
    >
      {icon}
      {label}
    </a>
  );
}

export function Contribution({ title, pr, issue, status, children }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="not-prose my-3 overflow-hidden rounded-lg border border-border transition-colors hover:border-muted/50">
      <div
        role="button"
        tabIndex={0}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen((o) => !o);
          }
        }}
        className="cursor-pointer px-4 py-3 transition-colors hover:bg-surface"
      >
        <div className="flex items-center gap-2.5">
          <ChevronRight
            size={14}
            className={`shrink-0 text-muted transition-transform duration-200 ${open ? "rotate-90" : ""}`}
          />
          <h3 className="flex-1 text-sm font-medium leading-snug">{title}</h3>
          {status && (
            <span className="shrink-0 rounded-full border border-border bg-surface px-2 py-0.5 font-mono text-[10px] text-muted">
              {status}
            </span>
          )}
        </div>
        {(pr || issue) && (
          <div className="mt-1.5 flex flex-wrap gap-4 pl-[26px]">
            {pr && <HeaderLink href={pr} icon={<GitPullRequest size={12} />} label={`PR #${pr.split("/").pop()}`} />}
            {issue && <HeaderLink href={issue} icon={<CircleDot size={12} />} label={`issue #${issue.split("/").pop()}`} />}
          </div>
        )}
      </div>
      {open && (
        <div className="border-t border-border bg-surface/40 px-4 py-4">
          <div className="prose text-sm leading-6">{children}</div>
        </div>
      )}
    </div>
  );
}
