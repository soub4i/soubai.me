'use client';

import Link from "next/link";
import { useEffect, useState, useRef } from 'react';
import { getSiteMetaData } from "utils/helpers";
import Image from "components/Image";
import { getReadTime } from "utils/read-time";

interface Post {
  slug: string;
  frontmatter: {
    title?: string;
    description?: string;
    date: string;
    socialImage?: string;
    category?: string;
    tags?: string[];
    draft?: boolean;
  };
  excerpt?: string;
  content: string;
}

interface HomePageProps {
  posts: Post[];
}

export default function HomePage({ posts }: HomePageProps) {
  const siteMetadata = getSiteMetaData();
  const { postPerPage } = siteMetadata;
  const [postList, setPostList] = useState(posts.slice(0, postPerPage));
  const [page, setPage] = useState(1);
  const loader = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 1.0
    });
    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (page === 1) return;
    const newItems = [...posts].slice(0, page * postPerPage);
    setPostList([...newItems]);
  }, [page, posts, postPerPage]);

  const handleObserver = (entities: IntersectionObserverEntry[]) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setPage((page) => page + 1);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pb-8">
      <div className="space-y-12">
        {postList.map(({ frontmatter, slug, content }) => (
          <article key={slug} className="border-2 rounded-xl p-8 bg-terminal-bg-secondary dark:bg-terminal-bg hover:bg-terminal-bg-secondary/80 dark:hover:bg-terminal-bg-secondary transition-all duration-300 shadow-lg hover:shadow-xl border-terminal-border dark:border-terminal-accent/30">
            <header className="mb-6">
              {frontmatter.socialImage && (
                <Image
                  alt={frontmatter.title || 'Post image'}
                  src={`/${frontmatter.socialImage}`}
                  webpSrc={`/${frontmatter.socialImage}?webp`}
                  previewSrc={`/${frontmatter.socialImage}?lqip-colors`}
                   className="w-full max-w-lg h-56 object-cover rounded-lg mb-6 mx-auto shadow-lg border-2 border-terminal-border dark:border-terminal-accent/30 hover:border-terminal-accent dark:hover:border-terminal-accent transition-all duration-300"
                />
              )}
               <div className="flex flex-wrap items-center gap-4 mb-6">
                 <div className="flex items-center gap-2">
                   <span className="text-amber-600 dark:text-amber-400 text-xs">📅</span>
                     <span className="text-terminal-text-secondary text-xs font-medium">{frontmatter.date}</span>
                  </div>
                  <span className="text-terminal-text-secondary text-xs">•</span>
                  <span className="text-terminal-text-secondary text-xs">{getReadTime(content)} min read</span>

                 {frontmatter.category && (
                   <>
                      <span className="text-terminal-text-secondary text-xs">•</span>
                     <div className="flex items-center gap-2">
                       <span className="text-amber-600 dark:text-amber-400 text-xs">🏷️</span>
                        <span className="bg-terminal-accent/10 dark:bg-terminal-accent/20 text-terminal-accent px-2 py-1 rounded-full text-xs font-semibold border border-terminal-accent/30 dark:border-terminal-accent/50">
                         {frontmatter.category}
                       </span>
                     </div>
                   </>
                 )}

                 {frontmatter.tags && frontmatter.tags.length > 0 && (
                   <>
                      <span className="text-terminal-text-secondary text-xs">•</span>
                     <div className="flex flex-wrap items-center gap-2">
                       <span className="text-amber-600 dark:text-amber-400 text-xs">🏷️</span>
                       {frontmatter.tags.map((tag: string, index: number) => (
                         <span
                           key={index}
                           className="bg-terminal-bg-secondary dark:bg-terminal-accent/10 text-terminal-text-secondary dark:text-terminal-accent px-1.5 py-0.5 rounded text-xs font-medium border border-terminal-border dark:border-terminal-accent/30"
                         >
                           #{tag}
                         </span>
                       ))}
                     </div>
                   </>
                 )}
              </div>

              <Link href={`/post/${slug}`}>
                <h3 className="text-xl font-bold terminal-text hover:terminal-accent cursor-pointer transition-colors">
                  {frontmatter.title || 'Untitled Post'}
                </h3>
              </Link>
            </header>
            <section>
              <p className="text-terminal-text-secondary leading-relaxed text-lg">{frontmatter.description || 'No description available'}</p>
            </section>
          </article>
        ))}
      </div>

      {posts.length >= postPerPage * page && (
        <div className="loading text-center py-8" ref={loader}>
          <small className="terminal-text animate-pulse">Loading ...</small>
        </div>
      )}
    </div>
  );
}