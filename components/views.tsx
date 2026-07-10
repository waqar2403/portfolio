"use client";

import { useEffect, useState } from "react";

// Reads the visit count for a path from GoatCounter's public counter API.
// Renders nothing until a goatcounter code is configured in content/site.yml.
export function Views({ code, path }: { code?: string; path: string }) {
  const [count, setCount] = useState<string | null>(null);

  useEffect(() => {
    if (!code) return;
    fetch(`https://${code}.goatcounter.com/counter/${encodeURIComponent(path)}.json`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d?.count && setCount(String(d.count).trim()))
      .catch(() => {});
  }, [code, path]);

  if (!code || count === null) return null;
  return <span> · {count} views</span>;
}
