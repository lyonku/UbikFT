import React, { useState, useEffect } from "react";
import bridge from "@vkontakte/vk-bridge";

import galleryItem__avatar from "assets/img/galleryItem__avatar.png";
import galleryItem__openSea from "assets/img/galleryItem__openSea.svg";
import galleryItem__background from "assets/img/galleryItem__background.png";
import galleryItem__like from "assets/img/galleryItem__like.svg";

import ShareSvg from "components/common/shareSvg";
import NftLogoSvg from "components/common/nftLogoSvg";

function GalleryItem({
  setOpenHint,
  handleCopyPromptAlert,
  setShowShareAlert,
}) {
  const text = "Пещерные демоны атакуют человечество";

  const handleCopyPrompt = () => {
    bridge
      .send("VKWebAppCopyText", {
        text: text,
      })
      .then((data) => {
        if (data.result) {
          handleCopyPromptAlert();
        } else {
          // Ошибка
        }
      })
      .catch((error) => {
        // Ошибка
        console.log(error);
      });
  };

  return (
    <div className="GalleryItem">
      <div
        className="GalleryItem__wrap"
        style={{
          background: `no-repeat center/cover url(${galleryItem__background})`,
        }}
      >
        <div className="GalleryItem__leftSide">
          <div className="GalleryItem__personalInfo">
            <img className="GalleryItem__avatar" src={galleryItem__avatar} />
            <div className="GalleryItem__name">KlypKlypik</div>
          </div>
        </div>

        <a
          className="GalleryItem__likeControls"
          href={"https://polygonscan.com/"}
          target="_blank"
        >
          OpenSea
          <img className="GalleryItem__openSea" src={galleryItem__openSea} />
          <div className="GalleryItem__nft">
            <NftLogoSvg color="#fff" width="16px" height="16px" />
          </div>
        </a>
      </div>

      <div className="Gallery__prompt">
        <div className="Gallery__promptInfo" onClick={handleCopyPrompt}>
          {text}
        </div>
        <div className="Gallery__promptControls">
          <div className="Gallery__shareBtn">
            <ShareSvg color={"#fff"} onClick={setShowShareAlert} />
          </div>

          <div className="GalleryItem__like" onClick={() => setOpenHint(true)}>
            <img src={galleryItem__like} />
            <span>1321</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GalleryItem;
