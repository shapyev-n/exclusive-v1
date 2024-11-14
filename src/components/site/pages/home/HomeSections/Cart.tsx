"use client";
import scss from "./Cart.module.scss";
import { useGetProductsQuery } from "../../../../../redux/api/product";
import SkeletonCart from "../../../../ui/SkeletonCart";
import Timer from "../../../../ui/Timer";
import Link from "next/link";
import { useGetTimeQuery } from "../../../../../redux/api/time";
import "react-toastify/dist/ReactToastify.css";
import { useGetMeQuery } from "../../../../../redux/api/auth";
import { useRouter } from "next/navigation";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useBasketStore } from "../../../../../store/basketStore";
import { useFavoriteStore } from "../../../../../store/favoriteStore";
import { useEffect } from "react";

const Cart = () => {
  const { data: user = null } = useGetMeQuery();
  const route = useRouter();

  const { basketItems, addToBasket, loadBasket } = useBasketStore();
  const { favoriteData, addToFavorite, loadFavorites } = useFavoriteStore();

  useEffect(() => {
    if (user?.id) {
      loadBasket(String(user.id));
      loadFavorites(String(user.id));
    }
  }, [user?.id]);

  const { data: productData, isLoading: productLoading } =
    useGetProductsQuery();
  const { data: timeData = [] } = useGetTimeQuery();

  function truncateDescription(description: string, maxLength: number): string {
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

  const productDataCart = productData
    ?.filter((el) => el?.salePrice !== null)
    .sort((a, b) => a.salePrice - b.salePrice)
    .slice(0, 10);

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

  return (
    <section className={scss.Cart}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.title}>
            <div className={scss.box}></div>
            <h2>Today&apos;s</h2>
          </div>
          <div className={scss.title2}>
            <h1>Flash Sales</h1>
            {targetDate && <Timer targetDate={targetDate} />}
            {!targetDate && <Timer targetDate={targetDate} />}
          </div>
          <div className={scss.carts}>
            {productLoading &&
              [1, 2, 3, 4].map((n) => <SkeletonCart key={n} />)}

            {productDataCart &&
              productDataCart.map((el) => (
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

export default Cart;
