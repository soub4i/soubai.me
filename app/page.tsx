import { getSortedPosts } from "utils/posts";
import HomePage from "./HomePage";

export default async function Home() {
  const posts = getSortedPosts();

  return <HomePage posts={posts} />;
}

export async function generateMetadata() {
  return {
    title: "Home",
  };
}