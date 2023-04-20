import React, { useState, useRef } from "react";
import "./Gallery.css";
import { Panel } from "@vkontakte/vkui";
import GalleryItem from "./components/GalleryItem";
import backBtn from "assets/img/back-btn.svg";
import EnergySvg from "components/common/energySvg";

const Gallery = ({ id, go }) => {
  // delete
  const count = [1, 2, 3, 4];

  return (
    <div className="Gallery">
      <div className="gradient-round"></div>
      <div className="Gallery__wrap">
        <div className="Gallery__controls">
          <div
            className="Gallery__backBtn backBtn"
            onClick={() => window.history.back()}
          >
            <img src={backBtn} />
          </div>
          <div
            className="Gallery__energy smallBtn-text"
            onClick={() => go("payEnergy")}
          >
            <EnergySvg width={"20px"} height={"20px"} />
            12345
          </div>
        </div>
        <div className="Gallery__body">
          <div className="Gallery__title title">
            Популярные <span className="title_accented">арты</span>
          </div>
          <div className="Gallery__items">
            {count.map((item) => {
              return <GalleryItem key={item} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
