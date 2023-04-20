import React, { useState, useRef } from "react";
import "./ArtSelection.css";
import GeneratedArt from "./components/GeneratedArt";
import GeneratedNFT from "./components/GeneratedNFT";

import artSelectionEdit from "assets/img/artSelection__edit.svg";
import closeBtn from "assets/img/close-btn.svg";
import benefitsImg from "assets/img/payEnergy__benefitsImg.svg";
import warningImg from "assets/img/artSelection__warning.svg";
import EnergySvg from "components/common/energySvg";

const ArtSelection = ({ id, go, currentImg }) => {
  const [nftCreatePage, setNftCreatePage] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showNotificationDelete, setShowNotificationDelete] = useState(false);

  const handleAddToProfile = () => {
    setShowNotification(true);
    setNftCreatePage(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000); // установите таймер на 3 секунды для автоматического скрытия уведомления
  };

  const handleDelete = () => {
    window.history.back();
  };

  return (
    <div className="ArtSelection">
      <div className="gradient-round"></div>
      <div className="ArtSelection__wrap">
        <div className="ArtSelection__controls">
          {nftCreatePage ? (
            <div
              className="ArtSelection__close smallBtn-text"
              onClick={() => window.history.back()}
            >
              <img src={closeBtn} />
            </div>
          ) : (
            <div
              className="ArtSelection__edit smallBtn-text"
              onClick={() => window.history.back()}
            >
              <img src={artSelectionEdit} />
              Изменить
            </div>
          )}
          <div
            className="ArtSelection__energy smallBtn-text"
            onClick={() => go("payEnergy")}
          >
            <EnergySvg width={"20px"} height={"20px"} />
            12345
          </div>
        </div>
        {nftCreatePage ? (
          <GeneratedNFT
            go={go}
            currentImg={currentImg}
            setShowNotificationDelete={setShowNotificationDelete}
            handleAddToProfile={handleAddToProfile}
          />
        ) : (
          <GeneratedArt
            currentImg={currentImg}
            go={go}
            setShowNotificationDelete={setShowNotificationDelete}
            handleAddToProfile={handleAddToProfile}
          />
        )}
      </div>

      <div className={`overlay ${showNotificationDelete && "open"}`}></div>
      <div
        className={`ArtSelection__notification ${showNotification && "open"}`}
      >
        <img src={benefitsImg} />
        Арт был добавлен в ваш профиль
      </div>
      <div
        className={`ArtSelection__notification_delete ${
          showNotificationDelete && "open"
        }`}
      >
        <img src={warningImg} />
        Ваш арт не сохранится
        <div className="ArtSelection__notification-btns">
          <div
            className="ArtSelection__notification-btn_leave"
            onClick={handleDelete}
          >
            Удалить
          </div>
          <div
            className="ArtSelection__notification-btn_stay"
            onClick={() => setShowNotificationDelete(false)}
          >
            Отмена
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtSelection;
