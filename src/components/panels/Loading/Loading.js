import React, { useState, useEffect } from "react";
import "./Loading.css";
import { Panel } from "@vkontakte/vkui";
import "animate.css";

import RoundLoader from "components/common/roundLoader";
import background from "assets/img/loading__background.png";

const Loading = ({ id, go, currentImg, error }) => {
  const [percent, setPercent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPercent((prevPercent) => {
        let counter = prevPercent < 100 && prevPercent + 1;
        if (counter == 100) {
          clearInterval(intervalId);
        }

        return counter;
      });
    }, 100);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (percent >= 99 && !currentImg) {
      setPercent(99);
      setIsAnimating(false);
    }
    if (currentImg) {
      setPercent(100);
    }

    if (percent >= 100 && currentImg) {
      const img = new Image();
      img.src = currentImg;
      go("artSelection");
    }
  }, [percent, currentImg]);

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
            <div className="Loading__title title">
              При генерации возникла ошибка !
            </div>
            <div
              className="Loading__errorBtn"
              onClick={() => window.history.back()}
            >
              Назад
            </div>
          </div>
        ) : (
          <div className="Loading__wrap">
            <div className="Loading__title title">
              Ваш арт <span className="title_accented">генерируется</span>
            </div>
            <div className="Loading__circle">
              <RoundLoader percent={percent} />
              <div id="count" className="Loading__percent">
                {percent + "%"}
              </div>
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
