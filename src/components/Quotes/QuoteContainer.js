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
      })
      .catch((ex) => console.error(ex));
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
    }, 30000);

    return () => {
      clearTimeout(timer);
    };
  }, [fetchedQuotes, randomQuoteIndex]);

  return (
    <div key={randomQuoteIndex} className={styles.quoteContainer}>
      {fetchedQuotes && (
        <Quote
          text={fetchedQuotes[randomQuoteIndex].text}
          author={fetchedQuotes[randomQuoteIndex].author}
        />
      )}
    </div>
  );
};

export default QuoteContainer;
