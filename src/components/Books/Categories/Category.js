import styles from './Category.module.css';

/**
 * @returns single category label which can be clickable or not
 */

const Category = ({ category, extraClasses, onFilterCategory }) => {
  // Adds classes for styling
  const classesToAdd = extraClasses.map((extraClass) => styles[extraClass]);

  const clickCategoryHandler = () => {
    if (!onFilterCategory) {
      return;
    }
    onFilterCategory(category);
  };

  return (
    <div
      className={`${styles.category} ${classesToAdd.join(' ')}`}
      onClick={clickCategoryHandler}
    >
      {category}
    </div>
  );
};

export default Category;
