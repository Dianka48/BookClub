import { Fragment } from 'react';
import styles from './Quote.module.css';

/**
 * @returns a single quote with text and author paragraphs
 */

const Quote = ({ text, author }) => {
  return (
    <Fragment>
      <p className={styles.text}>{text}</p>
      <p className={styles.author}>{author}</p>
    </Fragment>
  );
};

export default Quote;
