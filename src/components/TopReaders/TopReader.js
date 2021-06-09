import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import styles from './TopReader.module.css';

/**
 * @returns div with 1 top reader (number, userName and read books)
 */

const TopReader = ({
  readBooks,
  userName,
  userEmail,
  currentUserBooks,
  order,
}) => {
  const { email } = useContext(AuthContext);

  return (
    // top reader is styled differently if the user in top readers is the current active user
    <div
      className={
        email === userEmail
          ? `${styles.topReader} ${styles.activeUser}`
          : styles.topReader
      }
    >
      <p className={styles.order}>{order}.</p>
      <div>
        <p className={styles.userName}>{userName}</p>
        <p>
          {email === userEmail ? currentUserBooks : readBooks}{' '}
          {email === userEmail
            ? currentUserBooks === 1
              ? 'book'
              : 'books'
            : readBooks === 1
            ? 'book'
            : 'books'}
        </p>
      </div>
    </div>
  );
};

export default TopReader;
