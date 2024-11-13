import React from "react";
import scss from "./SkeletonCart.module.scss"; 

const SkeletonCart = () => {
  return (
    <div className={scss.cart}>
      <div className={scss.svg}>
        <div className={scss.skeletonImage}></div>
      </div>
      <div className={scss.title}>
        <div className={scss.skeletonTitle}></div>
        <div className={scss.skeletonPrice}></div>
        <div className={scss.skeletonRate}></div>
      </div>
    </div>
  );
};

export default SkeletonCart;
