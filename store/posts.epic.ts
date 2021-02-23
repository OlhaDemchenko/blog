import { combineEpics, ofType } from "redux-observable";
import {
  deletePostSuccess,
  fetchPost,
  fetchPosts,
  fetchPostsSuccess,
  fetchPostSuccess,
  newPostSuccess,
} from "./post.actions";
import { concatMap, map, mergeMap } from "rxjs/operators";
import { from } from "rxjs";
import axios from "axios";
import { PostInterface } from "../pages/posts/post.interface";

const fetchPostsEpic = (action$) =>
  action$.pipe(
    ofType("FETCH_POSTS"),
    mergeMap(() =>
      from(axios.get<PostInterface[]>("/posts")).pipe(
        map((response) => fetchPostsSuccess(response.data))
      )
    )
  );

const fetchPostEpic = (action$) =>
  action$.pipe(
    ofType("FETCH_POST"),
    mergeMap(({ payload }) =>
      from(axios.get<PostInterface>(`/posts/${payload}`)).pipe(
        map((response) => fetchPostSuccess(response.data))
      )
    )
  );

const newPostEpic = (action$) =>
  action$.pipe(
    ofType("NEW_POST"),
    mergeMap(({ payload }) =>
      from(axios.post<PostInterface>(`/posts`, payload)).pipe(
        concatMap((response) => [newPostSuccess(response.data), fetchPosts()])
      )
    )
  );

const deletePostEpic = (action$) =>
  action$.pipe(
    ofType("DELETE_POST"),
    mergeMap(({ payload }) =>
      from(axios.delete(`/posts/${payload}`)).pipe(
        concatMap(() => [deletePostSuccess(), fetchPosts()])
      )
    )
  );

export const rootEpic = combineEpics(
  fetchPostsEpic,
  fetchPostEpic,
  newPostEpic,
  deletePostEpic
);
