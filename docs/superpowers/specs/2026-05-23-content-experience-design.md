# Content Experience Features

## Overview

Add three features to improve blog content consumption: RSS feed, reading time estimates, and table of contents with scrollspy. All features are build-time or client-side only — no external dependencies or services required.

## 1. RSS / Atom Feed

### Requirements
- Auto-generated RSS 2.0 feed at `/feed.xml`
- Contains all published (non-draft) blog posts sorted by date
- Each entry: title, URL, publication date, description (excerpt), category
- Excerpts only (not full content) for feed entries
- Feed auto-discovery `<link>` tags in `<head>`
- Regenerated on every build

### Implementation

**New file: `scripts/generate-feed.js`**
- Duplicates `getSortedPosts()` logic inline from `utils/posts` (the script runs as CommonJS, utils/posts is ESM)
- Builds RSS 2.0 XML string manually (no XML library needed)
- Escapes special XML characters in titles/descriptions
- Writes to `public/feed.xml`
- Uses `siteMetadata.siteUrl`, `siteMetadata.title`, `siteMetadata.description` from `site.config.js`

**Updated: `package.json`**
- Add `node scripts/generate-feed.js` to the `prebuild` script (before `next build`)

**Updated: `app/layout.tsx`**
- Add `<link>` tags in `<head>` for RSS auto-discovery:
  - `rel="alternate" type="application/rss+xml"` pointing to `/feed.xml`

### Feed XML Structure
```xml
<rss version="2.0">
  <channel>
    <title>Site Title</title>
    <link>https://soubai.me</link>
    <description>Site description</description>
    <language>en-US</language>
    <lastBuildDate>RFC 2822 date</lastBuildDate>
    <item>
      <title>Post Title</title>
      <link>https://soubai.me/post/slug</link>
      <guid>https://soubai.me/post/slug</guid>
      <pubDate>RFC 2822 date</pubDate>
      <description>Excerpt or description</description>
      <category>category</category>
    </item>
  </channel>
</rss>
```

## 2. Reading Time

### Requirements
- Display "X min read" on home page post cards
- Display "X min read" on individual post article headers
- Calculate based on word count at 200 words per minute, minimum 1 min

### Implementation

**New file: `utils/read-time.ts`**
```ts
export function getReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}
```

**Updated: `app/HomePage.tsx`**
- Import `getReadTime`
- Add reading time display on each post card, next to the date

**Updated: `app/post/[slug]/page.tsx`**
- Import `getReadTime`
- Add reading time display in the article header, next to date/category

### Display Format
- Plain text: "5 min read" or "1 min read"
- Small, muted text to not compete with titles
- Same font style as date/category labels

## 3. Table of Contents

### Requirements
- Auto-generated from h1/h2/h3 headings in the post markdown
- Sticky sidebar on desktop (screens >= 1024px)
- Collapsible "Contents" button on mobile
- Scrollspy: highlight the current section as the user scrolls
- Smooth scroll to section on click
- Injects anchor IDs into headings

### Implementation

**New file: `utils/slugify.ts`**
```ts
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
```

**New file: `utils/extract-toc.ts`**
```ts
export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function extractToc(content: string): TocItem[] {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const items: TocItem[] = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const text = match[2].trim();
    items.push({
      id: slugify(text),
      text,
      level: match[1].length,
    });
  }
  return items;
}
```

**New file: `components/ArticleTOC.tsx`** (Client Component)
- Props: `items: TocItem[]`
- Desktop: sticky sidebar (`position: sticky; top: 6rem`), max-height with overflow-y auto
- Mobile: collapsible toggle at top of article
- Uses `IntersectionObserver` to detect which heading is currently visible
- Applies accent color to the active heading entry
- Click handler: `document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })`
- Indentation based on heading level (h1 = no indent, h2 = pl-4, h3 = pl-8)
- Empty state: renders nothing if no items

**Updated: `app/post/[slug]/page.tsx`**
- Import `extractToc` and `ArticleTOC`
- Extract ToC items from `post.content` at render time
- Add anchor IDs to heading renderers in `ReactMarkdown` components
- Layout: two-column layout on desktop (ToC sidebar + content), single column on mobile

### Heading Anchor Modifications
For each heading component (h1, h2, h3, h4) in the ReactMarkdown `components` prop:
- Add `id` attribute with the slugified heading text
- Append a hidden anchor link (`#`) for permalink functionality (optional)

### Layout

```tsx
// Desktop: flex row with sticky sidebar
<div className="flex gap-8">
  <aside className="hidden lg:block w-64 flex-shrink-0">
    <ArticleTOC items={tocItems} />
    <div className="sticky top-24">
      <ArticleTOC items={tocItems} />
    </div>
  </aside>
  <article className="flex-1 min-w-0">
    {/* existing article content */}
  </article>
</div>
// Mobile: collapsible ToC before article
<div className="lg:hidden mb-4">
  <ArticleTOC items={tocItems} />
</div>
```

## File Changes Summary

| Action | File |
|--------|------|
| Create | `docs/superpowers/specs/2026-05-23-content-experience-design.md` |
| Create | `scripts/generate-feed.js` |
| Create | `utils/read-time.ts` |
| Create | `utils/slugify.ts` |
| Create | `utils/extract-toc.ts` |
| Create | `components/ArticleTOC.tsx` |
| Modify | `app/layout.tsx` (add RSS link tags) |
| Modify | `app/post/[slug]/page.tsx` (reading time, ToC layout, heading anchors) |
| Modify | `app/HomePage.tsx` (reading time on cards) |
| Modify | `package.json` (add feed generation to prebuild) |

## Non-Goals
- Full post content in RSS feed (excerpts only)
- ToC on pages other than blog posts (about, talks, oss)
- Automatic generation of heading IDs for existing heading elements
- Dark/light mode specific ToC styling (inherits from terminal theme CSS variables)
