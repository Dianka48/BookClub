import styles from './Sorting.module.css';

const Sorting = ({
  sorting: { sortedBy, order, label, orderLabel },
  onChangeOrderHandler,
  onChangeSortedByHandler,
}) => {
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
            className={styles.arrow}
            onClick={() => onChangeOrderHandler()}
          >
            &#8681;
          </button>
        )}
        {order === 'desc' && (
          <button
            className={styles.arrow}
            onClick={() => onChangeOrderHandler()}
          >
            &#8679;
          </button>
        )}
      </div>
    </div>
  );
};

export default Sorting;
