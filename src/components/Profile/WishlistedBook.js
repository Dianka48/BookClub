import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import WishlistIcon from '../Books/Icons/WishlistIcon';
import Rating from '../Books/Rating';
import Category from '../Books/Categories/Category';

const WishlistedBook = ({
  bookId,
  userId,
  author,
  title,
  category,
  image,
  reviews,
  score,
  year,
}) => {
  const [removedFromWishlist, setRemovedFromWishlist] = useState(false);

  const wishlistChangeHandler = (_wishlisted) => {
    setRemovedFromWishlist(true);
    fetch(
      `https://bookclub-b44e0-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/lists/wishlisted.json`,
      {
        method: 'PATCH',
        body: JSON.stringify({ [bookId]: null }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    ).catch((err) => console.error(err.message));
  };

  return (
    <Fragment>
      {!removedFromWishlist && (
        <div>
          <p>{author}</p>
          <Link to={`/books/${bookId}`}>{title}</Link>
          <Category category={category} extraClasses={[category]} />
          <WishlistIcon
            isWishlisted={true}
            onWishlistChange={wishlistChangeHandler}
          />
          <Rating reviews={reviews} score={score} />
        </div>
      )}
    </Fragment>
  );
};

export default WishlistedBook;
