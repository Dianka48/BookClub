import React, { useState, Fragment } from 'react';
import styles from './Icons.module.css';

const ReadIcon = ({ isRead, onReadChange }) => {
  const [read, setRead] = useState(isRead);

  const handleClickBook = () => {
    onReadChange(read);
    setRead((prev) => !prev);
  };

  return (
    <Fragment>
      {!read && (
        <div
          className={styles.notRead}
          title="Add to Books I Have Read"
          onClick={handleClickBook}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M5.495 2h16.505v-2h-17c-1.657 0-3 1.343-3 3v18c0 1.657 1.343 3 3 3h17v-20h-16.505c-1.375 0-1.375-2 0-2zm.505 4h14v16h-14v-16z" />
          </svg>
        </div>
      )}
      {read && (
        <div
          className={styles.read}
          title="Remove from Books I Have Read"
          onClick={handleClickBook}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M5.495 4c-1.375 0-1.375-2 0-2h16.505v-2h-17c-1.657 0-3 1.343-3 3v18c0 1.657 1.343 3 3 3h17v-20h-16.505z" />
          </svg>
        </div>
      )}
    </Fragment>
  );
};

export default ReadIcon;
