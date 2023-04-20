import React, { useState, useEffect } from "react";

import payEnergy__benefits from "assets/img/payEnergy__benefitsImg.svg";
import payEnergy__energyImg from "assets/img/payEnergy__energyImg.svg";
import back__btn from "assets/img/back-btn.svg";
import close__btn from "assets/img/close-btn.svg";
import modelSelection from "assets/img/modelSelection-btn.svg";
import vintedois_background from "assets/img/home__vintedois_background.png";
import anything_background from "assets/img/home__anything_background.png";
import protogen_background from "assets/img/home__protogen_background.png";
import loading__background from "assets/img/loading__background.png";

import data from "data.json";

function imagesPreload() {
  const images = [
    payEnergy__benefits,
    payEnergy__energyImg,
    vintedois_background,
    anything_background,
    protogen_background,
    loading__background,
    modelSelection,
    close__btn,
    back__btn,
  ];

  const loadImages = () => {
    images.forEach((image) => {
      const img = new Image();

      img.src = image;
    });
    data[0].array.forEach((item) => {
      let image = item.url;
      const img = new Image();

      img.src = image;
    });
  };

  loadImages();

  return "imagesLoaded";
}

export default imagesPreload;
