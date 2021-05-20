import styles from './Rating.module.css';

const Rating = ({ reviews, score }) => {
  let rating = score / reviews;
  rating = rating || 0;

  return <div className={styles.stars} style={{ '--rating': rating }}></div>;
};

export default Rating;
