import React, { useState, useEffect, useContext } from "react";
import refresh from "assets/img/prompt-refresh.svg";
import { Slider, Switch } from "@vkontakte/vkui";
import InquiryTextarea from "./InquiryTextarea";
import { MainContext } from "components/shared/providers/MainProvider";
import EnergySvg from "components/common/energySvg";

function InquiryForm({ handleExample, example, randomizeExample }) {
  const [error, setError] = useState(false);
  const {
    inputValue,
    inquiryMass,
    router,
    modePro,
    handleArtGenerate,
    guidanceScale,
    setGuidanceScale,
  } = useContext(MainContext);

  return (
    <div className="inquiry__form">
      <div className="inquiry__wrap">
        {inquiryMass.map((item, index) => {
          if ((!modePro && index == 0) || modePro) {
            return (
              <InquiryTextarea
                item={item}
                error={error && index == 0}
                key={index}
              />
            );
          }
        })}
        {modePro ? (
          <div className="inquiryPrompt__wrap">
            <div className="inquiryPrompt__guidanceScale title_h4-18px">
              Guidance Scale: <span>{guidanceScale}</span>
            </div>
            <Slider
              step={0.1}
              min={1}
              max={30}
              value={Number(guidanceScale)}
              aria-labelledby="with-step"
              onChange={setGuidanceScale}
              className="inquiryPrompt__slider"
            />
          </div>
        ) : (
          <div className="text inquiry__inputExample ">
            Например:
            <span
              className="inquiry__inputExample_underline"
              onClick={handleExample}
            >
              {example}
            </span>
            <img src={refresh} onClick={randomizeExample} />
          </div>
        )}
      </div>
      <div
        className="inquiry__btn btn"
        onClick={
          inputValue.length >= 1
            ? () =>
                modePro ? handleArtGenerate() : router.toPanel("styleSelection")
            : () => {
                setError(true);
                setTimeout(() => {
                  setError(false);
                }, 1000);
              }
        }
      >
        {modePro ? (
          <>
            Создать арт <div className="createBtn__delimetr"></div>
            <EnergySvg width={"18px"} height={"18px"} color="#FFFFFF" /> 15
          </>
        ) : (
          "Выберите свой стиль"
        )}
      </div>
    </div>
  );
}

export default InquiryForm;
