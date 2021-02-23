import { useEffect } from "react";
import { MainLayout } from "../../components/main-layout/main-layout";
import { PostInterface } from "./post.interface";
import { NextPageContext } from "next";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../store/post.actions";
import { PostsState } from "../../store/posts.state";
import { PostRow } from "../../components/post-row/post-row";
import styles from "./posts.module.scss";

export default function Posts() {
  const posts = useSelector<PostsState, PostInterface[]>(({ posts }) => posts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchPosts());
    }
  }, []);

  if (!posts) {
    return (
      <MainLayout title="Loading...">
        <p>Loading ...</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Posts">
      <h1>Posts Page</h1>
      <table className={styles.table}>
        {posts.map((post) => (
          <PostRow post={post} key={post.id} />
        ))}
      </table>
    </MainLayout>
  );
}

Posts.getInitialProps = async ({ req }: NextPageContext) => {
  if (!req) {
    return { posts: [] };
  }

  const response = await fetch(`${process.env.API_URL}/posts`);
  const posts: PostInterface[] = await response.json();

  return {
    posts,
  };
};
