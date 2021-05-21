import Category from './Category';
import styles from './Categories.module.css';

const Categories = ({ onFilterCategory }) => {
  return (
    <div className={styles.categories}>
      <Category
        category="all"
        extraClasses={['all', 'clickable']}
        onFilterCategory={onFilterCategory}
      />
      <Category
        category="crime"
        extraClasses={['crime', 'clickable']}
        onFilterCategory={onFilterCategory}
      />
      <Category
        category="fantasy"
        extraClasses={['fantasy', 'clickable']}
        onFilterCategory={onFilterCategory}
      />
      <Category
        category="romance"
        extraClasses={['romance', 'clickable']}
        onFilterCategory={onFilterCategory}
      />
      <Category
        category="classics"
        extraClasses={['classics', 'clickable']}
        onFilterCategory={onFilterCategory}
      />
      <Category
        category="horror"
        extraClasses={['horror', 'clickable']}
        onFilterCategory={onFilterCategory}
      />
      <Category
        category="sci-fi"
        extraClasses={['sci-fi', 'clickable']}
        onFilterCategory={onFilterCategory}
      />
    </div>
  );
};

export default Categories;
