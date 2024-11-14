"use client";
import { useState } from "react";
import styles from "./BasketPage.module.scss";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const route = useRouter();

  const [formData, setFormData] = useState({
    firstname: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardname: "",
    cardnumber: "",
    expmonth: "",
    expyear: "",
    cvv: "",
    sameadr: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Form submitted:", formData);
    };

  return (
    <div className={styles.row}>
      <div className={styles.col_75}>
        <button className={styles.back} onClick={() => route.push("/cart")}>
          back to basket
        </button>
        <div className={styles.container}>
          <form onSubmit={handleSubmit} className={styles.formInput}>
            <div className={styles.row}>
              <div className={styles.col_50}>
                <h3>Billing Address</h3>
                <p>
                  <i className="fa fa-user"></i> Full Name
                </p>
                <input
                  className={styles.inp}
                  type="text"
                  id=""
                  name="firstname"
                  placeholder="John M. Doe"
                  value={formData.firstname}
                  onChange={handleChange}
                />
                <p>Email</p>
                <input
                  className={styles.inp}
                  type="text"
                  id="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                <p>Address</p>
                <input
                  className={styles.inp}
                  type="text"
                  id="adr"
                  name="address"
                  placeholder="542 W. 15th Street"
                  value={formData.address}
                  onChange={handleChange}
                />
                <p>
                  <i className="fa fa-institution"></i> City
                </p>
                <input
                  className={styles.inp}
                  type="text"
                  id="city"
                  name="city"
                  placeholder="New York"
                  value={formData.city}
                  onChange={handleChange}
                />
                <div className={styles.row}>
                  <div className={styles.col_50}>
                    <p>State</p>
                    <input
                      className={styles.inp}
                      type="text"
                      id="state"
                      name="state"
                      placeholder="NY"
                      value={formData.state}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.col_50}>
                    <p>Index</p>
                    <input
                      className={styles.inp}
                      type="text"
                      id="zip"
                      name="zip"
                      placeholder="10001"
                      value={formData.zip}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.col_50}>
                <h3>Payment</h3>
                <p>Accepted Cards</p>
                <div className={styles["icon-container"]}>
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
                  className={styles.inp}
                  type="text"
                  id="cname"
                  name="cardname"
                  placeholder="John More Doe"
                  value={formData.cardname}
                  onChange={handleChange}
                />
                <p>Credit card number</p>
                <input
                  className={styles.inp}
                  type="text"
                  id="ccnum"
                  name="cardnumber"
                  placeholder="1111-2222-3333-4444"
                  value={formData.cardnumber}
                  onChange={handleChange}
                />
                <p>Exp Month</p>
                <input
                  className={styles.inp}
                  type="text"
                  id="expmonth"
                  name="expmonth"
                  placeholder="01"
                  value={formData.expmonth}
                  onChange={handleChange}
                />
                <div className={styles.row}>
                  <div className={styles.col_50}>
                    <p>Exp Year</p>
                    <input
                      className={styles.inp}
                      type="text"
                      id="expyear"
                      name="expyear"
                      placeholder="2024"
                      value={formData.expyear}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.col_50}>
                    <p>CVV</p>
                    <input
                      className={styles.inp}
                      type="text"
                      id="cvv"
                      name="cvv"
                      placeholder="352"
                      value={formData.cvv}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <p>
              <input
                type="checkbox"
                checked={formData.sameadr}
                name="sameadr"
                onChange={handleChange}
              />
              Shipping address same as billing
            </p>
            <input
              type="submit"
              value="Continue to checkout"
              className={styles.btn}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
