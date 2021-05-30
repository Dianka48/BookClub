import React, { useEffect, useState, Fragment, useContext } from 'react';
import LoadingSpinner from '../UI/LoadingSpinner';
import Comment from './Comment';
import Button from '../UI/Button';
import CommentForm from './CommentForm';
import Modal from '../UI/Modal';
import AuthContext from '../../store/auth-context';
import SignInForm from '../Auth/SignInForm';

const Discussion = ({ bookId }) => {
  const [comments, setComments] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [addingNewComment, setAddingNewComment] = useState(false);
  const [newCommentAdded, setNewCommentAdded] = useState(0);
  const [signingIn, setSigningIn] = useState(false);

  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://bookclub-b44e0-default-rtdb.europe-west1.firebasedatabase.app/books/${bookId}/comments.json`,
    )
      .then((response) => response.json())
      .then((data) => {
        const comments = [];
        for (const key in data) {
          const commentObj = {
            commentId: key,
            text: data[key].text,
            date: data[key].date,
            avatar: data[key].avatar,
            userName: data[key].userName,
            userEmail: data[key].userEmail,
          };
          comments.push(commentObj);
        }
        comments.sort((comment1, comment2) => comment2.date - comment1.date);
        setComments(comments);
        setIsLoading(false);
      });
  }, [bookId, newCommentAdded]);

  const onClose = () => {
    setAddingNewComment(false);
  };

  const addCommentHandler = (newComment) => {
    setNewCommentAdded(newComment);
    onClose();
  };

  return (
    <Fragment>
      <h1>Discussion {bookId}</h1>
      {addingNewComment && (
        <Modal onClose={onClose}>
          <CommentForm
            onClose={onClose}
            onAddComment={addCommentHandler}
            bookId={bookId}
          />
        </Modal>
      )}
      {!isLoggedIn && (
        <Button onClick={() => setSigningIn(true)} extraClass="button--primary">
          Sign In to Comment
        </Button>
      )}
      {signingIn && (
        <Modal onClose={() => setSigningIn(false)}>
          <SignInForm onClose={() => setSigningIn(false)} />
        </Modal>
      )}
      {isLoggedIn && (
        <Button
          onClick={() => setAddingNewComment(true)}
          extraClass="button--primary"
        >
          Add New Comment
        </Button>
      )}
      {isLoading && <LoadingSpinner />}
      {!isLoading &&
        comments &&
        comments.map((comment) => (
          <Comment
            onDeleteComment={addCommentHandler}
            key={comment.commentId}
            commentId={comment.commentId}
            text={comment.text}
            date={comment.date}
            avatar={comment.avatar}
            userName={comment.userName}
            userEmail={comment.userEmail}
            bookId={bookId}
          />
        ))}
    </Fragment>
  );
};

export default Discussion;