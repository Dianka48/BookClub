import styles from './MainAuth.module.css';
import Button from '../UI/Button';
import { Link } from 'react-router-dom';

const MainAuth = ({ onSignIn, onSignUp }) => {
  return (
    <div className={styles.mainAuthContainer}>
      <div className={styles.signUp}>
        <h2>Join Our BookClub!</h2>
        <Button onClick={onSignUp} type="button" extraClass="button--primary">
          Sign Up
        </Button>
      </div>
      <div className={styles.signIn}>
        <h2>Already a member?</h2>
        <Button onClick={onSignIn} type="button" extraClass="button--secondary">
          Sign In
        </Button>
      </div>
      <div className={styles.guest}>
        <Link to="/books">Or visit as guest</Link>
      </div>
    </div>
  );
};

export default MainAuth;
