"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-border text-muted transition-colors hover:bg-surface hover:text-foreground"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {mounted &&
        (resolvedTheme === "dark" ? (
          <Sun size={15} strokeWidth={1.75} />
        ) : (
          <Moon size={15} strokeWidth={1.75} />
        ))}
    </button>
  );
}
