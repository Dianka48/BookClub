import React, { useEffect, useState } from 'react';

import styles from './QuoteContainer.module.css';
import Quote from './Quote';

/**
 * @returns a quote container with randomly generated quote from DB
 */

const QuoteContainer = () => {
  const [fetchedQuotes, setFetchedQuotes] = useState(null);
  const [randomQuoteIndex, setRandomQuoteIndex] = useState(null);

  const generateRandomNumber = (arrayLength) => {
    return Math.floor(Math.random() * arrayLength);
  };

  // fetches all quotes from DB
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
        // sets the random quote index
        setRandomQuoteIndex(generateRandomNumber(quotesArray.length));
      })
      .catch((ex) => console.error(ex));
  }, []);

  // changes the random quote index every 10 000 miliseconds
  useEffect(() => {
    let isMounted = true;
    const timer = setTimeout(() => {
      if (isMounted) {
        setRandomQuoteIndex((prev) => {
          while (true) {
            const randomNum = generateRandomNumber(fetchedQuotes.length);
            if (prev !== randomNum) {
              return randomNum;
            }
          }
        });
      }
    }, 10000);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [fetchedQuotes, randomQuoteIndex]);

  return (
    <div key={randomQuoteIndex} className={styles.quoteContainer}>
      {fetchedQuotes && randomQuoteIndex && (
        <Quote
          text={fetchedQuotes[randomQuoteIndex].text}
          author={fetchedQuotes[randomQuoteIndex].author}
        />
      )}
    </div>
  );
};

export default QuoteContainer;
