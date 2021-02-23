import Link from "next/link";
import { Provider } from "react-redux";

import { MainLayout } from "../components/main-layout/main-layout";
import { store } from "./_app";
import styles from "./home.module.scss";

export default function Home() {
  return (
    <Provider store={store}>
      <MainLayout title="Home Page">
        <h1>Simple blog are waiting for you!</h1>
        <div className={styles.sections}>
          <section>
            <Link href={"/new-post"}>
              <a>New Post</a>
            </Link>
          </section>
          <section>
            <Link href="/posts">
              <a>Posts</a>
            </Link>
          </section>
        </div>
      </MainLayout>
    </Provider>
  );
}
