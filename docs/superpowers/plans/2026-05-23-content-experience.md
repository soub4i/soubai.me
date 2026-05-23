# Content Experience Implementation Plan

> **For agentic workers:** Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add RSS feed, reading time, and table of contents with scrollspy to the blog.

**Architecture:** Three independent features — build-time script (RSS), pure utility (reading time), and a client component (ToC). No shared state between them.

**Tech Stack:** Node.js (RSS generation), TypeScript utilities, React client component with IntersectionObserver.

---

### Task 1: Reading Time Utility

**Files:**
- Create: `utils/read-time.ts`

- [ ] **Step 1: Create the utility**

```ts
export function getReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}
```

- [ ] **Step 2: Add reading time to HomePage.tsx**

Import `getReadTime` and add display next to the date on each post card. Insert after the date span:

```tsx
<>
  <span className="text-terminal-text-secondary text-xs">•</span>
  <span className="text-terminal-text-secondary text-xs">{getReadTime(post.content)} min read</span>
</>
```

But wait — `HomePage.tsx` only receives `frontmatter` and `slug`, not the full `content`. I need to check what's passed.

Actually looking at `HomePage.tsx`, `postList` comes from `posts` which is `getSortedPosts()`. The `Post` interface includes `content`. But the mapping in the render destructures only `{ frontmatter, slug }`. I need to also destructure `content`.

So I'll pass `content` through from the Post object and compute reading time.

- [ ] **Step 3: Add reading time to post/[slug]/page.tsx**

In the article header, add after the date display:

```tsx
<span className="terminal-text/40">•</span>
<span className="terminal-text/80 text-sm">{getReadTime(post.content)} min read</span>
```

---

### Task 2: RSS Feed Generator

**Files:**
- Create: `scripts/generate-feed.js`
- Modify: `package.json` (add to prebuild)
- Modify: `app/layout.tsx` (add link tags)

- [ ] **Step 1: Create the feed generator script**

```js
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

function getFormattedDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function getPostsFolders() {
  return fs.readdirSync(`${process.cwd()}/content/posts`).map(f => ({ filename: f }));
}

function getSortedPosts() {
  const posts = getPostsFolders()
    .map(({ filename }) => {
      const md = fs.readFileSync(`content/posts/${filename}`).toString();
      const { data, excerpt } = matter(md);
      const slug = filename.replace('.md', '');
      return { slug, data, excerpt };
    })
    .filter(p => !p.data.draft)
    .sort((a, b) => new Date(b.data.date) - new Date(a.data.date))
    .map(({ data, ...rest }) => ({
      ...rest,
      frontmatter: {
        ...data,
        date: getFormattedDate(data.date),
      },
    }));
  return posts;
}

const siteUrl = 'https://soubai.me';
const siteTitle = "Soubai's stories";
const siteDescription = 'A Software engineer (interested in cloud computing and distributed systems.) with a passion for building software that improves the world.';

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateFeed() {
  const posts = getSortedPosts();
  const items = posts.map(post => `
    <item>
      <title>${escapeXml(post.frontmatter.title || '')}</title>
      <link>${siteUrl}/post/${post.slug}/</link>
      <guid>${siteUrl}/post/${post.slug}/</guid>
      <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.frontmatter.description || post.excerpt || '')}</description>
      ${post.frontmatter.category ? `<category>${escapeXml(post.frontmatter.category)}</category>` : ''}
    </item>`).join('\n');

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteTitle)}</title>
    <link>${siteUrl}/</link>
    <description>${escapeXml(siteDescription)}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  const outputPath = path.join(__dirname, '../public/feed.xml');
  fs.writeFileSync(outputPath, feed);
  console.log('✅ RSS feed generated at public/feed.xml');
}

if (require.main === module) {
  generateFeed();
}

module.exports = { generateFeed };
```

- [ ] **Step 2: Update package.json**

Add `node scripts/generate-feed.js &&` to the `prebuild` script:

```json
"prebuild": "node scripts/generate-feed.js && node scripts/update-oss.js && node scripts/build-search.js"
```

- [ ] **Step 3: Add RSS link tags to layout.tsx**

Add inside the `<head>` area (in the metadata export or as link tags). In Next.js App Router, add to the `metadata` export or use `next/head`:

```ts
// Add to the existing metadata export in app/layout.tsx
export const metadata: Metadata = {
  ...existingMetadata,
  alternates: {
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
}
```

Wait — Next.js `metadata` `alternates.types` adds `<link>` tags. Let me verify this is the right approach. Yes, `metadata.alternates.types` is the standard way in App Router.

---

### Task 3: Slugify Utility

**Files:**
- Create: `utils/slugify.ts`

- [ ] **Step 1: Create slugify utility**

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

---

### Task 4: ToC Extraction Utility

**Files:**
- Create: `utils/extract-toc.ts`

- [ ] **Step 1: Create ToC extraction utility**

```ts
import { slugify } from './slugify';

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

---

### Task 5: ArticleTOC Component

**Files:**
- Create: `components/ArticleTOC.tsx`

- [ ] **Step 1: Create the ToC component**

```tsx
'use client';

import { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function ArticleTOC({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav>
      <h4 className="text-sm font-semibold terminal-accent font-mono mb-3 uppercase tracking-wider">
        Contents
      </h4>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block text-sm py-1 transition-colors duration-200 border-l-2 pl-3 ${
                activeId === item.id
                  ? 'border-terminal-accent text-terminal-accent font-medium'
                  : 'border-transparent terminal-text/60 hover:terminal-text/80 hover:border-terminal-text/30'
              }`}
              style={{ paddingLeft: `${0.75 + (item.level - 1) * 0.75}rem` }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                history.pushState(null, '', `#${item.id}`);
              }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

---

### Task 6: Update Blog Post Page

**Files:**
- Modify: `app/post/[slug]/page.tsx`

- [ ] **Step 1: Add imports and extraction**

```tsx
import { getReadTime } from 'utils/read-time';
import { extractToc } from 'utils/extract-toc';
import { slugify } from 'utils/slugify';
import ArticleTOC from 'components/ArticleTOC';
```

- [ ] **Step 2: Add ToC extraction and reading time in the component**

```tsx
const tocItems = extractToc(post.content);
const readTime = getReadTime(post.content);
```

- [ ] **Step 3: Add reading time display in header, after the date**

- [ ] **Step 4: Modify heading renderers to add anchor IDs**

For each heading (h1, h2, h3, h4) in the ReactMarkdown `components`, add an `id` attribute with the slugified text.

- [ ] **Step 5: Add two-column layout with ToC sidebar**

---

### Task 7: Update Home Page

**Files:**
- Modify: `app/HomePage.tsx`

- [ ] **Step 1: Add reading time to post cards**

---

### Task 8: Build and Verify

- [ ] **Step 1: Run typecheck**

```bash
npm run typecheck
```

- [ ] **Step 2: Run build**

```bash
npm run build
```

- [ ] **Step 3: Start dev server and verify**

```bash
npm run dev
```

Check `/feed.xml`, reading time on home page and posts, ToC on posts.
