import React, { Fragment, useContext, useState } from 'react';
import AuthContext from '../../store/auth-context';
import Modal from '../UI/Modal';
import SignInForm from '../Auth/SignInForm';
import styles from './SignInOut.module.css';

const SignInOut = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [signingIn, setSigningIn] = useState(false);

  const handleSignInOut = () => {
    if (isLoggedIn) {
      logout();
    } else {
      setSigningIn(true);
    }
  };

  const closeHandler = () => {
    setSigningIn(false);
  };

  return (
    <Fragment>
      <div onClick={handleSignInOut} className={styles.signInOut}>
        {!isLoggedIn && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z" />
          </svg>
        )}
        {isLoggedIn && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            viewBox="0 0 24 24"
          >
            <path d="M16 9v-4l8 7-8 7v-4h-8v-6h8zm-16-7v20h14v-2h-12v-16h12v-2h-14z" />
          </svg>
        )}
        <p>{isLoggedIn ? 'Sign Out' : 'Sign In'}</p>
      </div>
      {signingIn && (
        <Modal onClose={closeHandler}>
          <SignInForm onClose={closeHandler} />
        </Modal>
      )}
    </Fragment>
  );
};
export default SignInOut;
