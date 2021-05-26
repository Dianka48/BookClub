import { useEffect, useState, Fragment } from 'react';
import styles from './Wishlist.module.css';
import LoadingSpinner from '../UI/LoadingSpinner';
import WishlistedBook from './WishlistedBook';
import Sorting from './Sorting';

const Wishlist = ({ allBooks, wishlistedBooksObj, userId }) => {
  const [sortedBooks, setSortedBooks] = useState(null);
  const [sorting, setSorting] = useState({
    sortedBy: 'Rating',
    order: 'asc',
    label: 'Title',
    orderLabel: 'Ascending',
  });

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
        sortedBy: `${prev.sortedBy === 'Title' ? 'Rating' : 'Title'}`,
        label: `${prev.label === 'Title' ? 'Rating' : 'Title'}`,
      };
    });
  };

  return (
    <Fragment>
      <h2 className={styles.wishlist}>Your Wishlist</h2>
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
    </Fragment>
  );
};

export default Wishlist;
