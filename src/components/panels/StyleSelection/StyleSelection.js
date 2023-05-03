import React, { useState, useEffect, useRef } from "react";
import "./StyleSelection.css";
import { Panel } from "@vkontakte/vkui";

import data from "data.json";
import StylesItem from "./components/StylesItem";
import backBtn from "assets/img/back-btn.svg";
import closeBtn from "assets/img/close-btn.svg";
import EnergySvg from "components/common/energySvg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { HorizontalScroll, HorizontalCell } from "@vkontakte/vkui";

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
  const [width, setWidth] = useState(window.innerWidth);
  const scrollToTopRef = useRef(null); // создаем ref

  useEffect(() => {
    const textareaTwo = document.getElementById("textareaTwo");
    autoResize(textareaTwo);
  }, []);

  const autoResize = (e) => {
    textareaTwo.style.height = "auto";
    textareaTwo.style.height = textareaTwo.scrollHeight + "px";
  };

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClearStyles = (category) => {
    let copy = Object.assign({}, chosenStyles);
    copy[category] = [];
    setChosenStyles(copy);
  };

  function handleScrollToTop() {
    scrollToTopRef.current.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="styleSelection" ref={scrollToTopRef}>
      <div className="gradient-round"></div>

      <div className="styleSelection__wrap">
        <div className="styleSelection__header">
          <div
            className="styleSelection__modelSwitch smallBtn-text"
            onClick={() => {
              goBack(2);
            }}
          >
            <img src={backBtn} />
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
        <div className={`styleSelection__body`}>
          {data.map((category, categoryIndex) => {
            return (
              <div
                className={`styleСategory__wrap ${
                  error &&
                  category.title == "genre" &&
                  "animate__animated animate__shakeX"
                }`}
                key={category.title}
              >
                <div className="styleСategory__title">
                  <span>{category.name}</span>
                  {chosenStyles[category.title]?.length >= 1 &&
                    category.title != "genre" && (
                      <div className="styleСategory__chips">
                        <span>{chosenStyles[category.title]?.length}</span>
                        <img
                          src={closeBtn}
                          onClick={() => handleClearStyles(category.title)}
                        />
                      </div>
                    )}
                </div>
                <HorizontalScroll
                  showArrows
                  getScrollToLeft={(i) => i - 220}
                  getScrollToRight={(i) => i + 220}
                >
                  <div className="styleСategory__row">
                    {category.array.map((style, styleIndex) => {
                      return (
                        <StylesItem
                          key={styleIndex}
                          style={style}
                          category={category.title}
                          setChosenStyles={setChosenStyles}
                          chosenStyles={chosenStyles}
                        />
                      );
                    })}
                  </div>
                </HorizontalScroll>
              </div>
            );
          })}
        </div>
        <div
          className="createBtn btn"
          onClick={
            chosenStyles?.genre?.length >= 1
              ? () => handleArtGenerate()
              : () => {
                  handleScrollToTop();
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
