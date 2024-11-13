import scss from "./Categories.module.scss";
import { categories } from "../../../../../helpers/links";

const Categories = ({ selectedCategory, handleCategoryChange }) => {
  return (
    <section className={scss.Categories}>
      <div className="container">
        <div className={scss.content}>
          {categories.map((category, index) => (
            <div
              key={index}
              className={`${scss.box} ${
                selectedCategory === category.label ? scss.active : ""
              }`}
              onClick={() => handleCategoryChange(category.label)}
            >
              <span>{category.icon}</span>
              <p>{category.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
