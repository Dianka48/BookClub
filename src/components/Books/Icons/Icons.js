import React, { useState } from 'react';
import styles from './Icons.module.css';

import WishListIcon from './WishListIcon';
import ReadIcon from './ReadIcon';

const Icons = ({ wishlisted, read, onWishlistChange, onReadChange }) => {
  return (
    <div className={styles.icons}>
      <WishListIcon
        isWishlisted={wishlisted}
        onWishlistChange={onWishlistChange}
      />
      <ReadIcon isRead={read} onReadChange={onReadChange} />
    </div>
  );
};

export default Icons;
