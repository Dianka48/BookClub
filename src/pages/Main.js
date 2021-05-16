import React, { useState } from 'react';
import SignUpForm from '../components/Auth/SignUpForm';
import SignInForm from '../components/Auth/SignInForm';
import styles from './Main.module.css';
import QuoteContainer from '../components/Quotes/QuoteContainer';
import Button from '../components/UI/Button';
import Modal from '../components/UI/Modal';
import MainAuth from '../components/Auth/MainAuth';

const Main = () => {
  const [signingIn, setSigningIn] = useState(false);
  const [signingUp, setSigningUp] = useState(false);

  const signInHandler = () => {
    setSigningIn(true);
  };

  const signUpHandler = () => {
    setSigningUp(true);
  };

  const closeHandler = () => {
    setSigningIn(false);
    setSigningUp(false);
  };

  return (
    <div className={styles.container}>
      {signingUp && (
        <Modal onClose={closeHandler}>
          <SignUpForm onClose={closeHandler} />
        </Modal>
      )}
      {signingIn && (
        <Modal onClose={closeHandler}>
          <SignInForm onClose={closeHandler} />
        </Modal>
      )}
      <QuoteContainer />
      <MainAuth onSignIn={signInHandler} onSignUp={signUpHandler} />
    </div>
  );
};

export default Main;
