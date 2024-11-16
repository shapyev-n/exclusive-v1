"use client";
import { useGetMeQuery } from "../../../../redux/api/auth";
import { useBasketStore } from "../../../../store/basketStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./BasketPage.module.scss";
import Link from "next/link";
import { Button, IconButton } from "@mui/material";
import cartEmpty from "../../../../assets/cartEmpty.png";
import Image from "next/image";
import PaymentPage from "./PaymentPage";
import {
  generateCheck,
} from "../../../../helpers/generate-check";

export default function BasketPage() {
  const { data: user = null, isLoading } = useGetMeQuery();
  const route = useRouter();
  const [modal, setModal] = useState<boolean>(false);
  const [myCheck, setMyCheck] = useState<string | null>(null);

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    if (typeof window !== "undefined") handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const is768px = windowWidth <= 768;
  const is1000px = windowWidth <= 1000;

  const {
    totalCount,
    totalPrice,
    basketItems,
    updateQuantity,
    removeFromBasket,
    loadBasket,
  } = useBasketStore();

  useEffect(() => {
    if (user?.id) {
      loadBasket(String(user.id));
    }
  }, [user?.id, loadBasket]);

  const handleIncrease = (itemId: number) => {
    updateQuantity(String(user?.id), itemId, 1);
  };

  const handleDecrease = (itemId: number) => {
    updateQuantity(String(user?.id), itemId, -1);
  };

  const normalizedBasketItems = basketItems.map((item) => ({
    ...item,
    description: item.description || "",
    category: item.category || "Uncategorized",
    BestSellingProducts: item.BestSellingProducts || false,
    createdAt: item.createdAt || new Date(),
  }));

  const handleAdtoCheck = () => {
    const check = generateCheck(normalizedBasketItems, String(user.id));

    setMyCheck(check);
  };


  return (
    <>
      <div className={styles.row}>
        <div className={styles.col_25}>
          {user && basketItems.length > 0 && (
            <div className={styles.container}>
              <h4>
                Cart
                {!is768px && (
                  <span className={styles.price} style={{ color: "black" }}>
                    <i className="fa fa-shopping-cart"></i>
                    <b>#{Date.now()}</b>
                  </span>
                )}
                {is768px && (
                  <span className={styles.price} style={{ color: "black" }}>
                    <i className="fa fa-shopping-cart"></i>
                    <b>#{basketItems.length}</b>
                  </span>
                )}
              </h4>
              {!is768px && (
                <table className={styles.table}>
                  {basketItems.map((el, index) => (
                    <tbody key={el.id} className={styles.tbody}>
                      <tr className={styles.tr}>
                        <td
                          className={styles.tdNumbered}
                          onClick={() =>
                            removeFromBasket(String(user.id), el.id)
                          }
                        >
                          <span className={styles.del}>❌</span>
                          <span className={styles.num}>{index + 1}</span>
                        </td>
                        <td
                          className={
                            is1000px
                              ? `${styles.scssTD} ${styles.productName}`
                              : `${styles.scssTD} ${styles.productNameTable}`
                          }
                        >
                          <Image
                            src={el.image}
                            alt={el.title}
                            width={500}
                            height={500}
                          />
                          <Link href={`/details/${el.id}`}>{el.title}</Link>
                        </td>

                        {!is1000px && (
                          <td className={styles.scssTD}>
                            {el.salePrice && (
                              <>
                                <s style={{ opacity: "0.6", fontSize: "12px" }}>
                                  {el.price}
                                </s>
                                <span style={{ color: "red" }}>
                                  {el.salePrice}
                                </span>
                              </>
                            )}
                            {!el.salePrice && <span>{el.price}</span>}
                          </td>
                        )}

                        <td
                          className={
                            !is1000px
                              ? `${styles.scssTD}`
                              : `${styles.scssTD} ${styles.quantityMobile}`
                          }
                        >
                          <IconButton
                            sx={{
                              width: "30px",
                              height: "30px",
                              background: "#000",
                              color: "#fff",
                            }}
                            onClick={() => handleDecrease(el.id)}
                            disabled={el.quantity <= 1}
                          >
                            -
                          </IconButton>
                          {el.quantity}
                          <IconButton
                            sx={{
                              width: "30px",
                              height: "30px",
                              background: "#000",
                              color: "#fff",
                            }}
                            onClick={() => handleIncrease(el.id)}
                            disabled={el.quantity >= el.count}
                          >
                            +
                          </IconButton>
                        </td>
                        {!is1000px && (
                          <td className={styles.scssTD}>
                            <span>
                              ${el.salePrice ?? el.price} x {el.quantity}
                            </span>
                          </td>
                        )}
                        {!is1000px && (
                          <td className={`${styles.scssTD} ${styles.total}`}>
                            <span className={styles.spanTotal}>
                              ${!el.salePrice && el.price * el.quantity}
                              {el.salePrice && el.salePrice * el.quantity}
                            </span>
                          </td>
                        )}
                      </tr>
                    </tbody>
                  ))}
                </table>
              )}
              {is768px &&
                basketItems.map((el) => (
                  <div key={el.id} className={styles.mobCard}>
                    <Link href={`/details/${el.id}`}>
                      <Image
                        src={el.image}
                        alt="Image for product"
                        width={500}
                        height={500}
                        className={styles.mobImg}
                      />
                      <p className={styles.title}>{el.title}</p>
                    </Link>
                    <p className={styles.mobPriceBox}>
                      {el.salePrice && (
                        <>
                          <s style={{ opacity: "0.6", fontSize: "12px" }}>
                            ${el.price}
                          </s>
                          <span style={{ color: "red" }}>${el.salePrice}</span>
                        </>
                      )}
                      {!el.salePrice && <span>${el.price}</span>}
                    </p>
                    <div className={styles.mobQuantity}>
                      <IconButton
                        sx={{
                          width: "30px",
                          height: "30px",
                          background: "#000",
                          color: "#fff",
                        }}
                        onClick={() => handleDecrease(el.id)}
                        disabled={el.quantity <= 1}
                      >
                        -
                      </IconButton>
                      {el.quantity}
                      <IconButton
                        sx={{
                          width: "30px",
                          height: "30px",
                          background: "#000",
                          color: "#fff",
                        }}
                        onClick={() => handleIncrease(el.id)}
                        disabled={el.quantity >= el.count}
                      >
                        +
                      </IconButton>

                      <Button
                        className={styles.mobDelete}
                        onClick={() => removeFromBasket(String(user.id), el.id)}
                      >
                        delete
                      </Button>
                    </div>
                    <p className={styles.spanTotal}>
                      ${!el.salePrice && el.price * el.quantity}
                      {el.salePrice && el.salePrice * el.quantity}
                    </p>
                  </div>
                ))}

              {!is768px && (
                <span className={styles.price} style={{ color: "black" }}>
                  <i className="fa fa-shopping-cart"></i>
                  <b>#{basketItems.length}</b>
                </span>
              )}

              {is768px && (
                <span className={styles.price} style={{ color: "black" }}>
                  <i className="fa fa-shopping-cart"></i>
                  <b>#{Date.now()}</b>
                </span>
              )}

              <hr />
              <p>
                Total count
                <span className={styles.price} style={{ color: "black" }}>
                  <b>{totalCount}</b>
                </span>
              </p>
              <p>
                Total price
                <span className={styles.price} style={{ color: "black" }}>
                  <b>${totalPrice}</b>
                </span>
              </p>
              <button
                className={styles.navToPay}
                onClick={() => {
                  handleAdtoCheck();
                  setModal(!modal);
                }}
              >
                proceed to payment
              </button>
            </div>
          )}
          {user && basketItems && basketItems.length === 0 && (
            <center className={styles.center}>
              <Image src={cartEmpty} alt="img" width={500} height={500} />
            </center>
          )}
          {isLoading && (
            <center className={styles.center} style={{ margin: "50px auto" }}>
              loading...
            </center>
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
        </div>
      </div>
      {modal && (
        <PaymentPage
          setModal={setModal}
          modal={modal}
          handleAdtoCheck={handleAdtoCheck}
          basketItems={basketItems}
          totalCount={totalCount}
          totalPrice={totalPrice}
          myCheck={myCheck}
        />
      )}
    </>
  );
}
