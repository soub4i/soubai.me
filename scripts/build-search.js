const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

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

      const { data, excerpt, content } = matter(markdownWithMetadata);

      const frontmatter = {
        ...data,
        date: getFormattedDate(data.date),
      };

      const slug = filename.replace('.md', '');

      return {
        slug,
        frontmatter,
        excerpt,
        content,
      };
    })
    .filter(post => !post.frontmatter.draft)
    .sort(
      (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
    );

  return posts;
}

function getTalksFolders() {
  const postsFolders = fs
    .readdirSync(`${process.cwd()}/content/talks`)
    .map((folderName) => ({
      filename: `${folderName}`,
    }));

  return postsFolders;
}

function getSortedTalks() {
  const talkFolders = getTalksFolders();
  const talks = talkFolders
    .map(({ filename }) => {
      const markdownWithMetadata = fs
        .readFileSync(`content/talks/${filename}`)
        .toString();

      const { data } = matter(markdownWithMetadata);

      const frontmatter = {
        ...data,
        date: getFormattedDate(data.date),
      };

      const slug = filename.replace('.md', '');

      return {
        slug,
        frontmatter,
      };
    })
    .filter(talk => !talk.frontmatter.draft)
    .sort(
      (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
    );

  return talks;
}

function generateSearchIndex() {
  const posts = getSortedPosts().map(post => ({
    type: 'post',
    slug: post.slug,
    title: post.frontmatter.title,
    description: post.excerpt,
    tags: post.frontmatter.tags || [],
    date: post.frontmatter.date,
    category: post.frontmatter.category || 'post',
    content: post.content,
  }));

  const talks = getSortedTalks().map(talk => ({
    type: 'talk',
    slug: talk.slug,
    title: talk.frontmatter.title,
    description: talk.frontmatter.description,
    tags: talk.frontmatter.tags || [],
    date: talk.frontmatter.date,
    category: 'talk',
    content: '',
  }));

  return [...posts, ...talks];
}

function buildSearchIndex() {
  try {
    const searchIndex = generateSearchIndex();
    const outputPath = path.join(__dirname, '../public/search-index.json');

    fs.writeFileSync(outputPath, JSON.stringify(searchIndex, null, 2));
    console.log('✅ Search index generated successfully');
  } catch (error) {
    console.error('❌ Failed to generate search index:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  buildSearchIndex();
}

module.exports = { generateSearchIndex, buildSearchIndex };