import React, { Fragment, useContext, useEffect, useState } from 'react';

import styles from './UserProfile.module.css';
import Category from '../Books/Categories/Category';
import LoadingSpinner from '../UI/LoadingSpinner';
import AuthContext from '../../store/auth-context';
import Wishlist from './Wishlist';
import Read from './Read';

const UserProfile = () => {
  const [filteredCategory, setFilteredCategory] = useState('wishlist');
  const [fetchedBooks, setFetchedBooks] = useState(null);
  const [booksAreLoading, setBooksAreLoading] = useState(true);
  const [userDataAreLoading, setUserDataAreLoading] = useState(true);
  const [whishlistedBookObj, setWishListedBookObj] = useState(null);
  const [readBookObj, setReadBookObj] = useState(null);
  const [userId, setUserId] = useState('');

  const isLoading = booksAreLoading || userDataAreLoading;

  const { email, userName } = useContext(AuthContext);

  const onFilterCategory = (selectedCategory) => {
    setFilteredCategory(selectedCategory);
  };

  useEffect(() => {
    setBooksAreLoading(true);
    fetch(
      'https://bookclub-b44e0-default-rtdb.europe-west1.firebasedatabase.app/books.json',
    )
      .then((response) => response.json())
      .then((data) => {
        for (const key in data) {
          data[key].bookId = key;
        }
        setFetchedBooks(data);
        setBooksAreLoading(false);
      });
  }, [filteredCategory]);

  useEffect(() => {
    setUserDataAreLoading(true);
    fetch(
      `https://bookclub-b44e0-default-rtdb.europe-west1.firebasedatabase.app/users.json?orderBy="email"&equalTo="${email}"`,
    )
      .then((response) => response.json())
      .then((data) => {
        for (const key in data) {
          setWishListedBookObj(
            data[key].lists.wishlisted ? data[key].lists.wishlisted : null,
          );
          setReadBookObj(data[key].lists.read ? data[key].lists.read : null);
          setUserId(key);
        }
        setUserDataAreLoading(false);
      });
  }, [email, filteredCategory]);

  return (
    <Fragment>
      <h1>Welcome to your Book Diary, {userName}</h1>
      <div className={styles.categories}>
        <Category
          category="wishlist"
          extraClasses={['wishlist', 'clickable']}
          onFilterCategory={onFilterCategory}
        />
        <Category
          category="books i read"
          extraClasses={['read', 'clickable']}
          onFilterCategory={onFilterCategory}
        />
      </div>
      {isLoading && <LoadingSpinner />}
      {filteredCategory === 'wishlist' && !isLoading && (
        <Wishlist
          userId={userId}
          allBooks={fetchedBooks}
          wishlistedBooksObj={whishlistedBookObj}
        />
      )}
      {filteredCategory === 'books i read' && !isLoading && (
        <Read
          userId={userId}
          allBooks={fetchedBooks}
          readBooksObj={readBookObj}
        />
      )}
    </Fragment>
  );
};

export default UserProfile;
