import React, { useEffect, useState } from 'react';

import styles from './QuoteContainer.module.css';
import Quote from './Quote';

const QuoteContainer = () => {
  const [fetchedQuotes, setFetchedQuotes] = useState(null);
  const [randomQuoteIndex, setRandomQuoteIndex] = useState(0);

  const generateRandomNumber = (arrayLength) => {
    return Math.floor(Math.random() * arrayLength);
  };

  useEffect(() => {
    fetch(
      'https://bookclub-b44e0-default-rtdb.europe-west1.firebasedatabase.app/quotes.json',
    )
      .then((response) => response.json())
      .then((data) => {
        const quotesArray = [];
        for (const key in data) {
          quotesArray.push(data[key]);
        }
        setFetchedQuotes(quotesArray);
      });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRandomQuoteIndex((prev) => {
        while (true) {
          const randomNum = generateRandomNumber(fetchedQuotes.length);
          if (prev !== randomNum) {
            return randomNum;
          }
        }
      });
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [fetchedQuotes, randomQuoteIndex]);

  return (
    <div className={styles.quoteContainer}>
      {fetchedQuotes && <Quote text={fetchedQuotes[randomQuoteIndex].text} />}
    </div>
  );
};

export default QuoteContainer;
