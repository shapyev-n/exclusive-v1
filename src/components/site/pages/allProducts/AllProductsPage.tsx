"use client";
import { useEffect, useState } from "react";
import { useGetProductsQuery } from "../../../../redux/api/product";
import { useGetTimeQuery } from "../../../../redux/api/time";
import scss from "./AllProductsPage.module.scss";
import Timer from "../../../ui/Timer";
import SkeletonCart from "../../../ui/SkeletonCart";
import Link from "next/link";
import { useGetMeQuery } from "../../../../redux/api/auth";
import { useRouter } from "next/navigation";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useBasketStore } from "../../../../store/basketStore";
import { useFavoriteStore } from "../../../../store/favoriteStore";
import Image from "next/image";

export default function AllProductsPage() {
  const { data: timeData = [] } = useGetTimeQuery();
  const { data: user = null } = useGetMeQuery();
  const route = useRouter();
  const { data: productData, isLoading: productLoading } =
    useGetProductsQuery();

  const [sortData, setSortData] = useState("");
  const { basketItems, addToBasket, loadBasket } = useBasketStore();
  const { favoriteData, addToFavorite, loadFavorites } = useFavoriteStore();

  useEffect(() => {
    if (user?.id) {
      loadBasket(String(user.id));
      loadFavorites(String(user.id));
    }
  }, [user?.id, loadBasket, loadFavorites]);

  function truncateDescription(description, maxLength) {
    return description.length <= maxLength
      ? description
      : `${description.slice(0, maxLength)}...`;
  }

  const targetDate = timeData
    .filter((el) => el?.name === "cart")
    .map((el) => new Date(el?.time))[0];
  if (targetDate) {
    targetDate.setHours(targetDate.getHours() + 120);
  }

  const productDataCartSalePrice = productData
    ?.filter((el) => el?.salePrice !== null)
    .sort((a, b) => {
      if (sortData === "") return 0;
      if (sortData === "asc")
        return (a.salePrice || a.price) - (b.salePrice || b.price);
      return (b.salePrice || b.price) - (a.salePrice || a.price);
    });
  const productDataCart = productData
    ?.filter((el) => el?.salePrice === null)
    .sort((a, b) => {
      if (sortData === "") return 0;
      if (sortData === "asc") return a.price - b.price;
      return b.price - a.price;
    });

  const handleAddToBasket = (item) => {
    if (
      Array.isArray(basketItems) &&
      basketItems.find((basketItem) => basketItem.id === item.id)
    )
      return;

    if (!user?.id) {
      route.push("/sign-in");
      return;
    }

    addToBasket(String(user.id), { ...item, quantity: 1 });
  };

  const handleAddToFavorite = (item) => {
    if (favoriteData.find((favoriteItem) => favoriteItem.id === item.id))
      return;

    if (!user) {
      route.push("/sign-in");
      return;
    }

    addToFavorite(String(user.id), item);
  };

  return (
    <div className={scss.AllProductsPage}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.sort}>
            <span style={{ opacity: "0.5", fontSize: "14px" }}>
              All products: {productData?.length}
            </span>
            <select
              value={sortData}
              onChange={(e) => setSortData(e.target.value)}
            >
              <option value="asc">Lowest Price</option>
              <option value="desc">Highest Price</option>
              <option value="">Reset</option>
            </select>
          </div>
          {targetDate && <Timer targetDate={targetDate} />}

          <div className={scss.carts}>
            {productLoading &&
              [1, 2, 3, 4].map((n) => <SkeletonCart key={n} />)}
            {productDataCartSalePrice?.length === 0 && (
              <center>No products with sale price</center>
            )}
            {productDataCartSalePrice?.map((el) => (
              <div className={scss.cart} key={el.id}>
                <Link href={`/details/${el.id}`}>
                  <div className={scss.svg}>
                    <Image
                      src={el.image}
                      width={200}
                      height={150}
                      alt={el.title}
                    />
                  </div>
                </Link>
                <div className={scss.btns}>
                  <button
                    className={
                      !!basketItems.find((item) => item.id === el.id)
                        ? `${scss.addToCartBtn} ${scss.disabled}`
                        : `${scss.addToCartBtn}`
                    }
                    onClick={() => handleAddToBasket(el)}
                    disabled={!!basketItems.find((item) => item.id === el.id)}
                  >
                    {basketItems.find((item) => item.id === el.id)
                      ? "Already in Basket"
                      : "Add To Cart"}
                  </button>

                  <span onClick={() => handleAddToFavorite(el)}>
                    <FavoriteIcon
                      sx={{
                        fontSize: "40px",
                        color: favoriteData.find((item) => item.id === el.id)
                          ? "red"
                          : "black",

                        opacity: favoriteData.find((item) => item.id === el.id)
                          ? "1"
                          : "0.5",
                      }}
                    />
                  </span>
                </div>

                <div className={scss.title}>
                  <h1>{truncateDescription(el.title, 20)}</h1>
                  {el.salePrice && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "center",
                        gap: "20px",
                      }}
                    >
                      <s style={{ fontSize: "10px" }}>{el.price}$</s>
                      <p>{el.salePrice}$</p>
                    </div>
                  )}
                  {!el.salePrice && (
                    <p style={{ color: "#000" }}>{el.price}$</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <h1 style={{ fontSize: "25px", marginBlock: "20px" }}>
            All Products
          </h1>
          <div className={scss.carts}>
            {productLoading &&
              [1, 2, 3, 4].map((n) => <SkeletonCart key={n} />)}
            {productDataCart?.length === 0 && (
              <center>
                No products found in this category. Please try a different one.
              </center>
            )}
            {productDataCart?.map((el) => (
              <div className={scss.cart} key={el.id}>
                <Link href={`/details/${el.id}`}>
                  <div className={scss.svg}>
                    <Image
                      src={el.image}
                      width={200}
                      height={150}
                      alt={el.title}
                    />
                  </div>
                </Link>
                <div className={scss.btns}>
                  <button
                    className={
                      !!basketItems.find((item) => item.id === el.id)
                        ? `${scss.addToCartBtn} ${scss.disabled}`
                        : `${scss.addToCartBtn}`
                    }
                    onClick={() => handleAddToBasket(el)}
                    disabled={!!basketItems.find((item) => item.id === el.id)}
                  >
                    {basketItems.find((item) => item.id === el.id)
                      ? "Already in Basket"
                      : "Add To Cart"}
                  </button>

                  <span onClick={() => handleAddToFavorite(el)}>
                    <FavoriteIcon
                      sx={{
                        fontSize: "40px",
                        color: favoriteData.find((item) => item.id === el.id)
                          ? "red"
                          : "black",

                        opacity: favoriteData.find((item) => item.id === el.id)
                          ? "1"
                          : "0.5",
                      }}
                    />
                  </span>
                </div>

                <div className={scss.title}>
                  <h1>{truncateDescription(el.title, 20)}</h1>
                  {el.salePrice && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "center",
                        gap: "20px",
                      }}
                    >
                      <s style={{ fontSize: "10px" }}>{el.price}$</s>
                      <p>{el.salePrice}$</p>
                    </div>
                  )}
                  {!el.salePrice && (
                    <p style={{ color: "#000" }}>{el.price}$</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
