import React, { Fragment, useRef, useContext, useState } from 'react';
import styles from './CommentForm.module.css';
import Button from '../UI/Button';
import AuthContext from '../../store/auth-context';

const CommentForm = ({ onClose, onAddComment, bookId }) => {
  const textAreaRef = useRef();
  const { email } = useContext(AuthContext);
  const [error, setError] = useState('');

  const addCommentHandler = (event) => {
    event.preventDefault();
    if (textAreaRef.current.value.trim().length <= 0) {
      setError('You need to enter a comment.');
      return;
    } else {
      setError('');
      fetch(
        `https://bookclub-b44e0-default-rtdb.europe-west1.firebasedatabase.app/users.json?orderBy="email"&equalTo="${email}"`,
      )
        .then((response) => response.json())
        .then((data) => {
          let newComment;
          for (const key in data) {
            newComment = {
              userEmail: data[key].email,
              avatar: data[key].avatar,
              userName: data[key].userName,
              date: Date.parse(new Date()) / 1000,
              text: textAreaRef.current.value,
            };
          }
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
      <h1>Add New Comment</h1>
      <form onSubmit={addCommentHandler}>
        <textarea
          className={styles.textarea}
          ref={textAreaRef}
          placeholder="Enter your comment here..."
        ></textarea>
        <div className={styles.action}>
          <Button type="submit" onClick={() => {}} extraClass="button--primary">
            Change
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