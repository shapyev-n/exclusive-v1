import scss from "./Music.module.scss";

const Music = () => {
  return (
    <section className={scss.Music}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.music_content}>
            <div className={scss.content_text}>
              <div className={scss.content_logo}>
                <p>Categories</p>
              </div>
              <p>
                Exchance Your <br /> Music Experience
              </p>
              <button>Buy now</button>
            </div>

            <div className={scss.content_img}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Music;
