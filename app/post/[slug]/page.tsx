import { getPostBySlug } from "utils/posts";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "components/Image";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import SocialShare from "components/SocialShare";
import { getReadTime } from 'utils/read-time';
import { extractToc } from 'utils/extract-toc';
import { slugify } from 'utils/slugify';
import ArticleTOC from 'components/ArticleTOC';



interface PostPageProps {
  params: {
    slug: string;
  };
}

interface Frontmatter {
  title?: string;
  description?: string;
  date: string;
  socialImage?: string;
  category?: string;
  tags?: string[];
  draft?: boolean;
}

interface PostData {
  frontmatter: Frontmatter;
  post: {
    content: string;
    excerpt?: string;
  };
  previousPost?: {
    slug: string;
    frontmatter: Frontmatter;
  };
  nextPost?: {
    slug: string;
    frontmatter: Frontmatter;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const postData: PostData | undefined = getPostBySlug(params.slug);

  if (!postData) {
    notFound();
  }

  const { frontmatter, post, previousPost, nextPost } = postData;
  const tocItems = extractToc(post.content);
  const readTime = getReadTime(post.content);

  return (
    <div className="max-w-4xl lg:max-w-6xl mx-auto px-3 md:px-4 py-6 md:py-8">
      <article className="terminal-window p-4 md:p-6">
        <div className="flex items-center gap-2 mb-6">
          <span className="command-prompt">soubai@terminal:~$</span>
          <span className="text-terminal-text">cat posts/{params.slug}.md</span>
        </div>

        <header className="mb-8">
          {frontmatter.socialImage && (
            <Image
              alt={frontmatter.title}
              src={`/${frontmatter.socialImage}`}
              webpSrc={`/${frontmatter.socialImage}?webp`}
              previewSrc={`/${frontmatter.socialImage}?lqip-colors`}
              className="w-full rounded mb-6"
            />
          )}

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="terminal-accent/80 text-sm">📅</span>
              <span className="terminal-accent font-medium">{frontmatter.date}</span>
            </div>

            {frontmatter.category && (
              <>
                <span className="terminal-text/40">•</span>
                <div className="flex items-center gap-2">
                  <span className="terminal-accent/80 text-sm">🏷️</span>
                  <span className="terminal-accent bg-terminal-accent/10 px-3 py-1 rounded-full text-sm font-medium border border-terminal-accent/30">
                    {frontmatter.category}
                  </span>
                </div>
              </>
            )}

            {frontmatter.tags && frontmatter.tags.length > 0 && (
              <>
                <span className="terminal-text/40">•</span>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="terminal-accent/80 text-sm">🏷️</span>
                  {frontmatter.tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="terminal-text bg-terminal-bg/60 px-2 py-1 rounded-md text-xs font-medium border border-terminal-accent/20"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </>
            )}
            <span className="terminal-text/40">•</span>
            <span className="terminal-accent/80 text-sm">📖</span>
            <span className="terminal-accent font-medium">{readTime} min read</span>
          </div>

          <h1 className="text-3xl font-bold mb-4 terminal-accent font-mono">
            {frontmatter.title}
          </h1>

          {frontmatter.description && (
            <p className="text-lg terminal-text/80">{frontmatter.description}</p>
          )}
        </header>

        <div className="flex gap-8">
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-24">
              <ArticleTOC items={tocItems} />
            </div>
          </aside>
          <div className="flex-1 min-w-0">
            <div className="lg:hidden mb-6">
              <details className="terminal-window p-3">
                <summary className="terminal-accent font-mono text-sm cursor-pointer select-none">Contents</summary>
                <div className="mt-3">
                  <ArticleTOC items={tocItems} />
                </div>
              </details>
            </div>
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={oneDark}
                      language={match[1]}
                      PreTag="div"
                      className="rounded-lg border border-terminal-accent/30 my-4"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={`${className} terminal-accent bg-terminal-bg/70 px-2 py-1 rounded-md text-sm border border-terminal-accent/30 font-semibold`} {...props}>
                      {children}
                    </code>
                  );
                },
                h1: ({ children, ...props }) => {
                  const id = slugify(String(children));
                  return <h1 id={id} className="text-2xl md:text-3xl lg:text-4xl font-black mb-6 md:mb-8 terminal-accent border-b-2 border-terminal-accent/60 pb-3 md:pb-4 tracking-tight leading-tight font-mono">
                    {children}
                  </h1>
                },
                h2: ({ children, ...props }) => {
                  const id = slugify(String(children));
                  return <h2 id={id} className="text-2xl md:text-3xl font-bold mb-4 terminal-accent border-b border-terminal-accent/40 pb-2 mt-10 leading-tight font-mono">
                    {children}
                  </h2>
                },
                h3: ({ children, ...props }) => {
                  const id = slugify(String(children));
                  return <h3 id={id} className="text-xl md:text-2xl font-bold mb-3 terminal-accent border-l-4 border-terminal-accent/50 pl-3 md:pl-4 bg-terminal-accent/5 py-2 leading-tight font-mono">
                    {children}
                  </h3>
                },
                h4: ({ children, ...props }) => {
                  const id = slugify(String(children));
                  return <h4 id={id} className="text-lg md:text-xl font-semibold mb-3 terminal-accent underline decoration-terminal-accent/60 underline-offset-4 leading-tight font-mono">
                    {children}
                  </h4>
                },
                p: ({ children }) => <p className="mb-5 terminal-text leading-relaxed text-base md:text-lg font-sans">{children}</p>,
                ul: ({ children }) => <ul className="mb-6 ml-4 md:ml-8 terminal-text space-y-1 list-disc list-inside leading-relaxed font-sans">{children}</ul>,
                ol: ({ children }) => <ol className="mb-6 ml-4 md:ml-8 terminal-text space-y-1 list-decimal list-inside leading-relaxed font-sans">{children}</ol>,
                li: ({ children }) => <li className="terminal-text leading-relaxed font-sans">{children}</li>,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-terminal-accent pl-8 italic terminal-text/90 my-8 bg-terminal-accent/10 p-6 rounded-lg border-terminal-accent/30 font-sans">
                    {children}
                  </blockquote>
                ),
                a: ({ href, children }) => (
                  <a href={href} className="terminal-accent hover:underline hover:terminal-text transition-all duration-200 font-medium" target="_blank" rel="noopener noreferrer">
                    {children}
                  </a>
                ),
                strong: ({ children }) => <strong className="font-bold terminal-accent">{children}</strong>,
                em: ({ children }) => <em className="italic terminal-text/80 font-medium">{children}</em>,
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>

