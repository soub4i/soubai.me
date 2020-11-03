import Link from "next/link";
import { useEffect, useState, useRef } from 'react';
import { getSiteMetaData } from "utils/helpers";

import Layout from "components/Layout";
import Bio from "components/Bio";
import SEO from "components/Seo";
import { getSortedPosts } from "utils/posts";
import Image from "components/Image";

export default function Home({ posts }) {

  const siteMetadata = getSiteMetaData();
  const { postPerPage } = siteMetadata;
  const [postList, setPostList] = useState(posts.slice(0, postPerPage));
  const [page, setPage] = useState(1);
  const loader = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 1.0
    });
    if (loader.current) {
      observer.observe(loader.current)
    }

  }, []);


  useEffect(() => {
    // here we simulate adding new posts to List
    if (page === 1) {
      return
    }
    const newItems = [...posts].slice(0, (page * postPerPage) - 1)
    setPostList([...newItems])
  }, [page])

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setPage((page) => page + 1)
    }
  }


  return (
    <Layout>
      <SEO title="All posts" />
      <Bio className="my-14" />
      {postList.map(({ frontmatter: { title, description, date, socialImage, category, tags }, slug }) => (
        <article className="mb-14" key={slug}>
          <header className="mb-6">

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
                  <a className="text-2xl font-bold text-orange-600 font-display">
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

      { posts.length >= postPerPage * page ? <div className="loading" ref={loader}>
        <small>Loading ...</small>
      </div> : ''}
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
