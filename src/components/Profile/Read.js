import React, { useEffect, useState, Fragment } from 'react';

import LoadingSpinner from '../UI/LoadingSpinner';
import ReadBook from './ReadBook';
import Sorting from '../Profile/Sorting';

import styles from './WishlistRead.module.css';

const Read = ({ allBooks, readBooksObj, userId, onChangeDateInProfile }) => {
  const [sortedBooks, setSortedBooks] = useState(null);
  const [sorting, setSorting] = useState({
    sortedBy: 'Date',
    order: 'desc',
    label: 'Title',
    orderLabel: 'Descending',
  });

  // const onChangeDateInRead = (dateObj) => {
  //   onChangeDateInProfile(dateObj);
  // };

  useEffect(() => {
    const readArray = [];
    for (const key in readBooksObj) {
      const obj = { ...allBooks[key], ...readBooksObj[key] };
      readArray.push(obj);
    }

    let sortedArray = [...readArray];

    if (sorting.sortedBy === 'Title') {
      sortedArray.sort((book1, book2) => {
        return sorting.order === 'asc'
          ? book1.title.localeCompare(book2.title)
          : book2.title.localeCompare(book1.title);
      });
    } else if (sorting.sortedBy === 'Date') {
      sortedArray.sort((book1, book2) => {
        return sorting.order === 'asc'
          ? book1.date - book2.date
          : book2.date - book1.date;
      });
    }

    setSortedBooks(sortedArray);
  }, [allBooks, readBooksObj, sorting]);

  const changeOrderHandler = () => {
    setSorting((prev) => {
      return {
        ...prev,
        order: `${prev.order === 'asc' ? 'desc' : 'asc'}`,
        orderLabel: `${
          prev.orderLabel === 'Ascending' ? 'Descending' : 'Ascending'
        }`,
      };
    });
  };

  const changeSortedByHandler = () => {
    setSorting((prev) => {
      return {
        ...prev,
        sortedBy: `${prev.sortedBy === 'Title' ? 'Date' : 'Title'}`,
        label: `${prev.label === 'Title' ? 'Date' : 'Title'}`,
      };
    });
  };

  return (
    <Fragment>
      <h2 className={styles.read}>Books You Have Read</h2>
      <Sorting
        sorting={sorting}
        onChangeOrderHandler={changeOrderHandler}
        onChangeSortedByHandler={changeSortedByHandler}
      />
      {sortedBooks?.length < 1 && (
        <p className={styles.noBooks}>You have no books in your wishlist.</p>
      )}
      {!sortedBooks && <LoadingSpinner />}
      {sortedBooks &&
        sortedBooks.map((book) => (
          <ReadBook
            key={book.bookId}
            bookId={book.bookId}
            userId={userId}
            author={book.author}
            title={book.title}
            reviews={book.reviews}
            score={book.score}
            category={book.category}
            image={book.image}
            year={book.year}
            userScore={book.userScore}
            userReviews={book.userReviews}
            date={book.date}
            rated={book.rated}
            onChangeDate={onChangeDateInProfile}
          />
        ))}
    </Fragment>
  );
};
export default Read;
