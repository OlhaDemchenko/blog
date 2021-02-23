import { postsInitialState } from "./posts.state";
import { on, reducer } from "ts-action";
import { fetchPostsSuccess, fetchPostSuccess } from "./post.actions";

export const postsReducer = reducer(
  postsInitialState,
  on(fetchPostsSuccess, (state, { payload }) => ({ ...state, posts: payload })),
  on(fetchPostSuccess, (state, { payload }) => ({
    ...state,
    selectedPost: payload,
  }))
);
