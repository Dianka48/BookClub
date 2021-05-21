import React, { Fragment } from 'react';
import Container from '../components/UI/Container';
import Navigation from '../components/Layout/Navigation';
import Footer from '../components/Layout/Footer';
import ReadingBenefit from '../components/ReadingBenefits/ReadingBenefit';

const ReadingBenefits = () => {
  return (
    <Fragment>
      <Navigation />
      <Container>
        <ReadingBenefit />
      </Container>
      <Footer />
    </Fragment>
  );
};

export default ReadingBenefits;
