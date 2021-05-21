import { Link } from 'react-router-dom';
import Rating from './Rating';

import styles from './SelectedBook.module.css';
import Category from './Categories/Category';
import { Fragment } from 'react';

const SelectedBook = ({
  book: { author, category, image, reviews, score, text, title, year },
}) => {
  const rating =
    Math.round(
      (Number(reviews) === 0 ? 0 : Number(score) / Number(reviews)) * 100,
    ) / 100;
  return (
    <Fragment>
      <div className={styles.linkBack}>
        <Link to="/books">
          <span className={styles.arrow}>&#8617;</span> Back to Books
        </Link>
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