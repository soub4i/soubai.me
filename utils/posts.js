import matter from "gray-matter";
import fs from "fs";
import { getFormattedDate } from "utils/helpers";

export function getPostsFolders() {
  // Get all posts folders located in `content/posts`
  const postsFolders = fs
    .readdirSync(`${process.cwd()}/content/posts`)
    .map((folderName) => ({
      // directory: folderName,
      filename: `${folderName}`,
    }));

  return postsFolders;
}

export function getSortedPosts() {
  const postFolders = getPostsFolders();
  const posts = postFolders
    .map(({ filename }) => {
      const markdownWithMetadata = fs
        .readFileSync(`content/posts/${filename}`)
        .toString();

      const { data, excerpt, content } = matter(markdownWithMetadata);
      const slug = filename.replace(".md", "");

      return { slug, data, excerpt, content };
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
    }))

  return posts;
}

export function getPostsSlugs() {
  const postFolders = getPostsFolders();

  const paths = postFolders.map(({ filename }) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return paths;
}

export function getPostBySlug(slug) {
  const posts = getSortedPosts();

  const postIndex = posts.findIndex(({ slug: postSlug }) => postSlug === slug);

  if (postIndex === -1) return undefined;

  const { frontmatter, content, excerpt } = posts[postIndex];

  const previousPost = posts[postIndex + 1];
  const nextPost = posts[postIndex - 1];

  return { frontmatter, post: { content, excerpt }, previousPost, nextPost };
}
