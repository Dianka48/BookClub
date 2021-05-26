import React, { Fragment, useContext, useEffect, useState } from 'react';
import AuthContext from '../../store/auth-context';
import LoadingSpinner from '../UI/LoadingSpinner';

import Book from './Book';
import Categories from './Categories/Categories';
import Sorting from '../Profile/Sorting';

const BookList = () => {
  const [fetchedBooks, setFetchedBooks] = useState(null);
  const [booksAreLoading, setBooksAreLoading] = useState(true);
  const [userIdIsLoading, setUserIdIsLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [filteredBooks, setFilteredBooks] = useState(null);
  const { email } = useContext(AuthContext);
  const [sortedBooks, setSortedBooks] = useState(null);
  const [sorting, setSorting] = useState({
    sortedBy: 'Rating',
    order: 'asc',
    label: 'Title',
    orderLabel: 'Ascending',
  });

  const isLoading = booksAreLoading || userIdIsLoading;

  useEffect(() => {
    fetch(
      'https://bookclub-b44e0-default-rtdb.europe-west1.firebasedatabase.app/books.json',
    )
      .then((response) => response.json())
      .then((data) => {
        const booksArray = [];
        for (const key in data) {
          booksArray.push({ bookKey: key, ...data[key] });
        }
        booksArray.sort((book1, book2) => {
          const rating1 =
            Number(book1.reviews) === 0
              ? 0
              : Number(book1.score) / Number(book1.reviews);
          const rating2 =
            Number(book2.reviews) === 0
              ? 0
              : Number(book2.score) / Number(book2.reviews);
          return rating2 - rating1;
        });
        setFetchedBooks(booksArray);
        setFilteredBooks(booksArray);
        setSortedBooks(booksArray);
        setBooksAreLoading(false);
      })
      .catch((ex) => console.error(ex));
  }, []);

  useEffect(() => {
    fetch(
      `https://bookclub-b44e0-default-rtdb.europe-west1.firebasedatabase.app/users.json?orderBy="email"&equalTo="${email}"`,
    )
      .then((response) => response.json())
      .then((data) => {
        for (const key in data) {
          setUserId(key);
        }
        setUserIdIsLoading(false);
      })
      .catch((ex) => console.error(ex));
  }, [email]);

  useEffect(() => {
    let sortedArray;
    if (filteredBooks) {
      sortedArray = [...filteredBooks];
    } else if (fetchedBooks) {
      sortedArray = [...fetchedBooks];
    } else return;

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
  }, [filteredBooks, sorting, fetchedBooks]);

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

  const filterCategoryHandler = (filteredCategory) => {
    if (filteredCategory === 'all') {
      setFilteredBooks(fetchedBooks);
      return;
    }
    setFilteredBooks(
      fetchedBooks.filter((book) => book.category === filteredCategory),
    );
  };

  return (
    <Fragment>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <Fragment>
          <Categories onFilterCategory={filterCategoryHandler} />
          <Sorting
            sorting={sorting}
            onChangeOrderHandler={changeOrderHandler}
            onChangeSortedByHandler={changeSortedByHandler}
          />
          {sortedBooks.map((book) => (
            <Book
              key={book.bookKey}
              bookKey={book.bookKey}
              author={book.author}
              category={book.category}
              image={book.image}
              reviews={book.reviews}
              score={book.score}
              text={book.text}
              title={book.title}
              year={book.year}
              userId={userId}
            />
          ))}
        </Fragment>
      )}
    </Fragment>
  );
};

export default BookList;
