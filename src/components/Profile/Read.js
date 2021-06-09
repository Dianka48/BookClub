import React, { useEffect, useState, Fragment, useContext } from 'react';

import LoadingSpinner from '../UI/LoadingSpinner';
import ReadBook from './ReadBook';
import Sorting from '../Profile/Sorting';

import styles from './WishlistRead.module.css';
import ReadBooksContext from '../../store/readBooks-context';

/**
 * @returns the sorting buttons and a list of all the read books by current user
 */

const Read = ({ allBooks, readBooksObj, userId, onChangeDateInProfile }) => {
  const [sortedBooks, setSortedBooks] = useState(null);
  const [sorting, setSorting] = useState({
    sortedBy: 'Date',
    order: 'desc',
    label: 'Title',
    orderLabel: 'Descending',
  });
  const { readBooksNum } = useContext(ReadBooksContext);

  // sorts the books according to selected sorted By (title or date) and selected order (asc or desc)
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

  // changes the order of the sorted books (ascending or descending)
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

  // changes the sorted by (title or date)
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
      <div className={styles.readContainer}>
        <h2 className={styles.read}>Books You Have Read</h2>
        <Sorting
          sorting={sorting}
          onChangeOrderHandler={changeOrderHandler}
          onChangeSortedByHandler={changeSortedByHandler}
        />
        {!readBooksNum && (
          <p className={styles.noBooks}>
            You have no books in your Read Books List.
          </p>
        )}
      </div>
      {!sortedBooks && <LoadingSpinner />}
      <div className={styles.bookList}>
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
      </div>
    </Fragment>
  );
};
export default Read;
