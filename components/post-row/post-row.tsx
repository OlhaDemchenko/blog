import { FC } from "react";
import Link from "next/link";
import { AiFillDelete } from "react-icons/ai";

import { PostInterface } from "../../pages/posts/post.interface";
import styles from "./post-row.module.scss";
import { useDispatch } from "react-redux";
import { deletePost } from "../../store/post.actions";

interface Props {
  post: PostInterface;
}

export const PostRow: FC<Props> = ({ post }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deletePost(post.id));
  };

  return (
    <tr className={styles.root}>
      <td>
        <Link href={`/posts/[id]`} as={`/posts/${post.id}`}>
          <a className={styles.link}>{post.title}</a>
        </Link>
      </td>
      <td className={styles.delete}>
        <AiFillDelete className={styles.icon} onClick={handleDelete} />
      </td>
    </tr>
  );
};
