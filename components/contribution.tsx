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
      className="inline-flex items-center gap-1 font-mono text-[11px] text-muted underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
    >
      {icon}
      {label}
    </a>
  );
}

export function Contribution({ title, pr, issue, status, children }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`my-5 border-l-2 pl-4 transition-colors ${
        open ? "border-foreground/60" : "border-border hover:border-muted/70"
      }`}
    >
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
        className="group cursor-pointer"
      >
        <div className="flex items-baseline gap-2">
          <ChevronRight
            size={13}
            className={`relative top-0.5 shrink-0 text-muted transition-transform duration-200 group-hover:text-foreground ${
              open ? "rotate-90" : ""
            }`}
          />
          <span className="flex-1 text-[15px] font-medium leading-snug group-hover:text-foreground">
            {title}
          </span>
          {status && (
            <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-muted">
              {status}
            </span>
          )}
        </div>
        {(pr || issue) && (
          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 pl-[21px]">
            {pr && <HeaderLink href={pr} icon={<GitPullRequest size={11} />} label={`PR #${pr.split("/").pop()}`} />}
            {issue && <HeaderLink href={issue} icon={<CircleDot size={11} />} label={`issue #${issue.split("/").pop()}`} />}
          </div>
        )}
      </div>
      {open && (
        <div className="prose mt-3 pl-[21px] text-sm leading-6 text-muted">{children}</div>
      )}
    </div>
  );
}
