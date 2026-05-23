import matter from "gray-matter";
import fs from "fs";
import { getFormattedDate } from "utils/helpers";

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


export function getSortedTalks() {
  const talkFolders = getTalksFolders();
  const talks = talkFolders
    .map(({ filename }) => {
      const markdownWithMetadata = fs
        .readFileSync(`content/talks/${filename}`)
        .toString();

      const { data } = matter(markdownWithMetadata);
      const slug = filename.replace(".md", "");

      return { slug, data };
    })
    .filter(talk => !talk.data.draft)
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

  const talkIndex = talks.findIndex(({ slug: talkSlug }) => talkSlug === slug);

  if (talkIndex === -1) return undefined;

  const { frontmatter } = talks[talkIndex];

  const previousTalk = talks[talkIndex + 1];
  const nextTalk = talks[talkIndex - 1];

  return { frontmatter, previousTalk, nextTalk };
}
