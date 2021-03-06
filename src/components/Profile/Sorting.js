import styles from './Sorting.module.css';

/**
 * @returns buttons and labels for sorting according to received parameters
 */

const Sorting = ({
  sorting: { sortedBy, order, label, orderLabel },
  onChangeOrderHandler,
  onChangeSortedByHandler,
}) => {
  const arrow = (
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <g>
        <path d="m184.5,460.1h137.3v-223.1c0-11.3 9.1-20.4 20.3-20.4h69.3l-155.8-156.5-155.7,156.5h64.2c11.2,0 20.3,9.1 20.3,20.4v223.1h0.1zm157.5,40.9h-177.9c-11.2,0-20.3-9.1-20.3-20.4v-223.1h-92.9c-19.9,0-25.2-23.9-14.4-34.9l204.8-205.9c7.6-7.7 21.1-7.7 28.7,1.06581e-14l204.7,205.9c12.6,12.7 5.4,34.9-14.4,34.9h-98v223.1c0.1,11.3-9,20.4-20.3,20.4z" />
      </g>
    </svg>
  );

  return (
    <div className={styles.sorting}>
      <div className={styles.labels}>
        <p>Sorted By {sortedBy}</p>
        <p>{orderLabel}</p>
      </div>
      <div className={styles.buttons}>
        <button onClick={() => onChangeSortedByHandler()}>
          Sort By {label}
        </button>
        {order === 'asc' && (
          <button
            className={`${styles.arrow} ${styles.rotated}`}
            onClick={() => onChangeOrderHandler()}
          >
            {arrow}
          </button>
        )}
        {order === 'desc' && (
          <button
            className={styles.arrow}
            onClick={() => onChangeOrderHandler()}
          >
            {arrow}
          </button>
        )}
      </div>
    </div>
  );
};

export default Sorting;
