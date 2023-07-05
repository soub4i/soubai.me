import Document, { Head, Main, NextScript, Html } from "next/document";

import { getSiteMetaData } from "utils/helpers";

export default class MyDocument extends Document {
  render() {
    const siteMetadata = getSiteMetaData();

    return (
      <Html lang={siteMetadata.language}>
        <Head>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${siteMetadata.gaId}`}></script>
        <a rel="me" href="https://mastodon.social/@soubai">Mastodon</a>
<script
    dangerouslySetInnerHTML={{
      __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${siteMetadata.gaId}');
        `,
    }}
  />
        </Head>
        <body>
          <script src="noflash.js" />

          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
