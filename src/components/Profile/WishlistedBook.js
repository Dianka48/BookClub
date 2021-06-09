import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './WishlistedBook.module.css';

import WishlistIcon from '../Books/Icons/WishlistIcon';
import Rating from '../Books/Rating';
import Category from '../Books/Categories/Category';

/**
 * @returns one wishlisted book with all the info about the book, overall rating and wishlist icon
 */

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

  // when clicked on a wishlist icon, removes a book from user's wishlist in DB
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
        <div className={styles.wishlistedBook}>
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
            <Rating reviews={reviews} score={score} />
            <div className={styles.icons}>
              <Category category={category} extraClasses={[category]} />
              <div className={styles.icon}>
                <WishlistIcon
                  isWishlisted={true}
                  onWishlistChange={wishlistChangeHandler}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default WishlistedBook;
