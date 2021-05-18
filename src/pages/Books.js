import React, { Fragment } from 'react';
import Navigation from '../components/Layout/Navigation';
import Container from '../components/UI/Container';

const Books = () => {
  return (
    <Fragment>
      <Navigation />
      <Container>
        <h1>Books Page</h1>
      </Container>
    </Fragment>
  );
};

export default Books;
