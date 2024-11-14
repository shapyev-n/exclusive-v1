"use client";
import scss from "./CategoriesProoductPage.module.scss";
import { useGetMeQuery } from "../../../../../redux/api/auth";
import { useParams, useRouter } from "next/navigation";
import { useGetCategoriesProductQuery } from "../../../../../redux/api/category";
import SkeletonCart from "../../../../ui/SkeletonCart";
import Link from "next/link";
import { useEffect,  } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useBasketStore } from "../../../../../store/basketStore";
import { useFavoriteStore } from "../../../../../store/favoriteStore";

export default function CategoriesProoductPage() {
  const { data: user = null } = useGetMeQuery();
  const route = useRouter();
  const { category } = useParams();

  const { basketItems, addToBasket, loadBasket } = useBasketStore();
  const { favoriteData, addToFavorite, loadFavorites } = useFavoriteStore();

  useEffect(() => {
    if (user?.id) {
      loadBasket(String(user.id));
      loadFavorites(String(user.id));
    }
  }, [user?.id]);

  function truncateDescription(description, maxLength) {
    return description.length <= maxLength
      ? description
      : `${description.slice(0, maxLength)}...`;
  }
  const { data, isLoading } = useGetCategoriesProductQuery(category);

  const handleAddToBasket = (item) => {
    if (
      Array.isArray(basketItems) &&
      basketItems.find((basketItem) => basketItem.id === item.id)
    )
      return;

    if (!user?.id ) {
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

  const CategoryName = data?.map((el) => el.category).slice(0, 1);

  return (
    <div className={scss.CategoriesProoductPage}>
      <div className="container">
        <div className={scss.content}>
          {!isLoading && !data && (
            <h3>
              No products found in this category. Please try a different
              category.
            </h3>
          )}
          {data && <h1>{CategoryName}</h1>}

          <div className={scss.carts}>
            {isLoading && [1, 2, 3, 4].map((n) => <SkeletonCart key={n} />)}
            {data &&
              data?.map((el) => (
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
                          margin: "0 auto",
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
    </div>
  );
}
