import React, { FC } from "react";
import scss from "./Featured.module.scss";

const Featured: FC = () => {
  return (
    <section className={scss.Featured}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.title}>
            <div className={scss.box}></div>
            <h2>Featured</h2>
          </div>
          <div className={scss.title2}>
            <h1> New Arrival</h1>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Featured;
