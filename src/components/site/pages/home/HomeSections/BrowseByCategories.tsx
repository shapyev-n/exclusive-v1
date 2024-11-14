"use client";
import  { useEffect, useState } from "react";

import scss from "./BrowseByCategories.module.scss";
import { categories } from "../../../../../helpers/links";
import { useRouter } from "next/navigation";

const BrowseByCategories = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("");


  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory);
  };

    useEffect(() => {
      if (!selectedCategory) {
        router.push("/");
      } else {
        router.push(`/categories/${selectedCategory}`);
      }
    }, [selectedCategory, router]);



  return (
    <section className={scss.BrowseByCategories}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.title}>
            <div className={scss.block}></div>
            <h1>Categories</h1>
          </div>
          <div className={scss.title2}>
            <h1>Browse By Category</h1>
          </div>
          <div className={scss.boxes}>
            {categories.map((category, index) => (
              <div
                key={index}
                className={`${scss.box} ${
                  selectedCategory === category.label ? scss.active : ""
                }`}
                onClick={() => handleCategoryChange(category.label)}
              >
                <h1>{category.icon}</h1>
                <h2>{category.label}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrowseByCategories;
