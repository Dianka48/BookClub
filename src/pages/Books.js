import React, { Fragment } from 'react';
import Navigation from '../components/Layout/Navigation';
import Container from '../components/UI/Container';
import Footer from '../components/Layout/Footer';
import BookList from '../components/Books/BookList';
import TopReaders from '../components/TopReaders/TopReaders';
import { ReadBooksContextProvider } from '../store/readBooks-context';

const Books = () => {
  return (
    <Fragment>
      <Navigation />
      <ReadBooksContextProvider>
        <Container>
          <BookList />
        </Container>
        <TopReaders />
      </ReadBooksContextProvider>
      <Footer />
    </Fragment>
  );
};

export default Books;
