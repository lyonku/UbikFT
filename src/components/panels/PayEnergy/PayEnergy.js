import React, { useState, useEffect } from "react";
import "./PayEnergy.css";
import closeBtn from "assets/img/close-btn.svg";
import energyImg from "assets/img/payEnergy__energyImg.svg";
import benefitsImg from "assets/img/payEnergy__benefitsImg.svg";
import background from "assets/img/payEnergy__background.png";

const PayEnergy = ({ buySubscribe }) => {
  const [activeTariff, setActiveTariff] = useState("first");

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
        <div className="payEnergy__section">
          <div
            className="payEnergy__closeBtn closeBtn"
            onClick={() => {
              window.history.back();
            }}
          >
            <img src={closeBtn} />
          </div>
          <div className="benefits">
            <img className="benefits__img" src={energyImg} />
            <div className="benefits__title title">
              Раскройте весь потенциал нейронных сетей
            </div>
            <div className="benefits__body">
              <div className="benefits__item">
                <img className="benefits__itemImg" src={benefitsImg} />
                Бесконечная энергия
              </div>
              <div className="benefits__item">
                <img className="benefits__itemImg" src={benefitsImg} />
                Быстрая генерация
              </div>
              <div className="benefits__item">
                <img className="benefits__itemImg" src={benefitsImg} />
                Нет рекламы
              </div>
            </div>
          </div>
        </div>

        <div className="payEnergy__section">
          <div className="tariffs">
            <div
              className={`tariffsItem ${
                activeTariff == "first" && "tariffsItem__active"
              }`}
              onClick={handleTariff}
              id="first"
            >
              <div className="tariffsItem__title mini-title">
                <div className="tariffsItem__img"></div>Пробные период
              </div>
              <div className="tariffsItem__price">Бесплатно</div>
            </div>
            <div
              className={`tariffsItem ${
                activeTariff == "second" && "tariffsItem__active"
              }`}
              onClick={handleTariff}
              id="second"
            >
              <div className="tariffsItem__title mini-title">
                <div className="tariffsItem__img"></div>1 неделя
              </div>
              <div className="tariffsItem__price">150 ₽</div>
            </div>
            <div
              className={`tariffsItem ${
                activeTariff == "third" && "tariffsItem__active"
              }`}
              onClick={handleTariff}
              id="third"
            >
              <div className="tariffsItem__title mini-title">
                <div className="tariffsItem__img"></div>1 месяц
              </div>
              <div className="tariffsItem__price ">
                <div className="tariffsItem__discount">скидка 15%</div>
                400 ₽
              </div>
            </div>
          </div>
          <div className="payEnergy__btn btn" onClick={buySubscribe}>
            {activeTariff == "first"
              ? "Начать бесплатную пробную версию"
              : activeTariff == "second"
              ? "Приобрести подписку на 1 неделю"
              : "Приобрести подписку на 1 месяц"}
          </div>
          <div className="payEnergy__info">подписка с автопродлением.</div>
        </div>
      </div>
    </div>
  );
};

export default PayEnergy;
