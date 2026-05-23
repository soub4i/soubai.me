const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const siteUrl = 'https://soubai.me';
const siteTitle = "Soubai's stories";
const siteDescription = "A Software engineer (interested in cloud computing and distributed systems.) with a passion for building software that improves the world.";

function getFormattedDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function getPostsFolders() {
  const postsFolders = fs
    .readdirSync(`${process.cwd()}/content/posts`)
    .map((folderName) => ({
      filename: `${folderName}`,
    }));

  return postsFolders;
}

function getSortedPosts() {
  const postFolders = getPostsFolders();
  const posts = postFolders
    .map(({ filename }) => {
      const markdownWithMetadata = fs
        .readFileSync(`content/posts/${filename}`)
        .toString();

      const { data, excerpt } = matter(markdownWithMetadata);
      const slug = filename.replace('.md', '');

      return { slug, data, excerpt };
    })
    .filter(post => !post.data.draft)
    .sort(
      (a, b) => new Date(b.data.date) - new Date(a.data.date)
    )
    .map(({ data, ...rest }) => ({
      ...rest,
      frontmatter: {
        ...data,
        date: getFormattedDate(data.date),
      },
    }));

  return posts;
}

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateFeed() {
  try {
    const posts = getSortedPosts();

    const items = posts
      .map(
        (post) => `
    <item>
      <title>${escapeXml(post.frontmatter.title || '')}</title>
      <link>${siteUrl}/post/${post.slug}/</link>
      <guid>${siteUrl}/post/${post.slug}/</guid>
      <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.frontmatter.description || post.excerpt || '')}</description>
      ${post.frontmatter.category ? `<category>${escapeXml(post.frontmatter.category)}</category>` : ''}
    </item>`
      )
      .join('\n');

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
  } catch (error) {
    console.error('❌ Failed to generate RSS feed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  generateFeed();
}

module.exports = { generateFeed };
