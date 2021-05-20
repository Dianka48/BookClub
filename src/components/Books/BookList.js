import React, { Fragment, useContext, useEffect, useState } from 'react';
import AuthContext from '../../store/auth-context';

import Book from './Book';

const BookList = () => {
  const [fetchedBooks, setFetchedBooks] = useState(null);
  const [booksAreLoading, setBooksAreLoading] = useState(true);
  const [userIdIsLoading, setUserIdIsLoading] = useState(true);
  const [userId, setUserId] = useState(null);
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
        setFetchedBooks(booksArray);
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
  }, []);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
        <Book
          bookKey={fetchedBooks[0].bookKey}
          author={fetchedBooks[0].author}
          category={fetchedBooks[0].category}
          image={fetchedBooks[0].image}
          reviews={fetchedBooks[0].reviews}
          score={fetchedBooks[0].score}
          text={fetchedBooks[0].text}
          title={fetchedBooks[0].title}
          year={fetchedBooks[0].year}
          userId={userId}
        />
      )}
    </div>
  );
};

export default BookList;
