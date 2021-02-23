import Link from "next/link";
import Head from "next/head";
import { FC } from "react";

import styles from "./main-layout.module.scss";

interface Props {
  title: string;
}

export const MainLayout: FC<Props> = ({ title = "Simple Blog", children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <nav className={styles.nav}>
        <Link href={"/"}>
          <a>Home</a>
        </Link>
        <Link href={"/new-post"}>
          <a>New Post</a>
        </Link>
        <Link href={"/posts"}>
          <a>Posts</a>
        </Link>
      </nav>
      <main className={styles.content}>{children}</main>
    </>
  );
};
