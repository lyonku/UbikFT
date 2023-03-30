import React, { useState, useEffect } from "react";
import "./PayEnergy.css";
import closeBtn from "img/close-btn.png";
import energyImg from "img/payEnergy__energyImg.png";
import benefitsImg from "img/payEnergy__benefitsImg.png";
import background from "img/payEnergy__background.png";

const PayEnergy = ({}) => {
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
        background: `linear-gradient(180deg, rgba(0, 0, 0, 0.44) 0%, #000000 100%), no-repeat center/cover url(${background})`,
      }}
    >
      <div className="gradient-round"></div>

      <div className="payEnergy__body">
        <div className="payEnergy__section">
          <div
            className="payEnergy__closeBtn closeBtn"
            onClick={() => window.history.back()}
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
              <div className="tariffsItem__price ">400 ₽</div>
            </div>
          </div>
          <div className="payEnergy__btn btn">
            Начать бесплатную пробную версию
          </div>
          <div className="payEnergy__info">подписка с автопродлением.</div>
        </div>
      </div>
    </div>
  );
};

export default PayEnergy;
