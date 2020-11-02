import Link from "next/link";
import { useEffect, useState, useRef } from 'react';
import { getSiteMetaData } from "utils/helpers";

import Layout from "components/Layout";
import Bio from "components/Bio";
import SEO from "components/Seo";
import { getSortedTalks } from "utils/talks";
import Image from "components/Image";

export default function Home({ talks }) {

  const siteMetadata = getSiteMetaData();
  const { postPerPage } = siteMetadata;
  const [talkList, setTalkList] = useState(talks.slice(0, postPerPage));
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
    const newItems = [...talks].slice(0, (page * postPerPage) - 1)
    setTalkList([...newItems])
  }, [page])

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setPage((page) => page + 1)
    }
  }


  return (
    <Layout>
      <SEO title="Talks" />
      <Bio className="my-14" />
      {talkList.map(({ frontmatter: { title, description, conference, conferenceLink, socialImage, date, location, video, slide, demo }, slug }) => (
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
              <span className="mr-2 text-sm">{date}</span> -
              <Link href="/"><a className="" href={conferenceLink}>{conference}</a></Link> ({location})

              <div>

                <h2 className="text-4xl font-bold text-orange-600 font-display">
                  {title}
                </h2>
              </div>

            </h3>
          </header>
          <section>
            <p className="mb-8 text-lg">{description}</p>
          </section>
          {video && <div><Link href={video}><a className="" target="_blank">Video</a></Link></div>}
          {demo && <div><Link href={demo}><a className="" target="_blank">Demo</a></Link></div>}
          {slide && <div><Link target="_blank" href={slide}><a className="" target="_blank">Slides</a></Link></div>}

        </article>
      ))}

      { talks.length >= postPerPage * page ? <div className="loading" ref={loader}>
        <small>Loading ...</small>
      </div> : ''}
    </Layout>
  );
}

export async function getStaticProps() {
  const talks = getSortedTalks();

  return {
    props: {
      talks,
    },
  };
}
