import { createEpicMiddleware } from "redux-observable";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { postsReducer } from "./post.reducers";
import { rootEpic } from "./posts.epic";

const epicMiddleware = createEpicMiddleware();

export function configureStore() {
  const store = createStore(
    postsReducer,
    composeWithDevTools(applyMiddleware(epicMiddleware))
  );

  epicMiddleware.run(rootEpic);

  return store;
}
