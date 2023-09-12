import React, { useState, useContext } from "react";
import refresh from "assets/img/prompt-refresh.svg";
import { Slider } from "@vkontakte/vkui";
import { MainContext } from "components/shared/providers/MainProvider";
import InquiryTextarea from "components/common/InquiryTextarea";
import { ContestsContext, GenerateContext } from "components/shared/providers";

function InquiryForm({ handleExample, example, randomizeExample, error }) {
  const {
    inquiryMass,
    modePro,
    guidanceScale,
    setGuidanceScale,
    inputValue,
    setInputValue,
  } = useContext(GenerateContext);

  return (
    <div className="inquiry__form">
      {modePro ? (
        <div className="inquiry__wrap">
          <div className="inquiry__hint transparentBlock">
            В режиме <span className="text_accented">PRO</span> необходимо
            использовать <span className="text_accented">английский язык</span>
          </div>
          {inquiryMass.map((item, index) => {
            if ((!modePro && index == 0) || modePro) {
              return (
                <div key={index} className="inquiryPrompt__wrap">
                  <div>{item.inputTitle}</div>
                  <InquiryTextarea
                    error={error}
                    value={item.value}
                    setValue={item.setValue}
                    placeholder={item.placeholder}
                  />
                </div>
              );
            }
          })}
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
              onChange={(e) => setGuidanceScale(e)}
              className="inquiryPrompt__slider"
            />
          </div>
        </div>
      ) : (
        <div className="inquiry__form">
          <InquiryTextarea
            error={error}
            value={inputValue}
            setValue={setInputValue}
            placeholder={"Напишите что хотите увидеть"}
          />
          {!inputValue && (
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
      )}
    </div>
  );
}

export default InquiryForm;
