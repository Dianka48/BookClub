import { useEffect, useState, Fragment } from 'react';
import LoadingSpinner from '../UI/LoadingSpinner';
import WishlistedBook from './WishlistedBook';

const Wishlist = ({ allBooks, wishlistedBooksObj, userId }) => {
  const [wishlistedBooks, setWishlistedBooks] = useState(null);

  useEffect(() => {
    const wishlistedArray = [];
    for (const key in wishlistedBooksObj) {
      const obj = { ...allBooks[key] };
      wishlistedArray.push(obj);
    }
    setWishlistedBooks(wishlistedArray);
  }, [allBooks, wishlistedBooksObj]);

  return (
    <Fragment>
      {!wishlistedBooks && <LoadingSpinner />}
      {wishlistedBooks &&
        wishlistedBooks.map((book) => (
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
