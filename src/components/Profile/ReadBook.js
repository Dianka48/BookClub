import React, { Fragment, useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';

import styles from './ReadBook.module.css';

import ReadIcon from '../Books/Icons/ReadIcon';
import Category from '../Books/Categories/Category';
import UserRating from './UserRating/UserRating';
import ReadBooksContext from '../../store/readBooks-context';
import BookDate from '../UI/BookDate';
import Button from '../UI/Button';
import Input from '../UI/Input';

const ReadBook = ({
  bookId,
  userId,
  author,
  title,
  category,
  image,
  reviews,
  score,
  year,
  date,
  userScore,
  userReviews,
  rated,
  onChangeDate,
}) => {
  const [removedFromRead, setRemovedFromRead] = useState(false);
  const [newUserRating, setNewUserRating] = useState(0);
  const { removeReadBook } = useContext(ReadBooksContext);
  const dateInputRef = useRef();
  const [changingDate, setChangingDate] = useState(false);

  const readChangeHandler = (_read) => {
    removeReadBook();
    setRemovedFromRead(true);
    fetch(
      `https://bookclub-b44e0-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/lists/read.json`,
      {
        method: 'PATCH',
        body: JSON.stringify({ [bookId]: null }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    ).catch((err) => console.error(err.message));

    fetch(
      `https://bookclub-b44e0-default-rtdb.europe-west1.firebasedatabase.app/books/${bookId}.json`,
    )
      .then((response) => response.json())
      .then((data) => {
        fetch(
          `https://bookclub-b44e0-default-rtdb.europe-west1.firebasedatabase.app/books/${bookId}.json`,
          {
            method: 'PATCH',
            body: JSON.stringify({
              reviews: data.reviews - 1,
              score: data.score - newUserRating,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
          .then((_response) => setNewUserRating(0))
          .catch((err) => console.error(err.message));
      })
      .catch((err) => console.error(err.message));
  };

  const getUserRatingHandler = (rating) => {
    setNewUserRating(rating);
  };

  const changeDateHandler = () => {
    let newDate = dateInputRef.current.value;
    newDate = Number(Date.parse(newDate));
    fetch(
      `https://bookclub-b44e0-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/lists/read/${bookId}.json`,
      {
        method: 'PATCH',
        body: JSON.stringify({
          date: newDate,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then((_response) =>
        onChangeDate({ date: newDate, userId: userId, bookId: bookId }),
      )
      .catch((err) => console.error(err.message));
    setChangingDate(false);
  };

  return (
    <Fragment>
      {!removedFromRead && (
        <Fragment>
          <div className={styles.date}>
            <BookDate timestamp={date} time={false} />
            {!changingDate && (
              <div className={styles.button}>
                <Button
                  onClick={() => setChangingDate(true)}
                  extraClass="button--medium"
                >
                  Change
                </Button>
              </div>
            )}
          </div>

          {
            <div className={changingDate ? styles.changeDate : styles.hidden}>
              <div className={styles.input}>
                <Input
                  ref={dateInputRef}
                  label="Select New Date:"
                  input={{ id: 'date', type: 'date', required: true }}
                />
              </div>
              <div className={styles.buttonChangeDate}>
                <Button
                  onClick={changeDateHandler}
                  extraClass="button--primary"
                >
                  Change
                </Button>
              </div>
              <div className={styles.buttonChangeDate}>
                <Button
                  onClick={() => setChangingDate(false)}
                  extraClass="button--secondary"
                >
                  Cancel
                </Button>
              </div>
            </div>
          }

          <div className={styles.readBook}>
            <div className={styles.image}>
              <Link to={`/books/${bookId}`}>
                <img src={image} alt={title} />
              </Link>
            </div>

            <div className={styles.bookInfo}>
              <h2>
                <Link to={`/books/${bookId}`}>{title}</Link>
              </h2>
              <div className={styles.author}>
                <p>{author}</p>
                <p>{year}</p>
              </div>
              <div className={styles.ratingContainer}>
                <span className={styles.rating}>Your Rating:</span>
                <UserRating
                  userId={userId}
                  bookId={bookId}
                  rated={rated}
                  userReviews={userReviews}
                  userScore={userScore}
                  reviews={reviews}
                  score={score}
                  onGetUserRating={getUserRatingHandler}
                />
              </div>
              <div className={styles.icons}>
                <Category category={category} extraClasses={[category]} />
                <div className={styles.icon}>
                  <ReadIcon isRead={true} onReadChange={readChangeHandler} />
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ReadBook;
