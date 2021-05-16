import styles from './Button.module.css';

const Button = ({ type, onClick, children, extraClass = '' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${styles[extraClass]}`}
    >
      {children}
    </button>
  );
};

export default Button;
