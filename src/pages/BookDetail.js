import { useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';

import Navigation from '../components/Layout/Navigation';
import Footer from '../components/Layout/Footer';
import Container from '../components/UI/Container';
import SelectedBook from '../components/Books/SelectedBook';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const BookDetail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedBook, setLoadedBook] = useState(null);

  const params = useParams();

  const { bookId } = params;

  useEffect(() => {
    fetch(
      `https://bookclub-b44e0-default-rtdb.europe-west1.firebasedatabase.app/books/${bookId}.json`,
    )
      .then((response) => response.json())
      .then((data) => {
        setLoadedBook(data);
        setIsLoading(false);
      });
  }, [bookId]);

  return (
    <Fragment>
      <Navigation />
      <Container>
        {isLoading && <LoadingSpinner />}
        {!isLoading && loadedBook && <SelectedBook book={loadedBook} />}
      </Container>
      <Footer />
    </Fragment>
  );
};

export default BookDetail;