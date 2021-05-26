import React, { useEffect, useState, useContext } from 'react';
import AuthContext from './auth-context';

const AvatarContext = React.createContext({
  avatar: 'avatarDefault',
  changeAvatar: (avatar) => {},
});

export const AvatarContextProvider = (props) => {
  const [avatar, setAvatar] = useState('avatarDefault');
  const { isLoggedIn, email } = useContext(AuthContext);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      fetch(
        `https://bookclub-b44e0-default-rtdb.europe-west1.firebasedatabase.app/users.json?orderBy="email"&equalTo="${email}"`,
      )
        .then((response) => response.json())
        .then((data) => {
          for (const key in data) {
            setUserId(key);
            const userAvatar = data[key]?.avatar;
            if (userAvatar) {
              setAvatar(userAvatar);
            } else {
              setAvatar('avatarDefault');
            }
          }
        });
    } else {
      setAvatar('avatarDefault');
    }
  }, [isLoggedIn, email]);

  const changeAvatar = (selectedAvatar) => {
    setAvatar(selectedAvatar);
    fetch(
      `https://bookclub-b44e0-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json`,
      {
        method: 'PATCH',
        body: JSON.stringify({ avatar: selectedAvatar }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    ).catch((err) => console.error(err.message));
  };

  const contextValue = {
    avatar,
    changeAvatar,
  };

  return (
    <AvatarContext.Provider value={contextValue}>
      {props.children}
    </AvatarContext.Provider>
  );
};

export default AvatarContext;
