import React, { Fragment } from 'react';
import BookOfTheMonthInfo from '../components/BookOfTheMonth/BookOfTheMonthInfo';
import Navigation from '../components/Layout/Navigation';
import Footer from '../components/Layout/Footer';
import Container from '../components/UI/Container';

const BookOfTheMonth = () => {
  const currentMonth = new Date().toLocaleDateString(undefined, {
    month: 'long',
  });

  return (
    <Fragment>
      <Navigation />
      <Container>
        <BookOfTheMonthInfo month={currentMonth} />
      </Container>
      <Footer />
    </Fragment>
  );
};

export default BookOfTheMonth;
