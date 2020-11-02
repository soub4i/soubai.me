import matter from "gray-matter";
import fs from "fs";

export function getTalksFolders() {
  // Get all posts folders located in `content/posts`
  const postsFolders = fs
    .readdirSync(`${process.cwd()}/content/talks`)
    .map((folderName) => ({
      // directory: folderName,
      filename: `${folderName}`,
    }));

  return postsFolders;
}

function getFormattedDate(date) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate;
}
export function getSortedTalks() {
  const talkFolders = getTalksFolders();
  const talks = talkFolders
    .map(({ filename }) => {
      // Get raw content from file
      const markdownWithMetadata = fs
        .readFileSync(`content/talks/${filename}`)
        .toString();

      // Parse markdown, get frontmatter data, excerpt and content.
      const { data } = matter(markdownWithMetadata);

      const frontmatter = {
        ...data,
        date: getFormattedDate(data.date),

      };

      // Remove .md file extension from post name
      const slug = filename.replace(".md", "");

      return {
        slug,
        frontmatter,
      };
    })
    .filter(talk => !talk.frontmatter.draft)
    .sort(
      (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
    )

  return talks;
}

export function getTalksSlugs() {
  const talkFolders = getTalksFolders();

  const paths = talkFolders.map(({ filename }) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return paths;
}

export function getTalkBySlug(slug) {
  const talks = getSortedTalks();

  const postIndex = talks.findIndex(({ slug: postSlug }) => postSlug === slug);


  const { frontmatter, content, excerpt } = talks[postIndex];

  const previousPost = talks[postIndex + 1];
  const nextPost = talks[postIndex - 1];

  return { frontmatter, talk: { content, excerpt }, previousPost, nextPost };
}
