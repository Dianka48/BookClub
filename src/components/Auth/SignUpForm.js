import { Fragment, useContext, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from '../../store/auth-context';
import Button from '../UI/Button';
import Input from '../UI/Input';

import styles from './SignInUpForm.module.css';

/**
 * @returns SignUp form where user inputs his userName, email and password and signs up or clicks the cancel button
 */

const SignUpForm = ({ onClose }) => {
  const authCtx = useContext(AuthContext);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const userNameInputRef = useRef();
  const history = useHistory();
  const [error, setError] = useState(null);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredUserName = userNameInputRef.current.value;

    // user is signed Up and secure token is returned
    const signUpPromise = fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB3OlWkSSvxoTDBCmsaxzzou_NRuc4JL04',
      {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    signUpPromise
      .then((response) => {
        if (response.ok) {
          // posts the new user to DB with his user name and email info
          return fetch(
            'https://bookclub-b44e0-default-rtdb.europe-west1.firebasedatabase.app/users.json',
            {
              method: 'POST',
              body: JSON.stringify({
                userName: enteredUserName,
                email: enteredEmail,
              }),
              headers: {
                'Content-Type': 'application/json',
              },
            },
          )
            .then((_res) => {
              return response.json();
            })
            .catch((_error) => {
              const errorMessage =
                'Signing Up failed! User data could not be added to database';
              throw new Error(errorMessage);
            });
        } else {
          const errorMessage = 'Signing Up failed!';
          throw new Error(errorMessage);
        }
      })
      .then((data) => {
        // expiration time is set to current time + expiresIn (retrieved when signing the user up)
        const expirationTime = new Date(
          new Date().getTime() + Number(data.expiresIn) * 1000,
        );
        // login function is called with all the data needed
        authCtx.login(
          data.idToken,
          expirationTime.toString(),
          data.email,
          enteredUserName,
        );
        // after signing up user is redirected to profile page
        history.replace('./profile');
      })
      .catch((error) => setError(error.message));
  };

  return (
    <Fragment>
      <h1 className={styles.signInUpH1}>Sign Up</h1>
      <form onSubmit={onSubmitHandler}>
        <Input
          ref={userNameInputRef}
          label="User Name"
          input={{ id: 'userName', type: 'text', required: true }}
        />
        <Input
          ref={emailInputRef}
          label="Email"
          input={{ id: 'email', type: 'email', required: true }}
        />
        <Input
          ref={passwordInputRef}
          label="Password"
          input={{
            id: 'password',
            type: 'password',
            required: true,
            minLength: 6,
          }}
        />
        <div className={styles.action}>
          <Button type="submit" onClick={() => {}} extraClass="button--primary">
            Sign Up
          </Button>
          <Button type="button" onClick={onClose} extraClass="button--medium">
            Cancel
          </Button>
        </div>
        {error && <div className={styles.error}>{error}</div>}
      </form>
    </Fragment>
  );
};

export default SignUpForm;
