import SignUpForm from '../components/Auth/SignUpForm';
import SignInForm from '../components/Auth/SignInForm';
import styles from './Main.module.css';

const Main = () => {
  return (
    <div className={styles.container}>
      <SignUpForm />
      <SignInForm />
    </div>
  );
};

export default Main;
