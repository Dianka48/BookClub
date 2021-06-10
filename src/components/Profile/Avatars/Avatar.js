import React, { Fragment } from 'react';

import styles from './Avatar.module.css';

/**
 * @returns single avatar image
 */

const Avatar = ({ value, selected, onSelect }) => {
  const avatarImage = require(`../../../assets/avatars/${value}.png`);

  return (
    <Fragment>
      <img
        title="Choose Avatar"
        src={avatarImage.default}
        alt="avatar"
        className={
          selected === value
            ? `${styles.avatar} ${styles.selected}`
            : styles.avatar
        }
        onClick={() => onSelect(value)}
      />
    </Fragment>
  );
};

export default Avatar;
