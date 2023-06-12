import React, { useState, useEffect, useContext } from "react";
import "./Inquiry.css";
import { Panel, Switch } from "@vkontakte/vkui";
import "animate.css";
import InquiryForm from "./components/InquiryForm";
import backBtn from "assets/img/back-btn.svg";
import { MainContext } from "components/shared/providers/MainProvider";
import examples from "./inputExamples.json";

const Inquiry = ({ id }) => {
  const { inputValue, setInputValue, router, modePro, handleChangeModePro } =
    useContext(MainContext);
  const [example, setExample] = useState(false);

  const handleExample = (event) => {
    setInputValue(event.target.innerText);
  };

  const randomizeExample = () => {
    const randomIndex = Math.floor(Math.random() * examples.length);
    if (example == examples[randomIndex]) {
      randomizeExample();
      return;
    }
    setExample(examples[randomIndex]);
  };

  useEffect(() => {
    randomizeExample();
  }, []);

  return (
    <Panel id={id}>
      <div className={`inquiry ${modePro && "modePro"}`}>
        <div className="gradient-round"></div>
        <div className="inquiry__body">
          <div className="inquiry__controls Header__controls">
            <div
              className="inquiry__controls_closeBtn backBtn"
              onClick={() => {
                router.toBack();
              }}
            >
              <img src={backBtn} />
            </div>
            <div
              className="styleSelection__pro smallBtn-text"
              onClick={handleChangeModePro}
            >
              <Switch checked={modePro} onChange={handleChangeModePro} />
              <span>PRO</span>
            </div>
          </div>
          <div className="inquiry__title title">
            Напишите запрос для создания{" "}
            <span className="text_accented">арта</span>
          </div>
          <InquiryForm
            handleExample={handleExample}
            example={example}
            randomizeExample={randomizeExample}
          />
        </div>
      </div>
    </Panel>
  );
};

export default Inquiry;
