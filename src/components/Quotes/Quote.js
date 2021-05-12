import { Fragment } from 'react';
import styles from './Quote.module.css';

const Quote = (props) => {
  return (
    <Fragment>
      <p className={styles.text}>{props.text}</p>
      <p className={styles.author}>{props.author}</p>
    </Fragment>
  );
};

export default Quote;
