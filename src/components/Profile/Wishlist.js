import { useEffect, useState, Fragment } from 'react';
import styles from './WishlistRead.module.css';
import LoadingSpinner from '../UI/LoadingSpinner';
import WishlistedBook from './WishlistedBook';
import Sorting from './Sorting';

/**
 * @returns the sorting buttons and a list of all the wishlisted books by current user
 */

const Wishlist = ({ allBooks, wishlistedBooksObj, userId }) => {
  const [sortedBooks, setSortedBooks] = useState(null);
  const [sorting, setSorting] = useState({
    sortedBy: 'Rating',
    order: 'asc',
    label: 'Title',
    orderLabel: 'Ascending',
  });

  // sorts the books according to selected sorted By (title or rating) and selected order (asc or desc)
  useEffect(() => {
    const wishlistedArray = [];
    for (const key in wishlistedBooksObj) {
      const obj = { ...allBooks[key] };
      wishlistedArray.push(obj);
    }

    let sortedArray = [...wishlistedArray];

    if (sorting.sortedBy === 'Title') {
      sortedArray.sort((book1, book2) => {
        return sorting.order === 'asc'
          ? book1.title.localeCompare(book2.title)
          : book2.title.localeCompare(book1.title);
      });
    } else if (sorting.sortedBy === 'Rating') {
      sortedArray.sort((book1, book2) => {
        const ratingBook1 = book1.score / book1.reviews;
        const ratingBook2 = book2.score / book2.reviews;
        return sorting.order === 'asc'
          ? ratingBook1 - ratingBook2
          : ratingBook2 - ratingBook1;
      });
    }

    setSortedBooks(sortedArray);
  }, [allBooks, wishlistedBooksObj, sorting]);

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

  // changes the sorted by (title or rating)
  const changeSortedByHandler = () => {
    setSorting((prev) => {
      return {
        ...prev,
        sortedBy: `${prev.sortedBy === 'Title' ? 'Rating' : 'Title'}`,
        label: `${prev.label === 'Title' ? 'Rating' : 'Title'}`,
      };
    });
  };

  return (
    <Fragment>
      <div className={styles.wishlistContainer}>
        <h2 className={styles.wishlist}>Your Wishlist</h2>
        <Sorting
          sorting={sorting}
          onChangeOrderHandler={changeOrderHandler}
          onChangeSortedByHandler={changeSortedByHandler}
        />
        {sortedBooks?.length < 1 && (
          <p className={styles.noBooks}>You have no books in your wishlist.</p>
        )}
      </div>
      {!sortedBooks && <LoadingSpinner />}
      <div className={styles.bookList}>
        {sortedBooks &&
          sortedBooks.map((book) => (
            <WishlistedBook
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
            />
          ))}
      </div>
    </Fragment>
  );
};

export default Wishlist;
