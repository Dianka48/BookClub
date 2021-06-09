import React from 'react';
import styles from './Icons.module.css';

import WishlistIcon from './WishlistIcon';
import ReadIcon from './ReadIcon';

/**
 * @returns 2 icons: WishlistIcon and ReadIcon
 */

const Icons = ({ wishlisted, read, onWishlistChange, onReadChange }) => {
  return (
    <div className={styles.icons}>
      <WishlistIcon
        isWishlisted={wishlisted}
        onWishlistChange={onWishlistChange}
      />
      <ReadIcon isRead={read} onReadChange={onReadChange} />
    </div>
  );
};

export default Icons;
