import styles from './Rating.module.css';

/**
 * @returns div with 5 rating stars filled according to reviews and score props
 */

const Rating = ({ reviews, score }) => {
  let rating = score / reviews;
  rating = rating || 0;

  return <div className={styles.stars} style={{ '--rating': rating }}></div>;
};

export default Rating;
