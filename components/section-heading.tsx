import Link from "next/link";

type Props = {
  label: string;
  href?: string;
  linkLabel?: string;
};

export function SectionHeading({ label, href, linkLabel }: Props) {
  return (
    <div className="flex items-center gap-3">
      <h2 className="shrink-0 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">{label}</h2>
      <span className="h-px flex-1 bg-border" aria-hidden />
      {href && linkLabel && (
        <Link
          href={href}
          className="shrink-0 font-mono text-xs text-muted underline underline-offset-4 transition-colors hover:text-foreground"
        >
          {linkLabel} →
        </Link>
      )}
    </div>
  );
}
