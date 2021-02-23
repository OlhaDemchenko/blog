import { useEffect } from "react";
import { useRouter } from "next/router";
import { NextPageContext } from "next";
import { PostInterface } from "./post.interface";
import { MainLayout } from "../../components/main-layout/main-layout";
import { useDispatch, useSelector } from "react-redux";
import { emptyPost, PostsState } from "../../store/posts.state";
import { fetchPost } from "../../store/post.actions";
import styles from "./posts.module.scss";

interface Props {
  post: PostInterface;
}

export default function Post({ post: serverPost }: Props) {
  const post = useSelector<PostsState, PostInterface>(
    ({ selectedPost }) => selectedPost
  );
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (post === emptyPost || post.id !== router.query.id) {
      dispatch(fetchPost(router.query.id as string));
    }
  }, []);

  if (post === emptyPost) {
    return (
      <MainLayout title="Loading...">
        <p>Loading ...</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout title={post.title}>
      <h1>{post.title}</h1>
      <hr />
      <p>{post.body}</p>
      <button className={styles.backButton} onClick={() => router.back()}>
        Back to all posts
      </button>
    </MainLayout>
  );
}

interface PostNextPageContext extends NextPageContext {
  query: {
    id: string;
  };
}

Post.getInitialProps = async ({ query, req }: PostNextPageContext) => {
  if (!req) {
    return { post: emptyPost };
  }

  const response = await fetch(`${process.env.API_URL}/posts/${query.id}`);
  const post: PostInterface = await response.json();

  return {
    post,
  };
};
