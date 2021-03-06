import { Fragment, useContext, useRef, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import AuthContext from '../../store/auth-context';
import Input from '../UI/Input';
import Button from '../UI/Button';

import styles from './SignInUpForm.module.css';

/**
 * @returns SignIn form where user inputs his email and password and signs in or clicks the cancel button
 */

const SignInForm = ({ onClose }) => {
  const authCtx = useContext(AuthContext);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const history = useHistory();
  const [error, setError] = useState(null);
  const match = useRouteMatch();

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    let userName;

    Promise.all([
      // fetches user name data by entered email
      fetch(
        `https://bookclub-b44e0-default-rtdb.europe-west1.firebasedatabase.app/users.json?orderBy="email"&equalTo="${enteredEmail}"`,
      ),
      // signs the user in and returns a secure token
      fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB3OlWkSSvxoTDBCmsaxzzou_NRuc4JL04',
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
      ),
    ])
      .then(async ([userNameResponse, singInResponse]) => {
        // if the signing in failed error is thrown
        if (!singInResponse.ok) {
          throw new Error('Incorrect password or email.');
        }
        const userNameData = await userNameResponse.json();
        const signInData = await singInResponse.json();
        return [userNameData, signInData];
      })
      .then(([userNameData, signInData]) => {
        // user name is set to user data retrieved from DB
        for (const key in userNameData) {
          userName = userNameData[key].userName;
        }
        // expiration time is set to current time + expiresIn (retrieved when signing the user in)
        const expirationTime = new Date(
          new Date().getTime() + Number(signInData.expiresIn) * 1000,
        );
        // login function is called with all the data needed
        authCtx.login(
          signInData.idToken,
          expirationTime.toString(),
          signInData.email,
          userName,
        );
        // when signing in on main page user is redirected to profile page
        if (match.path === '/') {
          history.replace('./profile');
        }
        onClose();
      })
      .catch((error) => setError(error.message));
  };

  return (
    <Fragment>
      <h1 className={styles.signInUpH1}>Sign In</h1>
      <form onSubmit={onSubmitHandler}>
        <Input
          ref={emailInputRef}
          label="Email"
          input={{ id: 'email', type: 'email', required: true }}
        />
        <Input
          ref={passwordInputRef}
          label="Password"
          input={{ id: 'password', type: 'password', required: true }}
        />
        <div className={styles.action}>
          <Button type="submit" onClick={() => {}} extraClass="button--primary">
            Sign In
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

export default SignInForm;
