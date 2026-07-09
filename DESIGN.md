# Portfolio — Design Document

> Living document. Updated as we discuss. Last updated: 2026-07-09

## 1. Goals

- Simple, minimal, content-first portfolio — black & white theme.
- Sections: About, Blog, Projects & Products (merged), Open Source.
- Editable through the site itself (a CMS UI), not by touching code.
- Customizable/extensible: easy to drop in interactive components later (e.g. a 3D globe).

## 2. References

| Site | What we take from it |
|---|---|
| [kakkoyun.me](https://kakkoyun.me/about/) ⭐ favorite | Monochrome black-on-white, single column, plain top nav, long-form text, zero decoration. This is the design north star. |
| [talhaashraf.com](https://talhaashraf.com/) | Content-first list style for essays/posts; quirky personal bio bullets; fast and utilitarian. |
| [marmikpatel.com](https://www.marmikpatel.com/) | Casual lowercase voice ("hey, i'm waqar"), identity-based sections, one photo as the only visual anchor. |

## 3. Tech stack (proposed)

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15 (App Router) + React** | Any interactive component (globe, GitHub graph, animations) is a drop-in React component. Biggest ecosystem, easy Vercel deploys. |
| Styling | **Tailwind CSS** | Fast to build a minimal design; theme tokens in one config file. |
| Content | **MDX files in the repo** ✅ decided | Posts/projects are plain markdown files — portable forever, no database. MDX lets you embed React components *inside* blog posts (YouTube embeds, images). |
| CMS | **None — edit files directly** ✅ decided | Workflow: add/edit a `.md`/`.yml` file → push to GitHub → Vercel rebuilds and the site updates automatically. Keystatic can be layered on later without changing anything, since it edits the same files. |
| Deploy | **Vercel** (free tier) | Push to GitHub → auto deploy. Keystatic edits trigger rebuilds automatically. |
| Globe (later) | **cobe** (~5 kB WebGL globe) | The Vercel/GitHub-style dotted globe as a drop-in React component. |

### CMS alternatives considered

- **TinaCMS** — best-in-class visual editing (click text on the live page, edit in a sidebar), but wiring it up is more work and it leans on Tina Cloud SaaS.
- **Sanity** — hosted studio, real-time collab, generous free tier; overkill for a single-author portfolio and content lives in their cloud, not your repo.
- **Payload 3** — full CMS running inside Next.js with a database; powerful but heavier than needed here.
- **Hugo + PaperMod** (what kakkoyun.me uses) — fastest to launch, but editing means touching files/git, and custom interactive components (globe) are painful. Rejected because of the no-code-editing requirement.

**Decision: pending discussion** (recommendation: Keystatic)

## 4. Theme — black & white

Pure monochrome, no accent color. Links are underlined instead of colored.

**Decided 2026-07-09: Option B — "Warm paper"** (stone grays, slightly warm — bookish, easy on the eyes).
Alternatives considered: A — pure mono (Vercel/Geist neutrals), C — true black ink (#FFF/#000).
Swapping later = editing the 10 hex values in `app/globals.css`.

### Light mode
| Token | Hex | Use |
|---|---|---|
| `background` | `#FAFAF9` | page background |
| `foreground` | `#1C1917` | body text, headings |
| `muted` | `#78716C` | dates, captions, secondary text |
| `border` | `#E7E5E4` | hairline dividers, card borders |
| `surface` | `#F5F5F4` | code blocks, tags, hover backgrounds |

### Dark mode
| Token | Hex | Use |
|---|---|---|
| `background` | `#0C0A09` | page background |
| `foreground` | `#E7E5E4` | body text, headings |
| `muted` | `#A8A29E` | secondary text |
| `border` | `#292524` | dividers |
| `surface` | `#1C1917` | code blocks, tags |

### Typography
- **UI + body:** Geist Sans (or Inter) — clean, neutral, free.
- **Code + dates/metadata:** Geist Mono — gives the site its "engineer" character.
- Body text ~16–18px, max line width ~65–70ch (single centered column, like kakkoyun.me).

## 5. Structure / sitemap

```
Top nav:  waqar    about  blog  projects  open source        [☾ theme toggle]

/            Home — name, one-line intro, short bio, 3 recent posts,
             3 featured projects, social links (GitHub · LinkedIn · email)
/about       Prose bio: what I do now, background, interests, contact.
             Optional: kakkoyun-style "Now" section at top.
/blog        Chronological list grouped by year: title + date only.
/blog/[slug] Post page — MDX, so posts can embed React components.
/projects    Projects & Products merged. List of entries, each tagged
             `project` or `product`, with a small filter toggle.
/opensource  Grouped by upstream project (e.g. OpenTelemetry, Cognee):
             merged PRs, issues, roles. Option: auto-fetch merged PRs
             from the GitHub API at build time so it never goes stale.
```

### Page layout rules
- Single centered column (~672px / `max-w-2xl`), generous whitespace.
- No sidebars, no hero images, no carousels, no animations on load.
- Footer: copyright + source link, nothing else.

## 6. Content editing workflow (no code changes needed)

Everything lives in `content/` — edit a file, push, Vercel redeploys:

```
content/
  site.yml            → name, tagline, social links, nav
  about.mdx           → about page prose
  blog/*.mdx          → one file per post (frontmatter: title, date, summary)
  projects/*.md       → one file per project/product (frontmatter: type: project|product)
  opensource/*.md     → one file per upstream project, detailed hand-written write-up
public/images/        → images referenced from posts
```

Inside any `.mdx` post: `<YouTube id="..." />` embeds a video, `![alt](/images/foo.png)` embeds an image.

What still needs code: layout changes, new page types, new components (globe, etc.).

## 7. Open questions

- [ ] Final color palette pick (3 visual options presented — see chat)
- [ ] Domain name? (e.g. waqar.dev / mwaqar.me — need to check availability)
- [ ] Tone check after MVP preview: lowercase casual vs. straight professional
- [ ] Photo on home/about — MVP ships text-only; add photo later if wanted

## 8. Decisions log

| Date | Decision |
|---|---|
| 2026-07-09 | Sections: About, Blog, Projects+Products (merged), Open Source |
| 2026-07-09 | Theme: black & white monochrome, no accent color |
| 2026-07-09 | Primary reference: kakkoyun.me |
| 2026-07-09 | No CMS UI — content is `.md`/`.yml` files in the repo, edited by hand, pushed to GitHub, auto-deployed by Vercel |
| 2026-07-09 | Blog posts support images + YouTube embeds (MDX component) |
| 2026-07-09 | Open source section is hand-curated with detailed write-ups (not auto-fetched) — professional tone |
| 2026-07-09 | Hosting: Vercel |
| 2026-07-09 | Dark mode toggle: yes |
| 2026-07-09 | Palette: Option B "warm paper" (stone grays) over pure mono and true black |
