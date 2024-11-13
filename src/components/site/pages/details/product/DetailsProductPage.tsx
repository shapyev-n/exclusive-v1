"use client";
import { useParams, useRouter } from "next/navigation";
import { useGetItemProductQuery } from "../../../../../redux/api/product";
import scss from "./DetailsProductPage.module.scss";
import { useGetMeQuery } from "../../../../../redux/api/auth";
import { useSession } from "next-auth/react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useEffect } from "react";
import { useBasketStore } from "../../../../../store/basketStore";
import { useFavoriteStore } from "../../../../../store/favoriteStore";

export default function DetailsProductPage() {
  const { data: user = null } = useGetMeQuery();
  const { data: session = null } = useSession();
  const route = useRouter();
  const { id } = useParams();


  const { basketItems, addToBasket, loadBasket } = useBasketStore();
  const { favoriteData, addToFavorite, loadFavorites } = useFavoriteStore();

  useEffect(() => {
    if (user?.id) {
      loadBasket(String(user.id));
      loadFavorites(String(user.id));
    }
  }, [user?.id]);

  const {
    data = null,
    error,
    isLoading,
  } = useGetItemProductQuery(id);

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

  if (isLoading)
    return (
      <p
        style={{
          fontSize: "30px",
          height: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Loading...
      </p>
    );
  if (error)
    return <center style={{ color: "red", fontSize: "20px" }}>Error ❌</center>;

  return (
    <div className={scss.DetailsProductPage}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.img}>
            <img src={data?.image} alt={data?.title} />
          </div>
          <div className={scss.about}>
            <h1>{data?.title}</h1>
            <p>
              Categories: <span>{data?.category}</span>
            </p>
            <p>{data?.description}</p>
            <p>
              Pieces left: <span>{data?.count}</span>
            </p>

            <div className={scss.price_box}>
              {data.salePrice === null && (
                <p>
                  Price:
                  <span className={scss.price}>${data?.price}</span>
                </p>
              )}
              {data.salePrice !== null && (
                <p className={scss.prise_sale}>
                  Price: <span className={scss.sale}>${data?.salePrice}</span>
                  <s>${data?.price}</s>
                </p>
              )}
              <div className={scss.btns}>
                <button
                  className={
                    !!basketItems.find((item) => item.id === data.id)
                      ? `${scss.addToCartBtn} ${scss.disabled}`
                      : `${scss.addToCartBtn}`
                  }
                  onClick={() => handleAddToBasket(data)}
                  disabled={!!basketItems.find((item) => item.id === data.id)}
                >
                  {basketItems.find((item) => item.id === data.id)
                    ? "Already in Basket"
                    : "Add To Cart"}
                </button>

                <span onClick={() => handleAddToFavorite(data)}>
                  <FavoriteIcon
                    sx={{
                      fontSize: "40px",
                      color: favoriteData.find((item) => item.id === data.id)
                        ? "red"
                        : "black",

                      opacity: favoriteData.find((item) => item.id === data.id)
                        ? "1"
                        : "0.5",
                    }}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
