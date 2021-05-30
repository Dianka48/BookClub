import { useEffect, useState, Fragment } from 'react';
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
      `https://bookclub-b44e0-default-rtdb.europe-west1.firebasedatabase.app/books.json?orderBy="bookOfTheMonth"&equalTo="yes"`,
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
            rating: Number(data[key].score) / Number(data[key].reviews),
          };
        }
        setCurrentBookOfTheMonth(bookOfTheMonth);
        setIsLoading(false);
      });
  }, [month]);

  return (
    <Fragment>
      <h2>Book of {month}</h2>
      {isLoading && <LoadingSpinner />}
      {!isLoading && currentBookOfTheMonth && (
        <Fragment>
          <div className={styles.book}>
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
            <div className={styles.bookImage}>
              <img
                src={currentBookOfTheMonth.image}
                alt={currentBookOfTheMonth.title}
              />
            </div>
            <p className={styles.text}>{currentBookOfTheMonth.text}</p>
          </div>
          <Discussion bookId={currentBookOfTheMonth.bookId} />
        </Fragment>
      )}
    </Fragment>
  );
};

export default BookOfTheMonthInfo;