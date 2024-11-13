import React from "react";
import Welcome from "./HomeSections/Welcome";
import Cart from "./HomeSections/Cart";
import BrowseByCategories from "./HomeSections/BrowseByCategories";
import BestProducts from "./HomeSections/BestProducts";
import Music from "./HomeSections/Music";
import ExploreProducts from "./HomeSections/ExploreProducts";
import Commerce from "./HomeSections/Commerce";

const HomePage = () => {
  return (
    <>
      <Welcome />
      <Cart />
      <BrowseByCategories />
      <BestProducts />
      <Music />
      <ExploreProducts />
      <Commerce />
    </>
  );
};

export default HomePage;
