import React, { useState, useEffect } from "react";
import galleryItem__avatar from "assets/img/galleryItem__avatar.png";
import galleryItem__openSea from "assets/img/galleryItem__openSea.svg";
import galleryItem__edit from "assets/img/galleryItem__edit.svg";
import galleryItem__share from "assets/img/galleryItem__share.svg";
import galleryItem__background from "assets/img/galleryItem__background.png";
import galleryItem__like from "assets/img/galleryItem__like.svg";

import EnergySvg from "components/common/energySvg";

function GalleryItem({}) {
  return (
    <div
      className="GalleryItem"
      style={{
        background: `no-repeat center/cover url(${galleryItem__background})`,
      }}
    >
      <div className="GalleryItem__leftSide">
        <div className="GalleryItem__personalInfo">
          <img className="GalleryItem__avatar" src={galleryItem__avatar} />
          <div className="GalleryItem__name">KlypKlypik</div>
        </div>
        <div className="GalleryItem__likeControls">
          <div className="GalleryItem__like">
            <img src={galleryItem__like} />
            1321
          </div>
          <div className="GalleryItem__delimetr"></div>

          <div className="GalleryItem__energy">
            <EnergySvg width={"18px"} height={"18px"} color="#B0E822" />1
          </div>
        </div>
      </div>
      <div className="GalleryItem__rightSide">
        <div className="GalleryItem__shareControls">
          <div className="GalleryItem__edit roundBtn">
            <img src={galleryItem__edit} />
          </div>
          <div className="GalleryItem__share roundBtn">
            <img src={galleryItem__share} />
          </div>
        </div>
        <img className="GalleryItem__openSea" src={galleryItem__openSea} />
      </div>
    </div>
  );
}

export default GalleryItem;
