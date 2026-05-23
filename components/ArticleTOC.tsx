'use client';

import { useEffect, useState } from 'react';
import type { TocItem } from '@/utils/extract-toc';

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
