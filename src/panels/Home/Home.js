import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Home.css";
import { Panel } from "@vkontakte/vkui";
import backgroundProtogen from "img/home__protogen_background.png";
import backgroundAnything from "img/home__anything_background.png";
import backgroundVintedois from "img/home__vintedois_background.png";

const Home = ({ id, go }) => {
  const [currentModel, setCurrentModel] = useState("Protogen");

  const handleModel = (event) => {
    if (event.target.id) {
      setCurrentModel(event.target.id);
    } else {
      if (event.target.children[0]) {
        setCurrentModel(event.target.children[0]?.id);
        event.target.children[0].checked = true;
      }
    }
  };

  return (
    <Panel id={id}>
      <div
        className="home"
        style={{
          background: `linear-gradient(180deg, rgba(0, 0, 0, 0) -19.13%, #000000 100%), no-repeat center/cover url(${
            currentModel == "Protogen"
              ? backgroundProtogen
              : currentModel == "Anything"
              ? backgroundAnything
              : backgroundVintedois
          })`,
        }}
      >
        <div className="gradient-round"></div>
        <div className="home__body">
          <div className="home__title title">
            Выберите модель <span className="title_accented">ИИ</span>, с
            которой вы хотите работать
          </div>
          <div className="home__row">
            <div
              className={`models-item ${
                currentModel == "Protogen" && "models-item_active"
              }`}
              onClick={handleModel}
            >
              <input
                type="radio"
                id="Protogen"
                name="models"
                className="models-item__radio"
                defaultChecked
              ></input>
              <label htmlFor="Protogen">
                <div className="models-item__title mini-title">Protogen</div>
                <div className="models-item__text text">Люди</div>
              </label>
            </div>
            <div
              className={`models-item ${
                currentModel == "Anything" && "models-item_active"
              }`}
              onClick={handleModel}
            >
              <input
                type="radio"
                id="Anything"
                name="models"
                className="models-item__radio"
              ></input>
              <label htmlFor="Anything">
                <div className="models-item__title mini-title">Anything</div>
                <div className="models-item__text text">Аниме</div>
              </label>
            </div>
            <div
              className={`models-item ${
                currentModel == "Vintedois" && "models-item_active"
              }`}
              onClick={handleModel}
            >
              <input
                type="radio"
                id="Vintedois"
                name="models"
                className="models-item__radio"
              ></input>
              <label htmlFor="Vintedois">
                <div className="models-item__title mini-title">Vintedois</div>
                <div className="models-item__text text">Общий</div>
              </label>
            </div>
          </div>
          <div
            className="home__btn btn"
            onClick={() => go("inquiry")}
          >{`Выбрать ${currentModel}`}</div>
        </div>
      </div>
    </Panel>
  );
};

export default Home;
