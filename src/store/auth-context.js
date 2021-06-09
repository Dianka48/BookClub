import React, { useCallback, useEffect, useState } from 'react';

let logoutTimer;

// The info about user's authentication was needed in the whole application

const AuthContext = React.createContext({
  token: '',
  email: '',
  userName: '',
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

// Calculates remaining time when user will be logged out (firebase authentication token is valid for 30 minutes)
const calculateRemainigTime = (expirationTime) => {
  const currentTimeStamp = new Date().getTime();
  const expirationTimeStamp = new Date(expirationTime).getTime();

  const remainingDurationTimeStamp = expirationTimeStamp - currentTimeStamp;

  return remainingDurationTimeStamp;
};

// retrieves the token from local storage
const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('token');
  const storedExpirationTime = localStorage.getItem('expirationTime');

  // if remaining time is under 60 seconds the auth info in local storage will be cleared and null will be returned
  const remainigTimeStamp = calculateRemainigTime(storedExpirationTime);
  if (remainigTimeStamp < 60000) {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('email');
    localStorage.removeItem('userName');
    return null;
  }
  // else the token and remaining time stamp will be returned
  return {
    token: storedToken,
    duration: remainigTimeStamp,
  };
};

/**
 * @returns the auth context provider that provides info about the user authentication (email, userName, isLoggendIn and login and logout functions)
 */

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }

  const initialEmail = localStorage.getItem('email');
  const initialUserName = localStorage.getItem('userName');

  const [token, setToken] = useState(initialToken);
  const [email, setEmail] = useState(initialEmail);
  const [userName, setUserName] = useState(initialUserName);

  const userLoggedIn = !!token;

  // when user logs out local storage auth info is cleared, token is set to null adn email is set to empty string
  const logoutHandler = useCallback(() => {
    setToken(null);
    setEmail('');
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userName');

    // logout timer is cleared
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  // when user is logged in token, email and user name are set and auth info is set to local storage
  const loginHandler = (token, expirationTime, email, userName) => {
    setToken(token);
    setEmail(email);
    setUserName(userName);
    localStorage.setItem('token', token);
    localStorage.setItem('expirationTime', expirationTime);
    localStorage.setItem('userName', userName);
    localStorage.setItem('email', email);

    const remainingTime = calculateRemainigTime(expirationTime);
    // logout timer is set - the user will be logged out after remaining time will expire
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  // sets the logout timer - the user will be logged out after token data will expire
  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    email: email,
    userName: userName,
    isLoggedIn: userLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
