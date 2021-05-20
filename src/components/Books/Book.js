import React, { useEffect, useState, Fragment } from 'react';

import styles from './Book.module.css';
import Icons from './Icons/Icons';

import Rating from './Rating';

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

  const isLoading = readIsLoading || wishlistIsLoading;

  // Fetching data

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

  const wishlistChangeHandler = (wishlisted) => {
    const valueToPut = wishlisted ? null : true;
    fetch(
      `https://bookclub-b44e0-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/lists/wishlisted.json`,
      {
        method: 'PUT',
        body: JSON.stringify({ [bookKey]: valueToPut }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  };

  const readChangeHandler = (read) => {
    const valueToPut = read ? null : true;
    fetch(
      `https://bookclub-b44e0-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/lists/read.json`,
      {
        method: 'PUT',
        body: JSON.stringify({ [bookKey]: valueToPut }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  };

  return (
    <div className={styles.book}>
      <h1>{title}</h1>
      <Rating reviews={reviews} score={score} />
      <p>{text.slice(0, 100) + '...'}</p>
      <p>{category}</p>
      <div className={styles.bookImage}>
        <img src={image} alt={title} />
      </div>
      {userId && !isLoading && (
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
