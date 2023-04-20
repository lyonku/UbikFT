import React, { useState, useRef } from "react";
import "./StyleSelection.css";
import { Panel } from "@vkontakte/vkui";
import modelSelection from "assets/img/modelSelection-btn.svg";

import data from "data.json";
import StylesItem from "./components/StylesItem";
import EnergySvg from "components/common/energySvg";

const StyleSelection = ({ id, go, inputValue, handleArtGenerate }) => {
  const [chosenStyles, setChosenStyles] = useState({});

  return (
    <div className="styleSelection">
      <div className="gradient-round"></div>

      <div className="styleSelection__wrap">
        <div className="styleSelection__header">
          <div
            className="styleSelection__modelSwitch smallBtn-text"
            onClick={() => {
              window.history.back();
              window.history.back();
            }}
          >
            <img src={modelSelection} />
            Выбрать модель
          </div>
          <div
            className="styleSelection__energy smallBtn-text"
            onClick={() => go("payEnergy")}
          >
            <EnergySvg width={"20px"} height={"20px"} />
            12345
          </div>
        </div>
        <div
          className="styleSelection__title"
          onClick={() => window.history.back()}
        >
          {inputValue}
        </div>
        <div className="styleSelection__body">
          {data.map((category, categoryIndex) => {
            return (
              <div className="styleСategory__wrap" key={category.title}>
                <div className="styleСategory__title">{category.name}</div>
                <div className="styles">
                  {category.array.map((style, styleIndex) => {
                    return (
                      <StylesItem
                        style={style}
                        category={category.title}
                        key={style.sub_name}
                        setChosenStyles={setChosenStyles}
                        chosenStyles={chosenStyles}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="createBtn btn"
          onClick={() => handleArtGenerate(chosenStyles)}
        >
          Создать арт <div className="createBtn__delimetr"></div>
          <EnergySvg width={"18px"} height={"18px"} color="#FFFFFF" /> 15
        </div>
      </div>
    </div>
  );
};

export default StyleSelection;
