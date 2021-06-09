import styles from './RatingStars.module.css';

/**
 * @returns stars for user rating which can be hovered over and selected
 */

const RatingStars = ({ onUserRated }) => {
  const starMouseEnterHandler = (event) => {
    const starEls = event.target.parentElement.getElementsByTagName('span');
    const hoverValue = event.target.dataset.value;
    Array.from(starEls).forEach((star) => {
      star.style.color =
        hoverValue >= star.dataset.value ? '#ac3b61' : '#bab2b5';
    });
  };

  const starMouseLeaveHandler = (event) => {
    const starEls = event.target.parentElement.getElementsByTagName('span');
    Array.from(starEls).forEach((star) => {
      star.style.color = '#bab2b5';
    });
  };

  const starClickHandler = (event) => {
    const rating = event.target.dataset.value;
    onUserRated(rating);
  };

  return (
    <div className={styles.stars}>
      <span
        className={styles.star}
        data-value="1"
        onMouseEnter={starMouseEnterHandler}
        onMouseLeave={starMouseLeaveHandler}
        onClick={starClickHandler}
      >
        ★
      </span>
      <span
        className={styles.star}
        data-value="2"
        onMouseEnter={starMouseEnterHandler}
        onMouseLeave={starMouseLeaveHandler}
        onClick={starClickHandler}
      >
        ★
      </span>
      <span
        className={styles.star}
        data-value="3"
        onMouseEnter={starMouseEnterHandler}
        onMouseLeave={starMouseLeaveHandler}
        onClick={starClickHandler}
      >
        ★
      </span>
      <span
        className={styles.star}
        data-value="4"
        onMouseEnter={starMouseEnterHandler}
        onMouseLeave={starMouseLeaveHandler}
        onClick={starClickHandler}
      >
        ★
      </span>
      <span
        className={styles.star}
        data-value="5"
        onMouseEnter={starMouseEnterHandler}
        onMouseLeave={starMouseLeaveHandler}
        onClick={starClickHandler}
      >
        ★
      </span>
    </div>
  );
};

export default RatingStars;
