import React from 'react';

import styles from './Input.module.css';

// Component returns a simple input with label and forwarded Ref

const Input = React.forwardRef(({ input, label }, ref) => {
  return (
    <div className={styles.input}>
      <label htmlFor={input.id}>{label}</label>
      <input ref={ref} {...input} />
    </div>
  );
});

export default Input;
