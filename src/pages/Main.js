import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import SignUpForm from '../components/Auth/SignUpForm';
import SignInForm from '../components/Auth/SignInForm';
import styles from './Main.module.css';
import QuoteContainer from '../components/Quotes/QuoteContainer';
import Modal from '../components/UI/Modal';
import MainAuth from '../components/Auth/MainAuth';
import AuthContext from '../store/auth-context';
import Button from '../components/UI/Button';

/**
 * @returns the main starting page with signing up/in forms and changing quotes
 */

const Main = () => {
  const [signingIn, setSigningIn] = useState(false);
  const [signingUp, setSigningUp] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);
  const history = useHistory();

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

  const clickHandler = () => {
    history.replace('./books');
  };

  return (
    <div className={styles.container}>
      <div className={styles.overlay}>
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
        {!isLoggedIn && (
          <MainAuth onSignIn={signInHandler} onSignUp={signUpHandler} />
        )}
        {isLoggedIn && (
          <div className={styles.profileButton}>
            <Button onClick={clickHandler} extraClass="button--primary">
              Back to BookClub
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
