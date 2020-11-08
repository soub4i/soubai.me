import matter from "gray-matter";
import fs from "fs";

export function getProjects() {
    const filename = 'github.md'

    const markdownWithMetadata = fs
        .readFileSync(`content/oss/${filename}`)
        .toString();

    const { data } = matter(markdownWithMetadata);

    // Remove .md file extension from post name
    const slug = filename.replace(".md", "");

    return {
        ...data,
        slug
    };

}
