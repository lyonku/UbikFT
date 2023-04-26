import React, { useState, useRef } from "react";
import EnergySvg from "components/common/energySvg";
import ShareSvg from "components/common/shareSvg";
import nft from "assets/img/nft__logo.svg";
import openSea from "assets/img/galleryItem__openSea.svg";

const ArtSelection = ({
  setShowNotificationDelete,
  currentImg,
  setShowShareAlert,
}) => {
  return (
    <div className="ArtSelection__body">
      <div className="ArtSelection__title title">
        Получился шедевр? Выпусти<span className="title_accented"> NFT</span>
      </div>
      <div className="ArtSelection__img">
        <img src={currentImg} />
      </div>
      <div className="ArtSelection__glow"></div>

      <div className="ArtSelection__btns">
        <div
          className="ArtSelection__shareBtn"
          onClick={() => setShowShareAlert(true)}
        >
          <span>Поделиться</span>
          <ShareSvg />
        </div>
        <div className="ArtSelection__nftBtn btn">
          Создать NFT <div className="createBtn__delimetr"></div>
          <EnergySvg width={"18px"} height={"18px"} color="#FFFFFF" /> 1
        </div>
      </div>
      <div className="ArtSelection__links">
        <div className="ArtSelection__linkBtn">
          <img src={nft} />
          Polygon
        </div>
        <div className="ArtSelection__linkBtn">
          <img src={openSea} />
          OpenSea
        </div>
      </div>
    </div>
  );
};

export default ArtSelection;
