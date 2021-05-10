import React, { useCallback, useEffect, useState } from 'react';

let logoutTimer;

const AuthContext = React.createContext({
  token: '',
  email: '',
  userName: '',
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

const calculateRemainigTime = (expirationTime) => {
  const currentTimeStamp = new Date().getTime();
  const expirationTimeStamp = new Date(expirationTime).getTime();

  const remainingDurationTimeStamp = expirationTimeStamp - currentTimeStamp;

  return remainingDurationTimeStamp;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('token');
  const storedExpirationTime = localStorage.getItem('expirationTime');

  const remainigTimeStamp = calculateRemainigTime(storedExpirationTime);
  if (remainigTimeStamp < 60000) {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('email');
    localStorage.removeItem('userName');
    return null;
  }
  return {
    token: storedToken,
    duration: remainigTimeStamp,
  };
};

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

  const logoutHandler = useCallback(() => {
    setToken(null);
    setEmail('');
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userName');

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, expirationTime, email, userName) => {
    setToken(token);
    setEmail(email);
    setUserName(userName);
    localStorage.setItem('token', token);
    localStorage.setItem('expirationTime', expirationTime);
    localStorage.setItem('userName', userName);
    localStorage.setItem('email', email);

    const remainingTime = calculateRemainigTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

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
