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
            <div className="Header__controls">
              <div
                className="payEnergy__closeBtn closeBtn Loading__close"
                onClick={() => {
                  window.history.back();
                }}
              >
                <img src={closeBtn} />
              </div>
            </div>

            <div className="Loading__title title">Сервер перегружен</div>
            <div className="Loading__text text">
              Вы можете помочь написав, в сообщество <br />
              <a href="https://vk.com/vkappsdev" target="_blank">
                VK Mini apps
              </a>{" "}
              примерно следующее:
              <br /> Выделите мощный сервер Убик 🚀
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
              Ваш арт <br />
              <span className="title_accented">генерируется</span>
              <div className="dot-flashing"></div>
            </div>

            <RoundLoader />
            <div className="Loading__desc text">
              Обычно это занимает 15 секунд, но вы можете написать команде{" "}
              <a href="https://vk.com/vkappsdev" target="_blank">
                VK Mini apps
              </a>{" "}
              и попросить мощный сервер для нашего проекта. Спасибо :)
            </div>
          </div>
        )}
      </div>
    </Panel>
  );
};

export default Loading;
