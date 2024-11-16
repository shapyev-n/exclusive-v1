"use client";
import scss from "./BasketPage.module.scss";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { downloadCheck } from "../../../../helpers/generate-check";
import { useState } from "react";

interface ISendMessage {
  firstname: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  cardname: string;
  cardnumber: string;
  expmonth: string;
  expyear: string;
  cvv: string;
  sameadr: boolean;
}
const TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_TOKEN;
const CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_DELIVERY_ID;

export default function PaymentPage({
  setModal,
  modal,
  handleAdtoCheck,
  basketItems,
  totalCount,
  totalPrice,
  myCheck,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ISendMessage>({
    mode: "onChange",
  });

  const [openCheckModal, setOpenCheckModal] = useState<boolean>(false);

  const messageModel = (data: ISendMessage) => {
    let messageTG = `<b>Delivery details:</b>\n`;
    messageTG += `Username: <b>${data.firstname}</b>\n`;
    messageTG += `Email: <b>${data.email}</b>\n`;
    messageTG += `State: <b>${data.state}</b>\n`;
    messageTG += `City: <b>${data.city}</b>\n`;
    messageTG += `Adres: <b>${data.address}</b>\n`;
    messageTG += `\n`;

    messageTG += `<b>Goods for delivery:</b>\n`;

    basketItems.forEach((item, index: number) => {
      messageTG += `${index + 1}. ${item.title}\n`;
      messageTG += `   Quantity: ${item.quantity}\n`;
      messageTG += `   Price per unit: $${item.price}\n`;
      messageTG += `   Total for item: $${item.price * item.quantity}\n`;
    });

    messageTG += `---------------------------------\n`;
    messageTG += `Total items: ${totalCount}\n`;
    messageTG += `Total price: $${totalPrice}\n`;

    return messageTG;
  };

  const onSubmit: SubmitHandler<ISendMessage> = async (data) => {
    await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      parse_mode: "html",
      text: messageModel(data),
    });
    handleAdtoCheck();
    setOpenCheckModal(!openCheckModal);

    toast.success("Your message has been sent successfully!");
    reset();
  };

  return (
    <div className={scss.rowPay}>
      <ToastContainer />
      <div className={scss.col_75}>
        <div className={scss.container}>
          <button className={scss.back} onClick={() => setModal(!modal)}>
            back to basket
          </button>
          <form onSubmit={handleSubmit(onSubmit)} className={scss.formInput}>
            <div className={scss.row}>
              <div className={scss.col_50}>
                <h3>Billing Address</h3>
                <p>
                  <i className="fa fa-user"></i> Full Name
                </p>
                <input
                  className={scss.inp}
                  type="text"
                  id=""
                  name="firstname"
                  placeholder="John M. Doe"
                  {...register("firstname", { required: true })}
                />
                <p>Email</p>
                <input
                  className={scss.inp}
                  type="text"
                  id="email"
                  name="email"
                  placeholder="john@example.com"
                  {...register("email", { required: true })}
                />
                <p>Address</p>
                <input
                  className={scss.inp}
                  type="text"
                  id="adr"
                  name="address"
                  placeholder="542 W. 15th Street"
                  {...register("address", { required: true })}
                />
                <p>
                  <i className="fa fa-institution"></i> City
                </p>
                <input
                  className={scss.inp}
                  type="text"
                  id="city"
                  name="city"
                  placeholder="New York"
                  {...register("city", { required: true })}
                />
                <div className={scss.row}>
                  <div className={scss.col_50}>
                    <p>State</p>
                    <input
                      className={scss.inp}
                      type="text"
                      id="state"
                      name="state"
                      placeholder="NY"
                      {...register("state", { required: true })}
                    />
                  </div>
                  <div className={scss.col_50}>
                    <p>Index</p>
                    <input
                      className={scss.inp}
                      type="text"
                      id="zip"
                      name="zip"
                      placeholder="10001"
                      {...register("state", { required: true })}
                    />
                  </div>
                </div>
              </div>

              <div className={scss.col_50}>
                <h3>Payment</h3>
                <p>Accepted Cards</p>
                <div className={scss["icon-container"]}>
                  <i className="fa fa-cc-visa" style={{ color: "navy" }}></i>
                  <i className="fa fa-cc-amex" style={{ color: "blue" }}></i>
                  <i
                    className="fa fa-cc-mastercard"
                    style={{ color: "red" }}
                  ></i>
                  <i
                    className="fa fa-cc-discover"
                    style={{ color: "orange" }}
                  ></i>
                </div>
                <p>Name on Card</p>
                <input
                  className={scss.inp}
                  type="text"
                  id="cname"
                  name="cardname"
                  placeholder="John More Doe"
                  {...register("cardname", { required: true })}
                />
                <p>Credit card number</p>
                <input
                  className={scss.inp}
                  type="text"
                  id="ccnum"
                  name="cardnumber"
                  placeholder="1111-2222-3333-4444"
                  {...register("cardnumber", { required: true })}
                />
                <p>Exp Month</p>
                <input
                  className={scss.inp}
                  type="text"
                  id="expmonth"
                  name="expmonth"
                  placeholder="01"
                  {...register("expmonth", { required: true })}
                />
                <div className={scss.row}>
                  <div className={scss.col_50}>
                    <p>Exp Year</p>
                    <input
                      className={scss.inp}
                      type="text"
                      id="expyear"
                      name="expyear"
                      placeholder="2024"
                      {...register("expyear", { required: true })}
                    />
                  </div>
                  <div className={scss.col_50}>
                    <p>CVV</p>
                    <input
                      className={scss.inp}
                      type="text"
                      id="cvv"
                      name="cvv"
                      placeholder="352"
                      {...register("cvv", { required: true })}
                    />
                  </div>
                </div>
              </div>
            </div>
            <p>
              <input
                type="checkbox"
                name="sameadr"
                {...register("sameadr", { required: true })}
              />
              Shipping address same as billing
            </p>

            {isSubmitting && (
              <button type="button" disabled className={scss.btn}>
                loading...
              </button>
            )}
            {!isSubmitting && (
              <button type="submit" className={scss.btn}>
                Continue to checkout
              </button>
            )}
          </form>
        </div>
      </div>
      {openCheckModal && (
        <div className={scss.check}>
          <h4>Exclusive shop</h4>
          <pre>{myCheck}</pre>
          <div className={scss.checkBtns}>
            <button
              className={scss.download}
              onClick={() => downloadCheck(myCheck)}
            >
              💾 save check
            </button>
            <button
              className={scss.closeCheck}
              onClick={() => {
                setOpenCheckModal(!openCheckModal);
                setModal(!modal);
              }}
            >
              close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
