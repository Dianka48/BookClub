import React, { useEffect, useState, Fragment } from 'react';

import LoadingSpinner from '../UI/LoadingSpinner';
import ReadBook from './ReadBook';

const Read = ({ allBooks, readBooksObj, userId }) => {
  const [readBooks, setReadBooks] = useState(null);

  useEffect(() => {
    const readArray = [];
    for (const key in readBooksObj) {
      const obj = { ...allBooks[key], ...readBooksObj[key] };
      readArray.push(obj);
    }
    setReadBooks(readArray);
  }, [allBooks, readBooksObj]);

  return (
    <Fragment>
      {!readBooks && <LoadingSpinner />}
      {readBooks &&
        readBooks.map((book) => (
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
          />
        ))}
    </Fragment>
  );
};
export default Read;
