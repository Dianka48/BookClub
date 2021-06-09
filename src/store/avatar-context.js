import React, { useEffect, useState, useContext } from 'react';
import AuthContext from './auth-context';

// the avatar image info was needed in more components in the application (user profile, discussion)

const AvatarContext = React.createContext({
  avatar: 'avatarDefault',
  changeAvatar: (avatar) => {},
});

/**
 * @returns avatar context provider which provides info about the current user's avatar image
 */

export const AvatarContextProvider = (props) => {
  const [avatar, setAvatar] = useState('avatarDefault');
  const { isLoggedIn, email } = useContext(AuthContext);
  const [userId, setUserId] = useState('');

  // fetches the current user's avatar
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
            }
          }
        });
    } else {
      // if user did not choose an avatar yet, it sets it to default
      setAvatar('avatarDefault');
    }
  }, [isLoggedIn, email]);

  // changes the avatar in DB
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
