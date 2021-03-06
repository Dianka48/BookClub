import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import styles from './Book.module.css';
import Icons from './Icons/Icons';

import Rating from './Rating';
import Category from './Categories/Category';
import AuthContext from '../../store/auth-context';
import ReadBooksContext from '../../store/readBooks-context';

/**
 * @returns single book with all the information, rating and icons
 */

const Book = ({
  bookKey,
  author,
  category,
  image,
  reviews,
  score,
  text,
  title,
  year,
  userId,
}) => {
  const [readIsLoading, setReadIsLoading] = useState(true);
  const [wishlistIsLoading, setWishlistIsLoading] = useState(true);
  const [isRead, setIsRead] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addReadBook, removeReadBook } = useContext(ReadBooksContext);

  const isLoading = readIsLoading || wishlistIsLoading;
  const { isLoggedIn } = useContext(AuthContext);

  // Fetching data

  // Checks if book is in user's wishlist and sets the isWishlisted state
  useEffect(() => {
    if (userId) {
      fetch(
        `https://bookclub-b44e0-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/lists/wishlisted/${bookKey}.json`,
      )
        .then((response) => response.json())
        .then((data) => {
          setIsWishlisted(!!data);
          setWishlistIsLoading(false);
        });
    }
  }, [userId, bookKey]);

  // Checks if book is in user's read books and sets the isRead state
  useEffect(() => {
    if (userId) {
      fetch(
        `https://bookclub-b44e0-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/lists/read/${bookKey}.json`,
      )
        .then((response) => response.json())
        .then((data) => {
          setIsRead(!!data);
          setReadIsLoading(false);
        });
    }
  }, [userId, bookKey]);

  // Posting data

  // Adds or removes the book from user's wishlist in DB
  const wishlistChangeHandler = (wishlisted) => {
    const valueToPut = wishlisted ? null : true;
    fetch(
      `https://bookclub-b44e0-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/lists/wishlisted.json`,
      {
        method: 'PATCH',
        body: JSON.stringify({ [bookKey]: valueToPut }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  };

  // Adds or removes the book from user's read books in DB
  const readChangeHandler = (read) => {
    read ? removeReadBook() : addReadBook();
    const date = Date.now();
    const valueToPut = read
      ? null
      : { date: date, userScore: 0, userReviews: 0, rated: false };
    fetch(
      `https://bookclub-b44e0-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/lists/read.json`,
      {
        method: 'PATCH',
        body: JSON.stringify({ [bookKey]: valueToPut }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  };

  return (
    <div className={styles.book}>
      <div className={styles.header}>
        <h2>
          <Link to={`/books/${bookKey}`}>{title}</Link>
        </h2>
        <Rating reviews={reviews} score={score} />
      </div>
      <div className={styles.author}>
        <span>
          {author} ({year})
        </span>
        <Category category={category} extraClasses={[category]} />
      </div>
      <div className={styles.text}>
        <div className={styles.bookImage}>
          <Link to={`/books/${bookKey}`}>
            <img src={image} alt={title} />
          </Link>
        </div>
        <p>{text.slice(0, text.indexOf(' ', 200)) + '...'}</p>
      </div>

      {userId && !isLoading && isLoggedIn && (
        <Icons
          wishlisted={isWishlisted}
          read={isRead}
          onWishlistChange={wishlistChangeHandler}
          onReadChange={readChangeHandler}
        />
      )}
    </div>
  );
};

export default Book;
