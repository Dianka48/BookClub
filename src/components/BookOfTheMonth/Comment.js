import { useContext } from 'react';
import styles from './Comment.module.css';
import AuthContext from '../../store/auth-context';
import Button from '../UI/Button';
import BookDate from '../UI/BookDate';

/**
 * @returns single comment with user avatar, user name, text and date
 */

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

  // Deletes the comment from DB
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
    <div className={styles.comment}>
      <BookDate timestamp={date} time={true} />
      <div className={styles.userName}>
        <p>{userName}</p>
        {/* Delete button is rendered only for user's own comments */}
        {email === userEmail && (
          <div className={styles.button}>
            <Button onClick={deleteCommentHandler} extraClass="button--medium">
              Delete
            </Button>
          </div>
        )}
      </div>
      <div className={styles.commentContent}>
        <img src={avatarImage.default} alt="avatar" className={styles.avatar} />
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Comment;
