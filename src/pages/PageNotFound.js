import { Link } from 'react-router-dom';

import styles from './PageNotFound.module.css';

const PageNotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.number}>
        <span>404</span>
        <span>Page Not Found</span>
      </div>
      <div className={styles.notFound}>
        <p className={styles.quote}>Not all those who wander are lost...</p>
        <p className={styles.lost}>...but you probably are.</p>
      </div>
      <Link to="/">
        <button className={styles.button}>Find a way home</button>
      </Link>
    </div>
  );
};

export default PageNotFound;
