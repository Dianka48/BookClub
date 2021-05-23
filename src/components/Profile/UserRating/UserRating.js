import React, { useState, Fragment } from 'react';

import Rating from '../../Books/Rating';
import RatingStars from './RatingStars';

const UserRating = ({
  reviews,
  score,
  userReviews,
  userScore,
  rated,
  userId,
  bookId,
  onGetUserRating,
}) => {
  const [userRated, setUserRated] = useState(rated);
  const [userRatingChanged, setUserRatingChanged] = useState(null);

  const userRatedHandler = (rating) => {
    onGetUserRating(Number(rating));
    setUserRated(true);
    setUserRatingChanged({ newUserScore: Number(rating), newUserReviews: 1 });
    fetch(
      `https://bookclub-b44e0-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/lists/read/${bookId}.json`,
      {
        method: 'PATCH',
        body: JSON.stringify({
          rated: true,
          userReviews: 1,
          userScore: Number(rating),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    ).catch((err) => console.error(err.message));

    fetch(
      `https://bookclub-b44e0-default-rtdb.europe-west1.firebasedatabase.app/books/${bookId}.json`,
      {
        method: 'PATCH',
        body: JSON.stringify({
          reviews: reviews + 1,
          score: score + Number(rating),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    ).catch((err) => console.error(err.message));
  };

  return (
    <Fragment>
      {userRated && !userRatingChanged && (
        <Rating reviews={userReviews} score={userScore} />
      )}
      {userRatingChanged && (
        <Rating
          reviews={userRatingChanged.newUserReviews}
          score={userRatingChanged.newUserScore}
        />
      )}
      {!userRated && <RatingStars onUserRated={userRatedHandler} />}
    </Fragment>
  );
};

export default UserRating;
