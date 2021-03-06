import React, { Fragment, useState } from 'react';
import styles from './Icons.module.css';

/**
 * @returns clickable WishlistIcon for adding and removing books to wishlist
 */

const WishlistIcon = ({ isWishlisted, onWishlistChange }) => {
  const [wishlisted, setWishlisted] = useState(isWishlisted);

  const handleClickWishlist = () => {
    onWishlistChange(wishlisted);
    setWishlisted((prev) => !prev);
  };

  // Returns either filled in icon or empty icon depending on the state if the book is in user's wishlist or not
  return (
    <Fragment>
      {!wishlisted && (
        <div className={styles.iconContainer}>
          <div
            className={styles.notInWishlist}
            title="Add to Wishlist"
            onClick={handleClickWishlist}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M12 9.229c.234-1.12 1.547-6.229 5.382-6.229 2.22 0 4.618 1.551 4.618 5.003 0 3.907-3.627 8.47-10 12.629-6.373-4.159-10-8.722-10-12.629 0-3.484 2.369-5.005 4.577-5.005 3.923 0 5.145 5.126 5.423 6.231zm-12-1.226c0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-7.962-9.648-9.028-12-3.737-2.338-5.262-12-4.27-12 3.737z" />
            </svg>
          </div>
          <span className={styles.tooltip}>Add to Wishlist</span>
        </div>
      )}
      {wishlisted && (
        <div className={styles.iconContainer}>
          <div
            className={styles.wishlisted}
            title="Remove from Wishlist"
            onClick={handleClickWishlist}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z" />
            </svg>
          </div>
          <span className={styles.tooltip}>Remove from Wishlist</span>
        </div>
      )}
    </Fragment>
  );
};

export default WishlistIcon;
