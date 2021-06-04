import React, { Fragment } from 'react';
import Container from '../components/UI/Container';
import Navigation from '../components/Layout/Navigation';
import Footer from '../components/Layout/Footer';
import ReadingBenefit from '../components/ReadingBenefits/ReadingBenefit';
import { ReadBooksContextProvider } from '../store/readBooks-context';
import TopReaders from '../components/TopReaders/TopReaders';

const ReadingBenefits = () => {
  return (
    <Fragment>
      <Navigation />
      <Container>
        <ReadingBenefit />
      </Container>
      <ReadBooksContextProvider>
        <TopReaders />
      </ReadBooksContextProvider>
      <Footer />
    </Fragment>
  );
};

export default ReadingBenefits;
