import scss from "./Footer.module.scss";
import { PiGooglePlayLogoDuotone } from "react-icons/pi";
import { FaApple } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { SlSocialTwitter } from "react-icons/sl";
import { FaInstagram } from "react-icons/fa";
import { ImLinkedin2 } from "react-icons/im";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={scss.Footer}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.grid}>
            <div
              className={scss.column}
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <h4>Subscribe</h4>
              <p>Get 10% off your first order</p>
              <input type="email" placeholder="Enter your email" />
              <button>Subscribe</button>
            </div>
            <div className={scss.column}>
              <h4>Support</h4>
              <ul>
                <li>
                  111 Bijoy sarani, Dhaka,
                  <br /> DH 1515 Bangladesh
                </li>
                <li> exclusive@gmail.com</li>
                <li> +88015-88888-9999</li>
              </ul>
            </div>
            <div className={scss.column}>
              <h4>Account</h4>
              <ul>
                <li>My Account</li>
                <li>
                  <Link style={{color:"#fff"}} href="/sign-in">Login</Link>/ 
                  <Link style={{color:"#fff"}} href="/sign-up">Register</Link>
                </li>
                <li>Cart</li>
                <li>Wishlist</li>
                <li>Shop</li>
              </ul>
            </div>
            <div className={scss.column}>
              <h4>Quick Link</h4>
              <ul>
                <li>Privacy Policy</li>
                <li>Terms of Use</li>
                <li>FAQ</li>
                <li>Contact</li>
              </ul>
            </div>
            <div className={scss.column}>
              <h4>Download App</h4>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <button
                  style={{
                    borderRadius: "5px",
                    color: "white",
                    background: "black",
                    border: "1px solid white",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    padding: "10px 15px",
                  }}
                >
                  <PiGooglePlayLogoDuotone style={{ fontSize: "20px" }} />
                  <span> Google Play</span>
                </button>
                <button
                  style={{
                    borderRadius: "5px",
                    color: "white",
                    background: "black",
                    border: "1px solid white",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    padding: "10px 20px",
                  }}
                >
                  <FaApple style={{ fontSize: "20px" }} />
                  <span>App Store</span>
                </button>
              </div>
              <div className={scss.socialIcons}>
                <a href="#">
                  <i className="fab fa-facebook-f">
                    <FaFacebookF />
                  </i>
                </a>
                <a href="#">
                  <i className="fab fa-twitter">
                    <SlSocialTwitter />
                  </i>
                </a>
                <a href="#">
                  <i className="fab fa-instagram">
                    <FaInstagram />
                  </i>
                </a>
                <a href="#">
                  <i className="fab fa-linkedin-in">
                    <ImLinkedin2 />
                  </i>
                </a>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
    </footer>
  );
}
