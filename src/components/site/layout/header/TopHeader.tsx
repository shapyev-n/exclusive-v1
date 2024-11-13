import scss from "./TopHeader.module.scss";

const TopHeader = () => {


  return (
    <div className={scss.TopHeader}>
      <div className={scss.content}>
        <div className={scss.frame}>
          <span>
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
          </span>
          <button>ShopNow</button>
        </div>
        <div className={scss.language}>
          <select>
            <option>English</option>
            <option>Russian</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
