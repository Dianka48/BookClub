import React, { useEffect, useState } from 'react';

/**
 * @returns a simple span with a date string
 */

const BookDate = ({ timestamp, time }) => {
  const [date, setDate] = useState('');

  useEffect(() => {
    const currentDate = new Date(timestamp);
    // Sets the options depending on time. If time is true, time will be shown.
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

  return <>{timestamp === 0 ? <span>No Date</span> : <span>{date}</span>}</>;
};

export default BookDate;
