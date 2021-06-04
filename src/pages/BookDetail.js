import { useEffect, useState, Fragment } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Navigation from '../components/Layout/Navigation';
import Footer from '../components/Layout/Footer';
import Container from '../components/UI/Container';
import SelectedBook from '../components/Books/SelectedBook';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import TopReaders from '../components/TopReaders/TopReaders';
import { ReadBooksContextProvider } from '../store/readBooks-context';

const BookDetail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedBook, setLoadedBook] = useState(null);

  const params = useParams();
  const history = useHistory();

  const { bookId } = params;

  useEffect(() => {
    fetch(
      `https://bookclub-b44e0-default-rtdb.europe-west1.firebasedatabase.app/books/${bookId}.json`,
    )
      .then((response) => response.json())
      .then((data) => {
        if (!data) {
          history.replace('/page-not-found');
          return;
        }
        setLoadedBook(data);
        setIsLoading(false);
      });
  }, [bookId, history]);

  return (
    <Fragment>
      <Navigation />
      <Container>
        {isLoading && <LoadingSpinner />}
        {!isLoading && loadedBook && <SelectedBook book={loadedBook} />}
      </Container>
      <ReadBooksContextProvider>
        <TopReaders />
      </ReadBooksContextProvider>
      <Footer />
    </Fragment>
  );
};

export default BookDetail;
