import React, { useState, useContext, useEffect } from "react";
import "./PayEnergy.css";

import closeBtn from "assets/img/close-btn.svg";
import energyImg from "assets/img/payEnergy__energyImg.svg";
import benefitsImg from "assets/img/checkMark.svg";
import background from "assets/img/payEnergy__background.png";
import EnergySvg from "components/common/svgs/energySvg";

import { MainContext } from "components/shared/providers/MainProvider";
import { useFirstPageCheck } from "@vkontakte/vk-mini-apps-router";

const PayEnergy = () => {
  const { buySubscribe, payment, goBack, goReplace } = useContext(MainContext);
  const [activeTariff, setActiveTariff] = useState(payment[0]?.item);
  const plural = require("plural-ru");
  const isFirstPage = useFirstPageCheck();

  useEffect(() => {
    if (!activeTariff) {
      setActiveTariff(payment[0]?.item);
    }
  }, [payment]);

  const handleTariff = (e) => {
    if (!e.target.id) {
      setActiveTariff(
        e.target.parentNode.id
          ? e.target.parentNode.id
          : e.target.parentNode.parentNode.id
      );
    } else {
      setActiveTariff(e.target.id);
    }
  };

  return (
    <div
      className="payEnergy"
      style={{
        background: `linear-gradient(180deg, rgba(0, 0, 0, 0.45) 60%, #000000 100%), no-repeat center/cover url(${background})`,
      }}
    >
      <div className="gradient-round"></div>

      <div className="payEnergy__body">
        <div className="payEnergy__controls">
          <div
            className="payEnergy__closeBtn closeBtn"
            onClick={() => {
              isFirstPage ? goReplace("/") : goBack();
            }}
          >
            <img src={closeBtn} />
          </div>
        </div>
        <div className="payEnergy__section">
          <div className="benefits">
            <img className="benefits__img" src={energyImg} />
            <div className="benefits__title title">
              Создавайте шедевры без ограничений
            </div>
            <div className="benefits__body">
              <div className="benefits__item">
                <img className="benefits__itemImg" src={benefitsImg} />
                Создавайте арт
              </div>
              <div className="benefits__item">
                <img className="benefits__itemImg" src={benefitsImg} />
                Выводите в топ лучшие работы
              </div>
              <div className="benefits__item">
                <img className="benefits__itemImg" src={benefitsImg} />
                Без рекламы
              </div>
            </div>
          </div>
          <div className="tariffs">
            {payment?.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`tariffsItem ${
                    activeTariff == item.item && "tariffsItem__active"
                  }`}
                  onClick={handleTariff}
                  id={item.item}
                >
                  <div className="tariffsItem__title mini-title">
                    <div className="tariffsItem__img"></div>
                    <EnergySvg width="20px" height="20px" />
                    {item.countEnergy}
                  </div>
                  <div className="tariffsItem__price">
                    {plural(
                      item.countVkVote,
                      "%d голос",
                      "%d голоса",
                      "%d голосов"
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div
            className="payEnergy__btn btn"
            onClick={() => buySubscribe(activeTariff)}
          >
            Купить
            <EnergySvg width="18px" height="18px" color="#fff" />
            {payment?.find((item) => item.item === activeTariff)?.countEnergy}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayEnergy;
