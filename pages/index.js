import Link from "next/link";

import Layout from "components/Layout";
import Bio from "components/Bio";
import SEO from "components/Seo";
import { getSortedPosts } from "utils/posts";
import Image from "components/Image";

export default function Home({ posts }) {
  return (
    <Layout>
      <SEO title="All posts" />
      <Bio className="my-14" />
      {posts.map(({ frontmatter: { title, description, date, socialImage, category, tags }, slug }) => (
        <article className="mb-14" key={slug}>
          <header className="mb-2">

            {socialImage ? <Image
              alt={title}
              src={require(`../content/assets/${socialImage}`)}
              webpSrc={require(`../content/assets/${socialImage}?webp`)}
              previewSrc={require(`../content/assets/${socialImage}?lqip-colors`)}
              className="w-full"
            /> : ''}
            <h3 className="mb-2">


              <div className="mt-2">


              </div>
              <span className="mr-2 text-sm">{date}</span>
              <Link href="/"><a className="" href="#">{category}</a></Link>

              <div>

                <Link href={"/post/[slug]"} as={`/post/${slug}`}>
                  <a className="text-4xl font-bold text-orange-600 font-display">
                    {title}
                  </a>
                </Link>
              </div>

            </h3>
          </header>
          <section>
            <p className="mb-8 text-lg">{description}</p>
          </section>
        </article>
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = getSortedPosts();

  return {
    props: {
      posts,
    },
  };
}
