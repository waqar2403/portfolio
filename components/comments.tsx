"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";
import type { GiscusConfig } from "@/lib/content";

export function Comments({ config }: { config: GiscusConfig }) {
  const { resolvedTheme } = useTheme();

  return (
    <Giscus
      repo={config.repo as `${string}/${string}`}
      repoId={config.repoId}
      category={config.category}
      categoryId={config.categoryId}
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={resolvedTheme === "dark" ? "transparent_dark" : "light"}
      lang="en"
      loading="lazy"
    />
  );
}
