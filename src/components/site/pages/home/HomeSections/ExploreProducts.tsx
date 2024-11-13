"use client";
import React, { FC, useEffect } from "react";
import scss from "./ExploreProducts.module.scss";
import { useGetProductsQuery } from "../../../../../redux/api/product";
import SkeletonCart from "../../../../ui/SkeletonCart";
import { useGetMeQuery } from "../../../../../redux/api/auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useBasketStore } from "../../../../../store/basketStore";
import { useFavoriteStore } from "../../../../../store/favoriteStore";

const ExploreProducts: FC = () => {
  const { data: product, isLoading } = useGetProductsQuery();
  const { data: user = null } = useGetMeQuery();
  const { data: session = null } = useSession();
  const route = useRouter();

  const { basketItems, addToBasket, loadBasket } = useBasketStore();
  const { favoriteData, addToFavorite, loadFavorites } = useFavoriteStore();

  useEffect(() => {
    if (user?.id) {
      loadBasket(String(user.id));
      loadFavorites(String(user.id));
    }
  }, [user?.id]);

  function truncateDescription(description: string, maxLength: number): string {
    return description.length <= maxLength
      ? description
      : `${description.slice(0, maxLength)}...`;
  }

  const handleAddToBasket = (item) => {
    if (
      Array.isArray(basketItems) &&
      basketItems.find((basketItem) => basketItem.id === item.id)
    )
      return;

    if (!user?.id && !session) {
      route.push("/sign-in");
      return;
    }

    addToBasket(String(user.id), { ...item, quantity: 1 });
  };

  const handleAddToFavorite = (item) => {
    if (favoriteData.find((favoriteItem) => favoriteItem.id === item.id))
      return;

    if (!user && !session) {
      route.push("/sign-in");
      return;
    }

    addToFavorite(String(user.id), item);
  };

  return (
    <section className={scss.ExploreProducts}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.title}>
            <div className={scss.box}></div>
            <h2>Our Products</h2>
          </div>
          <div className={scss.title2}>
            <h1>Explore Our Products</h1>
          </div>
          <div className={scss.carts}>
            {isLoading && [1, 2, 3, 4].map((n) => <SkeletonCart key={n} />)}
            {product &&
              product?.map((el) => (
                <div className={scss.cart} key={el.id}>
                  <Link href={`/details/${el.id}`}>
                    <div className={scss.svg}>
                      <img src={el.image} alt={el.title} />
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

                          opacity: favoriteData.find(
                            (item) => item.id === el.id
                          )
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
                          gap: "20px",
                        }}
                      >
                        <s style={{ fontSize: "12px" }}>{el.price}$</s>
                        <p>{el.salePrice}$</p>
                      </div>
                    )}
                    {!el.salePrice && <p>{el.price}$</p>}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <Link href="/all-products">
        <button className={scss.btn1}>View All Products</button>
      </Link>
    </section>
  );
};

export default ExploreProducts;
