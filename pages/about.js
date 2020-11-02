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


  return (
    <Layout>
      <SEO title="Talks" />
      <Bio className="my-14" />

      <div>

        <p className="mb-6">
          Abderrahim SOUBAI-ELIDRISSI full stack JavaScript developer. I’m very interested in web Technologies & cloud computing & problem solving.

</p>

        <ul className="mb-6">
          <li>I’m CTO @<Link href="https://geekhub.ma/"><a target="_blank">Geekhub</a></Link>
          </li>
          <li>Facebook developer cricle co-lead Marrakech (<Link href="https://web.facebook.com/groups/DevC.Marrakech"> 
          <a target="_blank">Group</a>
          </Link>)
</li>
          <li>Currently I’m working for PULSE.digital as a Technical lead | Cloud Architect.
        
          </li>

        </ul> 
        
        <p className="mb-6">
        <small>For business inquiries feel free to get in touch with me on <Link href="https://www.linkedin.com/in/soubai/"><a target="_blank">Linkedin</a></Link>
            </small>

        </p>
        
         </div>


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
