import React, { useState, useContext } from "react";
import "./PayEnergy.css";

import closeBtn from "assets/img/close-btn.svg";
import energyImg from "assets/img/payEnergy__energyImg.svg";
import benefitsImg from "assets/img/payEnergy__benefitsImg.svg";
import background from "assets/img/payEnergy__background.png";
import EnergySvg from "components/common/svgs/energySvg";

import { MainContext } from "components/shared/providers/MainProvider";

const PayEnergy = ({ id, buySubscribe }) => {
  const [activeTariff, setActiveTariff] = useState("first");
  const { router } = useContext(MainContext);

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
              router.toBack();
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
            <div
              className={`tariffsItem ${
                activeTariff == "first" && "tariffsItem__active"
              }`}
              onClick={handleTariff}
              id="first"
            >
              <div className="tariffsItem__title mini-title">
                <div className="tariffsItem__img"></div>
                <EnergySvg width="20px" height="20px" />
                525{" "}
              </div>
              <div className="tariffsItem__price">25 голосов</div>
            </div>
            <div
              className={`tariffsItem ${
                activeTariff == "second" && "tariffsItem__active"
              }`}
              onClick={handleTariff}
              id="second"
            >
              <div className="tariffsItem__title mini-title">
                <div className="tariffsItem__img"></div>
                <EnergySvg width="20px" height="20px" />
                2400{" "}
              </div>
              <div className="tariffsItem__price">80 голосов</div>
            </div>
            <div
              className={`tariffsItem ${
                activeTariff == "third" && "tariffsItem__active"
              }`}
              onClick={handleTariff}
              id="third"
            >
              <div className="tariffsItem__title mini-title">
                <div className="tariffsItem__img"></div>
                <EnergySvg width="20px" height="20px" />
                14700
              </div>
              <div className="tariffsItem__price ">
                <div className="tariffsItem__discount">скидка 10%</div>
                350 голосов
              </div>
            </div>
          </div>
          <div className="payEnergy__btn btn" onClick={buySubscribe}>
            Купить
            <EnergySvg width="18px" height="18px" color="#fff" />
            {activeTariff == "first"
              ? " 500"
              : activeTariff == "second"
              ? " 2000"
              : " 10000 "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayEnergy;
