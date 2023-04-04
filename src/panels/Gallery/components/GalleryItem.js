import React, { useState, useEffect } from "react";
import galleryItem__avatar from "img/galleryItem__avatar.png";
import galleryItem__coursera from "img/galleryItem__coursera.png";
import galleryItem__edit from "img/galleryItem__edit.png";
import galleryItem__share from "img/galleryItem__share.png";
import galleryItem__background from "img/galleryItem__background.png";
import galleryItem__like from "img/galleryItem__like.png";
import galleryItem__energy from "img/galleryItem__energy.png";

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
            <img src={galleryItem__energy} /> 1
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
        <img className="GalleryItem__coursera" src={galleryItem__coursera} />
      </div>
    </div>
  );
}

export default GalleryItem;
