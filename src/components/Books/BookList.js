import React, { Fragment, useContext, useEffect, useState } from 'react';
import AuthContext from '../../store/auth-context';
import LoadingSpinner from '../UI/LoadingSpinner';

import Book from './Book';
import Categories from './Categories/Categories';

const BookList = () => {
  const [fetchedBooks, setFetchedBooks] = useState(null);
  const [booksAreLoading, setBooksAreLoading] = useState(true);
  const [userIdIsLoading, setUserIdIsLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [filteredBooks, setFilteredBooks] = useState(null);
  const { email } = useContext(AuthContext);

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
        setBooksAreLoading(false);
      });
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
      });
  }, [email]);

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
    <div>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <Fragment>
          <Categories onFilterCategory={filterCategoryHandler} />
          {filteredBooks.map((book) => (
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
    </div>
  );
};

export default BookList;
