import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import styles from './Navigation.module.css';
import logo from '../../assets/logo.png';
import AuthContext from '../../store/auth-context';
import SignInOut from './SignInOut';

const Navigation = () => {
  const { userName, isLoggedIn } = useContext(AuthContext);
  const [menuOpened, setMenuOpened] = useState(false);

  const menuOpenHandler = () => {
    setMenuOpened(true);
  };

  const menuCloseHandler = () => {
    setMenuOpened(false);
  };

  return (
    <header className={styles.header}>
      <Link to="/">
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
        </div>
      </Link>
      <nav className={menuOpened ? styles.openedNav : styles.navigation}>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink
              to="/books"
              activeClassName={styles.active}
              onClick={menuCloseHandler}
            >
              Books
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/book-of-the-month"
              activeClassName={styles.active}
              onClick={menuCloseHandler}
            >
              Book of the Month
            </NavLink>
          </li>
          {isLoggedIn && (
            <li>
              <NavLink
                to="/profile"
                activeClassName={styles.active}
                onClick={menuCloseHandler}
              >
                {userName + `'s Book Diary`}
              </NavLink>
            </li>
          )}
          <li>
            <NavLink
              to="/reading-benefits"
              activeClassName={styles.active}
              onClick={menuCloseHandler}
            >
              Why Reading?
            </NavLink>
          </li>
          <li>
            <SignInOut onCloseMenu={menuCloseHandler} />
          </li>
        </ul>
        <div className={styles.hamburger} onClick={menuOpenHandler}>
          &#9776;
        </div>
      </nav>
      {menuOpened && (
        <div onClick={menuCloseHandler} className={styles.closingModal}></div>
      )}
    </header>
  );
};

export default Navigation;
