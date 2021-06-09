import styles from './LoadingSpinner.module.css';

/**
 * @returns loading spinner used when data are loading
 */

const LoadingSpinner = () => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default LoadingSpinner;
