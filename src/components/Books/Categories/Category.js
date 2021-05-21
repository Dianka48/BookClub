import styles from './Category.module.css';

const Category = ({ category, extraClasses, onFilterCategory }) => {
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
