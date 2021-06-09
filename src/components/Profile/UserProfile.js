import React, { Fragment, useContext, useEffect, useState } from 'react';

import styles from './UserProfile.module.css';
import Category from '../Books/Categories/Category';
import LoadingSpinner from '../UI/LoadingSpinner';
import AuthContext from '../../store/auth-context';
import Wishlist from './Wishlist';
import Read from './Read';
import ReadBooksContext from '../../store/readBooks-context';
import AvatarContext from '../../store/avatar-context';
import AvatarForm from './Avatars/AvatarForm';

/**
 * @returns the content of the user profile page, the avatar, wishlist and read books category labels and books for the selected category
 */

const UserProfile = () => {
  // retrieves the selected category from local storage or sets it to default - wishlist
  const [filteredCategory, setFilteredCategory] = useState(
    localStorage.getItem('category')
      ? localStorage.getItem('category')
      : 'wishlist',
  );
  const [fetchedBooks, setFetchedBooks] = useState(null);
  const [booksAreLoading, setBooksAreLoading] = useState(true);
  const [userDataAreLoading, setUserDataAreLoading] = useState(true);
  const [whishlistedBookObj, setWishListedBookObj] = useState(null);
  const [readBookObj, setReadBookObj] = useState(null);
  const [userId, setUserId] = useState('');
  const [choosingAvatar, setChoosingAvatar] = useState(false);
  const [newDate, setNewDate] = useState(null);

  const { readBooksNum } = useContext(ReadBooksContext);
  const { avatar } = useContext(AvatarContext);

  const isLoading = booksAreLoading || userDataAreLoading;

  const { email, userName } = useContext(AuthContext);

  const avatarImage = require(`../../assets/avatars/${avatar}.png`);

  // changes the filtered category (wishlist or read books) and stores it in local storage
  const onFilterCategory = (selectedCategory) => {
    setFilteredCategory(selectedCategory);
    localStorage.setItem('category', selectedCategory);
  };

  // opens the form for choosing the avatar
  const avatarClickHandler = () => {
    setChoosingAvatar(true);
  };

  // closes the form for choosing the avatar
  const avatarCloseHandler = () => {
    setChoosingAvatar(false);
  };

  // changes the state of the new selected date when user submits the form
  const changeDateHandler = (dateObj) => {
    setNewDate(dateObj);
  };

  // fetches all the books from DB
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

  // fetches all the user data from DB (userId, wishlisted books, read books)
  useEffect(() => {
    setUserDataAreLoading(true);
    fetch(
      `https://bookclub-b44e0-default-rtdb.europe-west1.firebasedatabase.app/users.json?orderBy="email"&equalTo="${email}"`,
    )
      .then((response) => response.json())
      .then((data) => {
        for (const key in data) {
          setWishListedBookObj(
            data[key]?.lists?.wishlisted ? data[key].lists.wishlisted : null,
          );
          setReadBookObj(data[key]?.lists?.read ? data[key].lists.read : null);
          setUserId(key);
        }
        setUserDataAreLoading(false);
      });
  }, [email, filteredCategory, newDate]);

  return (
    <Fragment>
      {/* Renders the avatar form when user clicks on the button for choosing avatar */}
      {choosingAvatar && <AvatarForm onClose={avatarCloseHandler} />}
      <div className={styles.welcome}>
        <div className={styles.changeAvatar} onClick={avatarClickHandler}>
          <img
            title="Change Avatar"
            className={styles.avatar}
            src={avatarImage.default}
            alt="avatar"
          />
          <p className={styles.button}>Change Avatar</p>
        </div>
        <h1>Welcome to your Book Diary, {userName}</h1>
        <p className={styles.readBooks}>
          {' '}
          {readBooksNum === 0
            ? `You haven't read any`
            : `You have read ${readBooksNum}`}{' '}
          {readBooksNum === 1 ? 'book' : 'books'} so far.
        </p>
      </div>
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
      {/* Renders books according to filtered category chosen by the user */}
      {filteredCategory === 'wishlist' && !isLoading && (
        <Wishlist
          userId={userId}
          allBooks={fetchedBooks}
          wishlistedBooksObj={whishlistedBookObj}
        />
      )}
      {filteredCategory === 'books i read' && !isLoading && (
        <Read
          onChangeDateInProfile={changeDateHandler}
          userId={userId}
          allBooks={fetchedBooks}
          readBooksObj={readBookObj}
        />
      )}
    </Fragment>
  );
};

export default UserProfile;
