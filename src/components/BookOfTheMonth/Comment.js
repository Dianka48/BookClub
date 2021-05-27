import { useContext, Fragment } from 'react';
import styles from './Comment.module.css';
import AuthContext from '../../store/auth-context';
import Button from '../UI/Button';

const Comment = ({
  commentId,
  text,
  userEmail,
  userName,
  date,
  avatar,
  onDeleteComment,
  bookId,
}) => {
  const { email } = useContext(AuthContext);

  const deleteCommentHandler = () => {
    fetch(
      `https://bookclub-b44e0-default-rtdb.europe-west1.firebasedatabase.app/books/${bookId}/comments.json`,
      {
        method: 'PATCH',
        body: JSON.stringify({ [commentId]: null }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then((_response) =>
        onDeleteComment({
          type: 'delete',
          commentId: commentId,
          bookId: bookId,
        }),
      )
      .catch((err) => console.error(err.message));
  };

  return (
    <Fragment>
      <h2>Comment {date}</h2>
      {email === userEmail && (
        <div className={styles.button}>
          <Button onClick={deleteCommentHandler} extraClass="button--medium">
            Delete
          </Button>
        </div>
      )}
    </Fragment>
  );
};

export default Comment;
