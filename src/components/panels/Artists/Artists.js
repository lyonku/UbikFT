import React, { useState, useRef } from "react";
import "./Artists.css";
import { Panel } from "@vkontakte/vkui";
import EnergySvg from "components/common/energySvg";
import ArtistsItem from "./components/ArtistsItem";
const Artists = ({ id, go }) => {
  const count = [
    { name: "Antony242" },
    { name: "CriticalWolf" },
    { name: "Mary Deen" },
    { name: "CareDoom1" },
  ];

  return (
    <div className="Artists">
      <div className="Artists__wrap">
        <div className="Artists__controls Header__controls">
          <div
            className="Artists__energy smallBtn-text"
            onClick={() => go("payEnergy")}
          >
            <EnergySvg width={"20px"} height={"20px"} />
            100
          </div>
        </div>
        <div className="Artists__body">
          <div className="Artists__title title">
            Популярные <span className="title_accented">художники</span>
          </div>
          <div className="Artists__items">
            {count.map((item, index) => {
              return <ArtistsItem key={index} index={index} item={item} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Artists;
