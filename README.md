# waqar's portfolio

Minimal monochrome portfolio — Next.js + Tailwind + MDX, deployed on Vercel.
**All content is plain `.md`/`.yml` files. Edit a file, push, and the live site
updates automatically.** Design decisions live in [DESIGN.md](./DESIGN.md).

## Editing content (no code required)

Everything editable lives in `content/`:

| File / folder | What it controls |
|---|---|
| `content/site.yml` | Name, tagline, bio, email, social links, footer line, comments + views config |
| `content/about.mdx` | About page prose (the `<Experience />` tag renders the job cards) |
| `content/experience/*.md` | One file per job — company, role, period, logo, bullet points |
| `content/blog/*.mdx` | One file per post |
| `content/projects/*.md` | One file per project/product (`type: project` or `type: product`) |
| `content/opensource/*.md` | One file per upstream project, with collapsible contributions |
| `public/images/` | Images, logos, blog thumbnails |

### Writing a blog post

Create `content/blog/my-post.mdx`:

```md
---
title: My new post
date: "2026-07-10"
summary: One line shown in the post list.
image: /images/blog/my-thumb.png   # optional thumbnail (list + top of post)
---

Regular **markdown**. Images: ![alt](/images/foo.png)

Videos: <YouTube id="dQw4w9WgXcQ" title="..." />
```

### Adding an open-source contribution

Inside any `content/opensource/*.md` body:

```mdx
<Contribution
  title="What I did"
  status="merged"                 # merged | in progress | assigned — or omit
  pr="https://github.com/org/repo/pull/123"      # optional
  issue="https://github.com/org/repo/issues/45"  # optional
>

Detailed explanation (markdown). Shown when the card is expanded.

</Contribution>
```

### Comments and view counts

- **Comments** (GitHub-account comments via [giscus](https://giscus.app), backed by
  this repo's Discussions): already configured in `site.yml`. One-time activation:
  install the [giscus app](https://github.com/apps/giscus) on this repo.
- **Views** ([GoatCounter](https://goatcounter.com), free): sign up, pick a site code,
  put it in `site.yml` under `goatcounter:`, push. Unique-visit counts then appear on
  every post.

## Development

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
```

Deployed on Vercel — every push to `main` goes live.
