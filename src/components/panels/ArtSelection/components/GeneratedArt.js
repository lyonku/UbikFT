import React, { useState, useRef } from "react";

import artSelection from "assets/img/artSelection__img.png";
import artSelectionDelete from "assets/img/artSelection__delete.svg";
import artSelectionLike from "assets/img/artSelection__like.svg";

const ArtSelection = ({
  setShowNotificationDelete,
  handleAddToProfile,
  currentImg,
}) => {
  return (
    <div className="ArtSelection__body">
      <div className="ArtSelection__title title">
        Вам нравится ваш <span className="title_accented">арт?</span>
      </div>
      <div className="ArtSelection__img">
        <img src={currentImg} />
      </div>
      <div className="ArtSelection__glow"></div>

      <div className="ArtSelection__btns">
        <div
          className="ArtSelection__deleteBtn ArtSelection__btn"
          onClick={() => setShowNotificationDelete(true)}
        >
          <img src={artSelectionDelete} />
        </div>
        <div
          className="ArtSelection__likeBtn ArtSelection__btn"
          onClick={() => handleAddToProfile()}
        >
          <img src={artSelectionLike} />
        </div>
      </div>
    </div>
  );
};

export default ArtSelection;
