import { useContext, Fragment } from 'react';
import styles from './Comment.module.css';
import AuthContext from '../../store/auth-context';
import Button from '../UI/Button';
import BookDate from '../UI/BookDate';

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
  const avatarImage = require(`../../assets/avatars/${avatar}.png`);

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
      <BookDate timestamp={date} time={true} />
      <h2>{userName}</h2>

      <img src={avatarImage.default} alt="avatar" className={styles.avatar} />
      <p>{text}</p>
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
