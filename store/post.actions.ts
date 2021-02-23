import { action, payload, union } from "ts-action";
import { PostInterface } from "../pages/posts/post.interface";
import { NewPostFormData } from "../pages/new-post";

export const fetchPosts = action("FETCH_POSTS");
export const fetchPostsSuccess = action(
  "FETCH_POSTS_SUCCESS",
  payload<PostInterface[]>()
);

export const fetchPost = action("FETCH_POST", payload<string>());
export const fetchPostSuccess = action(
  "FETCH_POST_SUCCESS",
  payload<PostInterface>()
);

export const newPost = action("NEW_POST", payload<NewPostFormData>());
export const newPostSuccess = action(
  "NEW_POST_SUCCESS",
  payload<PostInterface>()
);

export const deletePost = action("DELETE_POST", payload<string>());
export const deletePostSuccess = action("DELETE_POST_SUCCESS");
