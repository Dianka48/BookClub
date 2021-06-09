import React, { Fragment, useState } from 'react';
import readingImage from '../../assets/benefits.jpg';
import socialImage from '../../assets/social.jpg';
import LoadingSpinner from '../UI/LoadingSpinner';

import styles from './ReadingBenefit.module.css';

/**
 * @returns 2 images and 2 paragraphs about reading benefits
 */

const ReadingBenefit = () => {
  const [image1Loaded, setImage1Loaded] = useState(false);
  const [image2Loaded, setImage2Loaded] = useState(false);

  return (
    <Fragment>
      <div className={styles.benefits}>
        <h1>Benefits of Reading</h1>
        <div className={styles.benefit}>
          <div className={styles.image}>
            {!image1Loaded && (
              <div className={styles.imagePlaceholder}>
                <LoadingSpinner />
              </div>
            )}
            <img
              style={{ display: image1Loaded ? 'block' : 'none' }}
              onLoad={() => {
                setImage1Loaded(true);
              }}
              src={readingImage}
              alt="Woman reading a book outside"
            />
          </div>
          <p>
            Reading has a significant number of benefits on your health. Reading
            helps your brain to unwind, relax, improves your vocabulary and
            brings new experience and life-changing adventures. Who wouldn't
            want to experience a life in a 19th century rural England or go on
            an expedition deep into a jungle?
          </p>
        </div>
        <h1>Why Join Our BookClub?</h1>
        <div className={styles.benefit}>
          <div className={styles.image}>
            {!image2Loaded && (
              <div className={styles.imagePlaceholder}>
                <LoadingSpinner />
              </div>
            )}
            <img
              style={{ display: image2Loaded ? 'block' : 'none' }}
              onLoad={() => {
                setImage2Loaded(true);
              }}
              src={socialImage}
              alt="Women reading books"
            />
          </div>
          <p>
            If reading is one of your hobbies and you love reading books, why
            not share your views and opinions on books with others? Book Club is
            a great way to connect to other people whith same passion for
            reading like yours. Would you like to debate Mr. Darcy's behaviour,
            analyze the next case of famous Sherlock Holmes or discuss the
            answer to the Ultimate Question of Life, the Universe, and
            Everything with others? Then the BookClub is the right place for
            you.
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default ReadingBenefit;
