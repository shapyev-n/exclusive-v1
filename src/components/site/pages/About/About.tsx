"use client";
import React, { useState } from "react";
import scss from "./About.module.scss";
import { GiShop } from "react-icons/gi";
import { BiSolidBadgeDollar } from "react-icons/bi";
import { BsFillHandbagFill } from "react-icons/bs";
import { FaMoneyBill } from "react-icons/fa6";
import Commerce from "../home/HomeSections/Commerce";
import Image from "next/image";

const img =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBeA0O5xEXRiVF6i4Sxhi-jVgpXd55QsYDgckJGWDXR0b6yn1IP8uHa0g8M8pq6bc2qyY&usqp=CAU";

const About = () => {
  const [activeIndex] = useState<number | null>(null);

  return (
    <section className={scss.About}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.about_content}>
            <div className={scss.title}>
              <h1>Our Story</h1>
              <span>
                Launced in 2015, Exclusive is South Asia’s premier online
                shopping
                <br />
                makterplace with an active presense in Bangladesh. Supported
                <br /> by wide range of tailored marketing, data and service
                solutions, <br />
                Exclusive has 10,500 sallers and 300 brands and serves 3 <br />
                millioons customers across the region.
              </span>
              <span>
                Exclusive has more than 1 Million products to offer, growing at
                a
                <br />
                very fast. Exclusive offers a diverse assotment in categories
                <br />
                ranging from consumer.
              </span>
            </div>
            <div className={scss.side_image}>
              <Image width={1000} height={1000} src={img} alt="ima"/>
            </div>
          </div>
        </div>
        <div className={scss.grid_content}>
          <div className={scss.grid}>
            <div
              className={`${scss.column} ${
                activeIndex === 0 ? scss.active : ""
              }`}
            >
              <button>
                <GiShop />
              </button>
              <h3>10.5k</h3>
              <span>Sallers active our site</span>
            </div>
            <div
              className={`${scss.column} ${
                activeIndex === 1 ? scss.active : ""
              }`}
            >
              <button>
                <BiSolidBadgeDollar />
              </button>
              <h3>33k</h3>
              <span>Mapnthly Product Sale</span>
            </div>
            <div
              className={`${scss.column} ${
                activeIndex === 2 ? scss.active : ""
              }`}
            >
              <button>
                <BsFillHandbagFill />
              </button>
              <h3>45.5k</h3>
              <span>Customer active in our site</span>
            </div>
            <div
              className={`${scss.column} ${
                activeIndex === 3 ? scss.active : ""
              }`}
            >
              <button>
                <FaMoneyBill />
              </button>
              <h3>25k</h3>
              <span>Anual gross sale in our site</span>
            </div>
          </div>
        </div>
        <div className={scss.comerce}>
          <Commerce />
        </div>
      </div>
    </section>
  );
};

export default About;
