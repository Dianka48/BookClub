import styles from './Container.module.css';

/**
 * @returns a simple container for the page content
 */

const Container = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default Container;
