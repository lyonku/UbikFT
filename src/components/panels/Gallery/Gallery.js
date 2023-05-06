import React, { useState, useRef } from "react";

import "./Gallery.css";

import GalleryItem from "./components/GalleryItem";
import EnergySvg from "components/common/energySvg";
import ShareWorkAlert from "components/common/ShareWorkAlert";
import wallPostBox from "components/App/features/wallPostBox";

import galleryItem__background from "assets/img/galleryItem__background.png";
import benefitsImg from "assets/img/payEnergy__benefitsImg.svg";
import PayConfirm from "./components/PayConfirm";

const Gallery = ({ id, go }) => {
  const count = [1, 2, 3, 4];
  const [openHint, setOpenHint] = useState(false);
  const [copyPromptAlert, setCopyPromptAlert] = useState(false);
  const [showShareAlert, setShowShareAlert] = useState(false);

  const handleCopyPromptAlert = () => {
    setCopyPromptAlert(true);
    setTimeout(() => setCopyPromptAlert(false), 2000);
  };

  const handleShareWallPost = () => {
    wallPostBox(galleryItem__background);
  };

  return (
    <div className="Gallery">
      <div className="Gallery__wrap">
        <div className="Gallery__controls">
          <div
            className="Gallery__energy smallBtn-text"
            onClick={() => go("payEnergy")}
          >
            <EnergySvg width={"20px"} height={"20px"} />
            100
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
      <PayConfirm openHint={openHint} setOpenHint={setOpenHint} />
    </div>
  );
};

export default Gallery;
