import React, { useState, useRef } from "react";
import { useClickAway } from "react-use";

import "./Gallery.css";

import GalleryItem from "./components/GalleryItem";
import EnergySvg from "components/common/energySvg";
import ShareWorkAlert from "components/common/ShareWorkAlert";
import wallPostBox from "components/App/features/wallPostBox";

import galleryItem__background from "assets/img/galleryItem__background.png";
import benefitsImg from "assets/img/payEnergy__benefitsImg.svg";

const Gallery = ({ id, go }) => {
  const count = [1, 2, 3, 4];
  const [openHint, setOpenHint] = useState(false);
  const [copyPromptAlert, setCopyPromptAlert] = useState(false);
  const ref = useRef(null);
  const [showShareAlert, setShowShareAlert] = useState(false);

  useClickAway(
    ref,
    () => {
      setOpenHint(false);
    },
    ["mousedown"]
  );

  const handleCopyPromptAlert = () => {
    setCopyPromptAlert(true);
    setTimeout(() => setCopyPromptAlert(false), 2000);
  };

  const handleShareWallPost = () => {
    wallPostBox(galleryItem__background);
  };

  return (
    <div className="Gallery">
      <div className="gradient-round"></div>
      <div className="Gallery__wrap">
        <div className="Gallery__controls">
          <div
            className="Gallery__energy smallBtn-text"
            onClick={() => go("payEnergy")}
          >
            <EnergySvg width={"20px"} height={"20px"} />
            12345
          </div>
        </div>
        <div className="Gallery__body">
          <div className="Gallery__title title">
            Популярные <span className="title_accented">арты</span>
          </div>

          <div className="Gallery__items">
            {count.map((item) => {
              return (
                <GalleryItem
                  key={item}
                  setOpenHint={setOpenHint}
                  handleCopyPromptAlert={handleCopyPromptAlert}
                  showShareAlert={showShareAlert}
                  setShowShareAlert={setShowShareAlert}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="notification__wrap">
        <ShareWorkAlert
          showShareAlert={showShareAlert}
          setShowShareAlert={setShowShareAlert}
          handleShareWallPost={handleShareWallPost}
        />
      </div>

      <div className={`Notification ${copyPromptAlert && "open"}`}>
        <img src={benefitsImg} />
        Промт скопирован
      </div>
      <div
        className={`PayConfirm__background ${
          (openHint || showShareAlert) && "open"
        }`}
      ></div>
      <div className={`PayConfirm ${openHint && "open"}`} ref={ref}>
        <div
          className="PayConfirm__header"
          onClick={() => setOpenHint(false)}
        ></div>
        <div className="PayConfirm__title mini-title">
          Чтобы поставить лайк нужно потратить{" "}
          <span className="title_accented">единицу энергии.</span>
        </div>
        <div className="PayConfirm__check">
          <input
            type="checkbox"
            id="check"
            name="check"
            className="PayConfirm__checkbox"
          />
          <label htmlFor="check">Больше не показывать эту подсказку</label>
        </div>
        <div className="PayConfirm__btn">
          <div className="PayConfirm__btn_text">Поставить лайк</div>
          <div className="PayConfirm__delimetr"></div>

          <div className="PayConfirm__pay">
            <EnergySvg color="#BCDE3B" width="24px" height="24px" />
            <div className="PayConfirm__pay_text">1</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
