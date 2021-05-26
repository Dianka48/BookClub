import React, { Fragment, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import ReadIcon from '../Books/Icons/ReadIcon';
import Category from '../Books/Categories/Category';
import UserRating from './UserRating/UserRating';
import ReadBooksContext from '../../store/readBooks-context';
import BookDate from '../UI/BookDate';

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
}) => {
  const [removedFromRead, setRemovedFromRead] = useState(false);
  const [newUserRating, setNewUserRating] = useState(0);
  const { removeReadBook } = useContext(ReadBooksContext);

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

  return (
    <Fragment>
      {!removedFromRead && (
        <div>
          <p>{author}</p>
          <Link to={`/books/${bookId}`}>{title}</Link>
          <BookDate timestamp={1621743842308} time={false} />
          <Category category={category} extraClasses={[category]} />
          <ReadIcon isRead={true} onReadChange={readChangeHandler} />
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
      )}
    </Fragment>
  );
};

export default ReadBook;
