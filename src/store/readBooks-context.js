import React, { useEffect, useState, useContext } from 'react';
import AuthContext from './auth-context';

const ReadBooksContext = React.createContext({
  readBooksNum: null,
  removeReadBook: () => {},
});

export const ReadBooksContextProvider = (props) => {
  const [readBooks, setReadBooks] = useState(null);
  const { isLoggedIn, email } = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn) {
      fetch(
        `https://bookclub-b44e0-default-rtdb.europe-west1.firebasedatabase.app/users.json?orderBy="email"&equalTo="${email}"`,
      )
        .then((response) => response.json())
        .then((data) => {
          for (const key in data) {
            const userReadBooks = data[key]?.lists?.read;
            if (userReadBooks) {
              const userReadBooksNum = Object.keys(userReadBooks).length;
              setReadBooks(userReadBooksNum);
            } else setReadBooks(0);
          }
        });
    }
  }, [isLoggedIn, email]);

  const removeBook = () => {
    setReadBooks((prev) => prev - 1);
  };

  const contextValue = {
    readBooksNum: readBooks,
    removeReadBook: removeBook,
  };

  return (
    <ReadBooksContext.Provider value={contextValue}>
      {props.children}
    </ReadBooksContext.Provider>
  );
};

export default ReadBooksContext;
