import type { Calendar } from "@/lib/github";
import { WEEK_PITCH } from "@/lib/github";

const LEVEL_OPACITY = [0.06, 0.22, 0.45, 0.7, 1];

// Monochrome rendition of the GitHub contribution heatmap. Cells use
// currentColor, so it adapts to light/dark automatically.
export function ContributionGraph({ calendar }: { calendar: Calendar }) {
  const width = calendar.weeks.length * WEEK_PITCH - 3;
  const height = 7 * WEEK_PITCH - 3;

  return (
    <div className="overflow-hidden rounded-xl border border-border p-5">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-mono text-[11px] uppercase tracking-wide text-muted">Contributions</p>
        {calendar.total !== null && (
          <p className="text-xs text-muted">{calendar.total.toLocaleString()} in the last year</p>
        )}
      </div>
      <svg
        viewBox={`0 -16 ${width} ${height + 16}`}
        className="block w-full text-foreground"
        role="img"
        aria-label="GitHub contribution graph, last 12 months"
      >
        {calendar.months.map((m) => (
          <text
            key={`${m.label}-${m.x}`}
            x={m.x}
            y={-4}
            fontSize={10}
            fill="var(--muted)"
            fontFamily="var(--font-jetbrains-mono), monospace"
          >
            {m.label}
          </text>
        ))}
        {calendar.weeks.map((week, wi) =>
          week.map((day) => (
            <rect
              key={day.date}
              x={wi * WEEK_PITCH}
              y={day.dow * WEEK_PITCH}
              width={10}
              height={10}
              rx={2}
              fill="currentColor"
              fillOpacity={LEVEL_OPACITY[day.level] ?? 1}
            >
              <title>{day.date}</title>
            </rect>
          )),
        )}
      </svg>
    </div>
  );
}
