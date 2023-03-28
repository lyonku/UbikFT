import React, { useState, useRef } from "react";
import "./StyleSelection.css";
import { Panel } from "@vkontakte/vkui";
import modelSelection from "img/modelSelection-btn.png";
import energy from "img/energy-btn.png";
import energyWhite from "img/energy-white-icon.png";
import data from "data.json";
import StylesItem from "./components/StylesItem";

const StyleSelection = ({ id, go, inputValue }) => {
  const [chosenStyles, setChosenStyles] = useState({});
  console.log(chosenStyles);
  return (
    <div className="styleSelection">
      <div className="gradient-round"></div>

      <div className="styleSelection__wrap">
        <div className="styleSelection__header">
          <div
            className="styleSelection__modelSwitch smallBtn-text"
            onClick={() => go("home")}
          >
            <img src={modelSelection} />
            Выбрать модель
          </div>
          <div className="styleSelection__energy smallBtn-text">
            <img src={energy} />
            12345
          </div>
        </div>
        <div className="styleSelection__title">{inputValue}</div>
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

        <div className="createBtn btn">
          Создать арт <div className="createBtn__delimetr"></div>{" "}
          <img src={energyWhite} className="createBtn__energy" /> 15
        </div>
      </div>
    </div>
  );
};

export default StyleSelection;
