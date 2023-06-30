import React, { useState, useContext } from "react";
import refresh from "assets/img/prompt-refresh.svg";
import { Slider } from "@vkontakte/vkui";
import InquiryTextarea from "./InquiryTextarea";
import { MainContext } from "components/shared/providers/MainProvider";

function InquiryForm({ handleExample, example, randomizeExample, error }) {
  const { inquiryMass, modePro, guidanceScale, setGuidanceScale, inputValue } =
    useContext(MainContext);

  return (
    <div className="inquiry__form">
      <div className="inquiry__wrap">
        {modePro && (
          <div className="inquiry__hint transparentBlock">
            В режиме <span className="text_accented">PRO</span> необходимо
            использовать <span className="text_accented">английский язык</span>
          </div>
        )}
        {inquiryMass.map((item, index) => {
          if ((!modePro && index == 0) || modePro) {
            return (
              <InquiryTextarea
                item={item}
                error={error && index == 0}
                key={index}
                inputValue={inputValue}
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
          !inputValue && (
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
          )
        )}
      </div>
    </div>
  );
}

export default InquiryForm;