        <div className="mt-12">
          <SocialShare
            url={`/post/${params.slug}`}
            title={frontmatter.title || 'Untitled Post'}
            description={frontmatter.description || post.excerpt}
            hashtags={frontmatter.tags}
          />
        </div>

        <footer className="mt-12 pt-8 border-t border-terminal-border/30">
          <nav className="flex justify-between items-center">
            {previousPost && (
              <Link
                href={`/post/${previousPost.slug}`}
                className="terminal-accent hover:terminal-text transition-colors font-mono"
              >
                ← {previousPost.frontmatter.title}
              </Link>
            )}

            {nextPost && (
              <Link
                href={`/post/${nextPost.slug}`}
                className="terminal-accent hover:terminal-text transition-colors font-mono ml-auto"
              >
                {nextPost.frontmatter.title} →
              </Link>
            )}
          </nav>
        </footer>
      </article>
    </div>
  );
}

export async function generateMetadata({ params }: PostPageProps) {
  const postData: PostData | undefined = getPostBySlug(params.slug);

  if (!postData) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: postData.frontmatter.title || 'Untitled Post',
    description: postData.frontmatter.description || postData.post.excerpt,
  };
}

export async function generateStaticParams() {
  // Generate static params for all posts
  const posts = await import("utils/posts").then(m => m.getSortedPosts());

  return posts.map((post) => ({
    slug: post.slug,
  }));
}