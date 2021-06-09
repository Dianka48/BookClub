import React, { Fragment, useRef, useContext, useState } from 'react';
import styles from './CommentForm.module.css';
import Button from '../UI/Button';
import AuthContext from '../../store/auth-context';

/**
 * @returns form for adding a new comment
 */

const CommentForm = ({ onClose, onAddComment, bookId, title }) => {
  const textAreaRef = useRef();
  const { email } = useContext(AuthContext);
  const [error, setError] = useState('');

  // Adds the comment to DB
  const addCommentHandler = (event) => {
    event.preventDefault();
    if (textAreaRef.current.value.trim().length <= 0) {
      setError('You need to enter a comment.');
      return;
    } else if (textAreaRef.current.value.trim().length > 450) {
      setError('Your comment is too long (max 450 characters).');
      return;
    } else {
      setError('');
      // fetches the current user name and avatar using user email
      fetch(
        `https://bookclub-b44e0-default-rtdb.europe-west1.firebasedatabase.app/users.json?orderBy="email"&equalTo="${email}"`,
      )
        .then((response) => response.json())
        .then((data) => {
          // Creates a new comment that will be added to DB
          let newComment;
          for (const key in data) {
            newComment = {
              userEmail: data[key].email,
              avatar: data[key].avatar,
              userName: data[key].userName,
              date: Date.now(),
              text: textAreaRef.current.value,
            };
          }
          // Adds a new comment to DB using bookID
          fetch(
            `https://bookclub-b44e0-default-rtdb.europe-west1.firebasedatabase.app/books/${bookId}/comments.json`,
            {
              method: 'POST',
              body: JSON.stringify(newComment),
              headers: {
                'Content-Type': 'application/json',
              },
            },
          )
            .then((_response) => onAddComment(newComment))
            .catch((err) => console.error(err.message));
        });
    }
  };

  return (
    <Fragment>
      <h1 className={styles.heading}>Add New Comment for {title}</h1>
      <form onSubmit={addCommentHandler}>
        <div className={styles.textarea}>
          <textarea
            ref={textAreaRef}
            placeholder="Enter your comment here..."
          ></textarea>
        </div>
        <div className={styles.action}>
          <Button type="submit" onClick={() => {}} extraClass="button--primary">
            Add Comment
          </Button>
          <Button
            type="button"
            onClick={onClose}
            extraClass="button--secondary"
          >
            Cancel
          </Button>
        </div>
        {error && <div className={styles.error}>{error}</div>}
      </form>
    </Fragment>
  );
};

export default CommentForm;
