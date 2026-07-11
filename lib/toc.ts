import GithubSlugger from "github-slugger";

export type TocItem = { id: string; text: string; depth: 2 | 3 };

// Extracts h2/h3 headings from markdown. Ids are generated with github-slugger,
// matching the anchors rehype-slug adds to the rendered headings.
export function extractToc(markdown: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  const withoutCode = markdown.replace(/```[\s\S]*?```/g, "");

  for (const line of withoutCode.split("\n")) {
    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!match) continue;
    const text = match[2]
      .replace(/\[(.*?)\]\(.*?\)/g, "$1")
      .replace(/[*_`~]/g, "")
      .trim();
    items.push({ id: slugger.slug(text), text, depth: match[1].length as 2 | 3 });
  }
  return items;
}
