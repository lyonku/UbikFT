import React, { useState, useEffect } from "react";
import galleryItem__avatar from "assets/img/galleryItem__avatar.png";
import galleryItem__openSea from "assets/img/galleryItem__openSea.svg";
import galleryItem__edit from "assets/img/galleryItem__edit.svg";
import galleryItem__background from "assets/img/galleryItem__background.png";
import galleryItem__like from "assets/img/galleryItem__like.svg";

import ShareSvg from "components/common/shareSvg";
import NftLogoSvg from "components/common/nftLogoSvg";

function GalleryItem({
  setOpenHint,
  handleCopyPromptAlert,
  setShowShareAlert,
}) {
  const handleCopyPrompt = (e) => {
    console.log(e.target.innerText);
    navigator.clipboard
      .writeText(e.target.innerText)
      .then(() => {
        handleCopyPromptAlert();
      })
      .catch((err) => {
        console.error("Ошибка при копировании текста: ", err);
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
        <div className="GalleryItem__rightSide">
          <div className="GalleryItem__shareControls">
            <div
              className="GalleryItem__edit roundBtn"
              onClick={handleCopyPrompt}
            >
              <img src={galleryItem__edit} />
            </div>
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
          Сave demons attack humanity
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
