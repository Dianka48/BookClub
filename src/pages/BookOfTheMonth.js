import React, { Fragment } from 'react';
import BookOfTheMonthInfo from '../components/BookOfTheMonth/BookOfTheMonthInfo';
import Navigation from '../components/Layout/Navigation';
import Footer from '../components/Layout/Footer';
import Container from '../components/UI/Container';
import TopReaders from '../components/TopReaders/TopReaders';
import { ReadBooksContextProvider } from '../store/readBooks-context';

/**
 * @returns the Book of the Month page with current month
 */

const BookOfTheMonth = () => {
  const currentMonth = new Date().toLocaleDateString('en-US', {
    month: 'long',
  });

  return (
    <Fragment>
      <Navigation />
      <Container>
        <BookOfTheMonthInfo month={currentMonth} />
      </Container>
      <ReadBooksContextProvider>
        <TopReaders />
      </ReadBooksContextProvider>
      <Footer />
    </Fragment>
  );
};

export default BookOfTheMonth;
