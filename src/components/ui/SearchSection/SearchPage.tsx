"use client";

import React, { useEffect } from "react";
import scss from "./SearchPage.module.scss";
import { useGetSearchQuery } from "../../../redux/api/search";
import { useSearchQueryStore } from "../../../store/useSearchQueryStore";
import SkeletonCart from "../SkeletonCart";
import Link from "next/link";
import { useGetMeQuery } from "../../../redux/api/auth";
import { useRouter } from "next/navigation";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useBasketStore } from "../../../store/basketStore";
import { useFavoriteStore } from "../../../store/favoriteStore";
import Image from "next/image";

const SearchPage = () => {
  const { query } = useSearchQueryStore();
  const { data: user = null } = useGetMeQuery();
  const route = useRouter();
  const { basketItems, addToBasket, loadBasket } = useBasketStore();
  const { favoriteData, addToFavorite, loadFavorites } = useFavoriteStore();

  useEffect(() => {
    if (user?.id) {
      loadBasket(String(user.id));
      loadFavorites(String(user.id));
    }
  }, [user?.id, loadBasket, loadFavorites]);

  const { data = [], isLoading } = useGetSearchQuery(query, {
    skip: !query,
  });

  function truncateDescription(description, maxLength) {
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

    if (!user?.id) {
      route.push("/sign-in");
      return;
    }

    addToBasket(String(user.id), { ...item, quantity: 1 });
  };

  const handleAddToFavorite = (item) => {
    if (favoriteData.find((favoriteItem) => favoriteItem.id === item.id))
      return;

    if (!user ) {
      route.push("/sign-in");
      return;
    }

    addToFavorite(String(user.id), item);
  };

  return (
    <section className={scss.SearchPage}>
      <div className="container">
        <div className={scss.content}>
          <h1>Search Result:</h1>
          <div className={scss.carts}>
            {isLoading && [1, 2, 3, 4].map((n) => <SkeletonCart key={n} />)}
            {!isLoading && data?.length === 0 && (
              <center>
                No products found for the search query &ldquo;{query}&ldquo;.
                Please try a different query.
              </center>
            )}
            {data?.map((el) => (
              <div className={scss.cart} key={el.id}>
                <Link href={`/details/${el.id}`}>
                  <div className={scss.svg}>
                    <Image src={el.image} width={200} height={150} alt={el.title} />
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
    </section>
  );
};

export default SearchPage;
