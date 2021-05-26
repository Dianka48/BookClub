import React, { useEffect, useState } from 'react';

import styles from './BookDate.module.css';

const BookDate = ({ timestamp, time }) => {
  const [date, setDate] = useState('');

  useEffect(() => {
    const currentDate = new Date(timestamp);
    const options = time
      ? {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: time ? '2-digit' : false,
          minute: time ? '2-digit' : false,
        }
      : {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        };
    const dateString = currentDate.toLocaleDateString(undefined, options);
    setDate(dateString);
  }, [timestamp, time]);

  return <span className={styles.date}>{date}</span>;
};

export default BookDate;
