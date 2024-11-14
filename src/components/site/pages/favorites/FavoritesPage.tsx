"use client";
import { useGetMeQuery } from "../../../../redux/api/auth";
import scss from "./FavoritesPage.module.scss";
import { useRouter } from "next/navigation";
import { useBasketStore } from "../../../../store/basketStore";
import { useFavoriteStore } from "../../../../store/favoriteStore";
import { useEffect } from "react";
import Link from "next/link";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Button } from "@mui/material";
import Image from "next/image";

export default function FavoritesPage() {
  const { data: user = null, isLoading } = useGetMeQuery();
  const route = useRouter();

  const { basketItems, addToBasket, loadBasket } = useBasketStore();
  const { favoriteData, removeFromFavorite, loadFavorites } =
    useFavoriteStore();

  useEffect(() => {
    if (user?.id) {
      loadBasket(String(user.id));
      loadFavorites(String(user.id));
    }
  }, [user?.id, loadBasket, loadFavorites]);

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

    if (!user?.id) {
      route.push("/sign-in");
      return;
    }

    addToBasket(String(user.id), { ...item, quantity: 1 });
  };

  const handleAddToFavorite = (item) => {
    if (favoriteData.find((favoriteItem) => favoriteItem.id === item.id)) {
      removeFromFavorite(String(user.id), item.id);
      return;
    }
  };
  return (
    <div className={scss.FavoritesPage}>
      <div className="container">
        <div className={scss.content}>
          <h1>My Favorites</h1>
          {isLoading && (
            <center style={{ margin: "50px auto" }}>loading...</center>
          )}
          {!isLoading && !user && (
            <center style={{ padding: "50px 0" }}>
              <Button
                variant="contained"
                sx={{ background: "#000" }}
                onClick={() => route.push("/sign-in")}
              >
                Sign In
              </Button>
            </center>
          )}
          {user && favoriteData && favoriteData.length === 0 && (
            <center style={{ padding: "50px 0" }}>
              <h3 style={{ marginBottom: "20px" }}>
                You haven&apos;t added any favorite products yet.
              </h3>
              <p>
                You can add products to your favorites by clicking on the heart
                icon next to each product on the product page.
              </p>
            </center>
          )}
          {user && favoriteData && (
            <div className={scss.carts}>
              {favoriteData &&
                favoriteData.map((el) => (
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
                        disabled={
                          !!basketItems.find((item) => item.id === el.id)
                        }
                      >
                        {basketItems.find((item) => item.id === el.id)
                          ? "Already in Basket"
                          : "Add To Cart"}
                      </button>

                      <span onClick={() => handleAddToFavorite(el)}>
                        <FavoriteIcon
                          sx={{
                            fontSize: "40px",
                            color: favoriteData.find(
                              (item) => item.id === el.id
                            )
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
          )}
        </div>
      </div>
    </div>
  );
}
