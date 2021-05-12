import SignUpForm from '../components/Auth/SignUpForm';
import SignInForm from '../components/Auth/SignInForm';
import styles from './Main.module.css';
import QuoteContainer from '../components/Quotes/QuoteContainer';

const Main = () => {
  return (
    <div className={styles.container}>
      <SignUpForm />
      <SignInForm />
      <QuoteContainer />
    </div>
  );
};

export default Main;
