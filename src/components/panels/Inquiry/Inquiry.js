import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Inquiry.css";
import { Panel } from "@vkontakte/vkui";
import "animate.css";

const Home = ({ id, go, inputValue, setInputValue }) => {
  const [error, setError] = useState(false);

  const handleExample = (event) => {
    setInputValue(event.target.innerText);
  };

  const handleInputValue = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <Panel id={id}>
      <div className="inquiry">
        <div className="gradient-round"></div>
        <div className="inquiry__body">
          <div className="inquiry__title title">
            Что бы вы хотели{" "}
            <span className="home__title_accented">увидеть?</span>
          </div>
          <div className="inquiry__form">
            <div className="inquiry__wrap">
              <div
                className={`inquiry__inputWrap ${
                  error && "animate__animated animate__shakeX"
                }`}
              >
                <input
                  type="text"
                  placeholder="Опишите, что у вас на уме"
                  className="inquiry__input"
                  value={inputValue}
                  onChange={handleInputValue}
                />
              </div>

              <div className="text inquiry__inputExample ">
                Например:
                <span
                  className="inquiry__inputExample_underline"
                  onClick={handleExample}
                >
                  корги с зелёным яблоком на голове
                </span>
              </div>
            </div>
            <div
              className="inquiry__btn btn"
              onClick={
                inputValue.length >= 1
                  ? () => go("main")
                  : () => {
                      setError(true);
                      setTimeout(() => {
                        setError(false);
                      }, 1000);
                    }
              }
            >{`Выберите свой стиль`}</div>
          </div>
        </div>
      </div>
    </Panel>
  );
};

export default Home;
