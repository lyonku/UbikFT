import React, { useState, useEffect } from "react";
import "./StyleSelection.css";
import { Panel } from "@vkontakte/vkui";
import modelSelection from "assets/img/back-btn.svg";

import data from "data.json";
import StylesItem from "./components/StylesItem";
import EnergySvg from "components/common/energySvg";

const StyleSelection = ({
  id,
  go,
  inputValue,
  handleArtGenerate,
  setChosenStyles,
  chosenStyles,
  goBack,
}) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    const textareaTwo = document.getElementById("textareaTwo");
    autoResize(textareaTwo);
  }, []);

  const autoResize = (e) => {
    textareaTwo.style.height = "auto";
    textareaTwo.style.height = textareaTwo.scrollHeight + "px";
  };

  return (
    <div className="styleSelection">
      <div className="gradient-round"></div>

      <div className="styleSelection__wrap">
        <div className="styleSelection__header">
          <div
            className="styleSelection__modelSwitch smallBtn-text"
            onClick={() => {
              goBack(2);
            }}
          >
            <img src={modelSelection} />
            Изменить модель
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
          <div className="inquiry__inputWrap">
            <textarea
              id="textareaTwo"
              defaultValue={inputValue}
              className="inquiry__input"
              rows={1}
            />
          </div>
        </div>

        <div
          className={`styleSelection__body ${
            error && "animate__animated animate__shakeX"
          }`}
        >
          {data.map((category, categoryIndex) => {
            if (chosenStyles.genre || category.title == "genre") {
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
            }
          })}
        </div>
        <div
          className="createBtn btn"
          onClick={
            chosenStyles.genre
              ? () => handleArtGenerate()
              : () => {
                  setError(true);
                  setTimeout(() => {
                    setError(false);
                  }, 1000);
                }
          }
        >
          Создать арт <div className="createBtn__delimetr"></div>
          <EnergySvg width={"18px"} height={"18px"} color="#FFFFFF" /> 15
        </div>
      </div>
    </div>
  );
};

export default StyleSelection;
