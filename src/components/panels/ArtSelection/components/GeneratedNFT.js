import React, { useState, useRef } from "react";

import artSelection from "assets/img/artSelection__img.png";
import nft from "assets/img/nft__logo.svg";
import openSea from "assets/img/galleryItem__openSea.svg";
import EnergySvg from "components/common/energySvg";

const ArtSelection = ({
  setShowNotificationDelete,
  handleAddToProfile,
  currentImg,
}) => {
  return (
    <div className="ArtSelection__body">
      <div className="ArtSelection__title title nft">
        Хотите создать <span className="title_accented">NFT?</span>
      </div>
      <div className="ArtSelection__img nft">
        <img src={currentImg} />
      </div>
      <div className="ArtSelection__btns nft">
        <div className="ArtSelection__nftBtn btn" onClick={() => go("loading")}>
          Создать NFT <div className="createBtn__delimetr"></div>
          <EnergySvg width={"18px"} height={"18px"} color="#FFFFFF" /> 15
        </div>
        <div className="ArtSelection__links">
          <div
            className="ArtSelection__linkBtn"
            onClick={() => setShowNotificationDelete(true)}
          >
            <img src={nft} />
            polygon
          </div>
          <div
            className="ArtSelection__linkBtn"
            onClick={() => handleAddToProfile()}
          >
            <img src={openSea} />
            openSea
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtSelection;
