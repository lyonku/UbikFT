import React, { useState, useEffect } from "react";
import galleryItem__openSea from "assets/img/galleryItem__openSea.svg";
import galleryItem__edit from "assets/img/galleryItem__edit.svg";
import galleryItem__share from "assets/img/galleryItem__share.svg";
import profile__delete from "assets/img/profile__delete.svg";

function ProfileArt({ img }) {
  return (
    <div
      className="ProfileArt"
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
            <div className="ProfileArt__edit roundBtn">
              <img src={galleryItem__edit} />
            </div>
          </div>
          <div className="ProfileArt__share roundBtn">
            <img src={galleryItem__share} />
          </div>
        </div>
        <img
          className="ProfileArt__opegalleryItem__openSea"
          src={galleryItem__openSea}
        />
      </div>
    </div>
  );
}

export default ProfileArt;
