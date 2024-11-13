import scss from "./Commerce.module.scss";
import { FaTruckFast } from "react-icons/fa6";
import { MdOutlineHeadsetMic } from "react-icons/md";
import { BsShieldCheck } from "react-icons/bs";
import { FaArrowUp } from "react-icons/fa6";

const Commerce = () => {
  return (
    <section className={scss.Commerce}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.grid}>
            <div className={scss.column}>
              <button>
                <FaTruckFast />
              </button>
              <h3>FREE AND FAST DELIVERY</h3>
              <span>Free devilery for all orders over $140</span>
            </div>
            <div className={scss.column}>
              <button>
                <MdOutlineHeadsetMic />
              </button>
              <h3>24/7 CUSTOMER SERVICE</h3>
              <span>Friendly 24/7 customer support</span>
            </div>
            <div className={scss.column}>
              <button>
                <BsShieldCheck />
              </button>
              <h3>MONEY BACK GUARANTEE</h3>
              <span>We reurn money with in 30 days</span>
            </div>
          </div>
        </div>
      </div>
      <button>
        <FaArrowUp />
      </button>
    </section>
  );
};

export default Commerce;
