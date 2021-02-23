import { PostInterface } from "../pages/posts/post.interface";

export interface PostsState {
  posts: PostInterface[];
  selectedPost: PostInterface;
}

export const emptyPost: PostInterface = {
  id: "",
  title: "",
  body: "",
};

export const postsInitialState: PostsState = {
  posts: [],
  selectedPost: emptyPost,
};
