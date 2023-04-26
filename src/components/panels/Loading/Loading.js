import React, { useState, useEffect } from "react";
import "./Loading.css";
import { Panel } from "@vkontakte/vkui";
import "animate.css";
import RoundLoader from "components/common/roundLoader";
import background from "assets/img/loading__background.png";
import closeBtn from "assets/img/close-btn.svg";

const Loading = ({ id, go, currentImg, error, handleArtGenerate }) => {
  useEffect(() => {
    if (currentImg) {
      const img = new Image();
      img.src = currentImg;
      go("artSelection");
    }
  }, [currentImg]);

  return (
    <Panel id={id}>
      <div
        className="Loading"
        style={{
          background: `linear-gradient(180deg, rgba(0, 0, 0, 0) -19.13%, #000000 100%), no-repeat center/cover url(${background})`,
        }}
      >
        <div className="Loading__background_blackoutdown"></div>
        <div className="Loading__background_blackoutup"></div>
        <div className="Loading__background_glow"></div>
        {error ? (
          <div className="Loading__wrap">
            <div
              className="payEnergy__closeBtn closeBtn Loading__close"
              onClick={() => {
                window.history.back();
              }}
            >
              <img src={closeBtn} />
            </div>
            <div className="Loading__title title">
              При генерации возникла ошибка !
            </div>
            <div
              className="Loading__errorBtn"
              onClick={() => {
                handleArtGenerate();
              }}
            >
              Повторить попытку
            </div>
          </div>
        ) : (
          <div className="Loading__wrap">
            <div className="Loading__title title">
              Ваш арт <span className="title_accented">генерируется</span>
            </div>
            <div className="Loading__circle">
              <RoundLoader />

              <div className="Loading__roundBack"></div>
            </div>
            <div className="Loading__desc text">
              Обычно это не занимает больше 15 секунд
            </div>
          </div>
        )}
      </div>
    </Panel>
  );
};

export default Loading;
