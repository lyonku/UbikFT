import React, { useState, useEffect, useContext } from "react";
import { Panel, View } from "@vkontakte/vkui";
import "animate.css";
import "./Debug.css";
import backBtn from "assets/img/back-btn.svg";
import { MainContext } from "components/shared/providers/MainProvider";
import RoundLoader from "components/common/roundLoader";

const Debug = ({ id }) => {
  const { router, generateArt } = useContext(MainContext);

  const [negativePrompt, setNegativePrompt] = useState("");
  const [activeModel, setActiveModel] = useState("rev-anim");
  const [currentImg, setCurrentImg] = useState();
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(true);

  const handleInputValue = (event) => {
    setInputValue(event.target.value);
  };
  const handleInputNegativePrompt = (event) => {
    setNegativePrompt(event.target.value);
  };

  const handleGenerate = async () => {
    setCurrentImg();
    setError();
    const config = {
      key: "J5e6ryPxKnOCHdITBr7M5hnvSX6nYpHvbFTSiO4i9yThzB3pBTRfeF9Zk6CG",
      model_id: activeModel,
      prompt: inputValue,
      negative_prompt: negativePrompt,
      width: "512",
      height: "512",
      samples: "1",
      num_inference_steps: "20",
      safety_checker: "yes",
      seed: null,
      guidance_scale: 7.5,
      webhook: null,
      track_id: null,
    };
    generateArt(config);
    router.toPanel("img");
    const data = await generateArt(config);
    let date = new Date();
    if (data.status === "failed" || !data.output) {
      console.log(
        `Результат генерации на ${date.getHours() + ":" + date.getMinutes()}: `,
        data
      );
      console.log("==================================================");

      setError(true);
    } else {
      console.log(
        `Результат генерации на ${date.getHours() + ":" + date.getMinutes()}: `,
        data
      );
      console.log("==================================================");
      setCurrentImg(data.output[0]);
    }
  };

  return (
    <View id={id} activePanel={router.activePanel}>
      <Panel id="debug">
        <div className="inquiry">
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
            </div>
            <div className="inquiry__title title">
              Напишите запрос для создания{" "}
              <span className="text_accented">арта</span>
            </div>
            <div>prompt:</div>
            <textarea
              placeholder="Prompt"
              className="inquiry__input"
              id="textarea"
              value={inputValue}
              onChange={handleInputValue}
              rows={3}
              maxLength={800}
              style={{ borderRadius: "10px" }}
            />
            <br />
            <div>negative_prompt:</div>
            <textarea
              placeholder="Negative prompt"
              className="inquiry__input"
              id="textarea"
              value={negativePrompt}
              onChange={handleInputNegativePrompt}
              rows={3}
              maxLength={800}
              style={{ borderRadius: "10px" }}
            />
            <br />
            <div style={{ display: "flex", gap: "10px" }}>
              <div
                style={{
                  backgroundColor:
                    activeModel == "rev-anim" ? "#81c43c" : "#b2b2b2",
                  padding: "5px",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setActiveModel("rev-anim");
                }}
              >
                rev-anim
              </div>
              <div
                style={{
                  backgroundColor:
                    activeModel == "counterfeit-v30" ? "#81c43c" : "#b2b2b2",
                  padding: "5px",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setActiveModel("counterfeit-v30");
                }}
              >
                counterfeit-v30
              </div>
            </div>

            <br />
            <div
              className="inquiry__btn btn"
              onClick={handleGenerate}
            >{`Сгенерировать`}</div>
          </div>
        </div>
      </Panel>
      <Panel id="img">
        <div className="inquiry">
          <div className="gradient-round"></div>
          <div
            className="inquiry__body"
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <div className="inquiry__controls Header__controls">
              <div
                className="inquiry__controls_closeBtn backBtn"
                onClick={() => {
                  router.toBack();
                }}
              >
                <img src={backBtn} />
              </div>
            </div>
            {currentImg ? (
              <img src={currentImg} style={{ width: "100%" }} />
            ) : (
              <RoundLoader />
            )}
            {error && <div>Ошибка генерации, посмотрите логи (F12)</div>}
          </div>
        </div>
      </Panel>
    </View>
  );
};

export default Debug;
