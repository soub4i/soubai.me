import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { getSiteMetaData } from "utils/helpers";

import Layout from "components/Layout";
import Bio from "components/Bio";
import SEO from "components/Seo";
import SocialFollow from "components/SocialFollow";
import { getSortedTalks } from "utils/talks";

export default function Home({ talks }) {
  const siteMetadata = getSiteMetaData();

  return (
    <Layout>
      <SEO title="About" />
      <Bio className="my-14" />

      <div>
        <p className="mb-6">{siteMetadata.about}</p>

        <ul className="mb-6">
          <li>
            Host of{" "}
            <Link href="https://s7aba.ma">
              <a target="_blank">S7aba podcast</a>
            </Link>
          </li>

          <li>
            Facebook developer cricle co-lead Marrakech (
            <Link href="https://web.facebook.com/groups/DevC.Marrakech">
              <a target="_blank">Group</a>
            </Link>
            )
          </li>
        </ul>

        <p className="mb-6">
          <small>
            For business inquiries feel free to get in touch with me on{" "}
            <Link href="https://www.linkedin.com/in/soubai/">
              <a target="_blank">Linkedin</a>
            </Link>
          </small>
        </p>
      </div>

      <SocialFollow links={siteMetadata.social} />
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
