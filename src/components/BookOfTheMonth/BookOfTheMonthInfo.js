import { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../UI/LoadingSpinner';

import styles from './BookOfTheMonthInfo.module.css';
import Rating from '../Books/Rating';
import Category from '../Books/Categories/Category';
import Discussion from './Discussion';

const BookOfTheMonthInfo = ({ month }) => {
  const [currentBookOfTheMonth, setCurrentBookOfTheMonth] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://bookclub-b44e0-default-rtdb.europe-west1.firebasedatabase.app/books.json?orderBy="bookOfTheMonth"&equalTo=true`,
    )
      .then((response) => response.json())
      .then((data) => {
        let bookOfTheMonth;
        for (const key in data) {
          bookOfTheMonth = {
            bookId: key,
            author: data[key].author,
            category: data[key].category,
            image: data[key].image,
            reviews: data[key].reviews,
            score: data[key].score,
            text: data[key].text,
            title: data[key].title,
            year: data[key].year,
            rating:
              Math.round(
                (Number(data[key].score) / Number(data[key].reviews)) * 100,
              ) / 100,
          };
        }
        setCurrentBookOfTheMonth(bookOfTheMonth);
        setIsLoading(false);
      });
  }, [month]);

  return (
    <Fragment>
      <h2 className={styles.month}>Book of {month}</h2>
      {isLoading && <LoadingSpinner />}
      {!isLoading && currentBookOfTheMonth && (
        <Fragment>
          <div className={styles.book}>
            <div className={styles.bookImage}>
              <img
                src={currentBookOfTheMonth.image}
                alt={currentBookOfTheMonth.title}
              />
            </div>
            <div className={styles.bookInfo}>
              <h1>{currentBookOfTheMonth.title}</h1>
              <Rating
                reviews={currentBookOfTheMonth.reviews}
                score={currentBookOfTheMonth.score}
              />
              <p className={styles.rating}>
                (Users rate this book: {currentBookOfTheMonth.rating})
              </p>
              <div className={styles.author}>
                <span>{currentBookOfTheMonth.author}</span>
                <span>({currentBookOfTheMonth.year})</span>
              </div>
              <Category
                category={currentBookOfTheMonth.category}
                extraClasses={[currentBookOfTheMonth.category]}
              />

              <p className={styles.text}>
                {currentBookOfTheMonth.text.slice(
                  0,
                  currentBookOfTheMonth.text.indexOf(' ', 300),
                ) + '...'}
                <Link to={`/books/${currentBookOfTheMonth.bookId}`}>
                  &nbsp;read more
                </Link>
              </p>
            </div>
          </div>
          <Discussion
            bookId={currentBookOfTheMonth.bookId}
            title={currentBookOfTheMonth.title}
          />
        </Fragment>
      )}
    </Fragment>
  );
};

export default BookOfTheMonthInfo;
