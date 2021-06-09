import { useHistory } from 'react-router-dom';
import Rating from './Rating';

import styles from './SelectedBook.module.css';
import Category from './Categories/Category';
import { Fragment } from 'react';

/**
 * @returns details of one selected book
 */

const SelectedBook = ({
  book: { author, category, image, reviews, score, text, title, year },
}) => {
  const history = useHistory();

  const rating =
    Math.round(
      (Number(reviews) === 0 ? 0 : Number(score) / Number(reviews)) * 100,
    ) / 100;
  return (
    <Fragment>
      <div onClick={() => history.goBack()} className={styles.linkBack}>
        <p className={styles.link}>
          <span className={styles.arrow}>&#8617;</span> Go Back
        </p>
      </div>
      <div className={styles.book}>
        <h1>{title}</h1>
        <Rating reviews={reviews} score={score} />
        <p className={styles.rating}>(Users rate this book: {rating})</p>
        <div className={styles.author}>
          <span>{author}</span>
          <span>({year})</span>
        </div>
        <Category category={category} extraClasses={[category]} />
        <div className={styles.bookImage}>
          <img src={image} alt={title} />
        </div>
        <p className={styles.text}>{text}</p>
      </div>
    </Fragment>
  );
};

export default SelectedBook;
