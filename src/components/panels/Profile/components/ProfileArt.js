import React, { useState, useEffect } from "react";
import galleryItem__openSea from "assets/img/galleryItem__openSea.svg";
import profile__delete from "assets/img/profile__delete.svg";
import ShareSvg from "components/common/shareSvg";
import galleryItem__like from "assets/img/galleryItem__like.svg";
import NftLogoSvg from "components/common/nftLogoSvg";

function ProfileArt({ img }) {
  return (
    <div className="ProfileArt">
      <div
        className="ProfileArt__body"
        style={{
          background: `no-repeat center/cover url(${img})`,
        }}
      >
        <div className="ProfileArt__leftSide"></div>
        <div className="ProfileArt__rightSide">
          <div className="ProfileArt__shareControls">
            <div className="ProfileArt__shareControls_up">
              <div className="ProfileArt__edit roundBtn">
                <img src={profile__delete} />
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
      </div>
      <div className="Gallery__prompt">
        <div className="Gallery__promptInfo">
          Пещерные демоны атакуют человечество
        </div>
        <div className="Gallery__promptControls">
          <div className="Gallery__shareBtn">
            <ShareSvg color={"#fff"} />
          </div>

          <div className="GalleryItem__like">
            <img src={galleryItem__like} />
            <span>1321</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileArt;
