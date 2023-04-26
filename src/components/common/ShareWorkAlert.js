import React, { useState, useRef } from "react";
import { useClickAway } from "react-use";
import closeBtn from "assets/img/close-btn.svg";
import addToHistory from "assets/img/addToHistory.svg";
import addToWall from "assets/img/addToWall.svg";
import sendMessage from "assets/img/sendMessage.svg";

function ShareWorkAlert({
  showShareAlert,
  setShowShareAlert,
  handleShareWallPost,
  handleShareStoriesPost,
}) {
  const ref = useRef(null);

  useClickAway(ref, () => {
    setShowShareAlert(false);
  });

  return (
    <div
      className={`ArtSelection__notification Notification ${
        showShareAlert && "open"
      }`}
      ref={ref}
    >
      <div className="ArtSelection__notification-header">
        <span>Поделится работой</span>
        <div
          className="ArtSelection__close smallBtn-text"
          onClick={() => {
            setShowShareAlert(false);
          }}
        >
          <img src={closeBtn} />
        </div>
      </div>

      <div className="ArtSelection__notification-btns">
        <div className="ArtSelection__notification-btns_header">
          <div
            className="Notification__btn Notification__btn_addHistory"
            onClick={handleShareStoriesPost}
          >
            <img src={addToHistory} />
            <span>В историю</span>
          </div>
          <div
            className="Notification__btn Notification__btn_addWall"
            onClick={handleShareWallPost}
          >
            <img src={addToWall} />
            <span>На стену</span>
          </div>
        </div>

        <div className="Notification__btn Notification__btn_sendMessage">
          <img src={sendMessage} />
          <span>В сообщении</span>
        </div>
      </div>
    </div>
  );
}

export default ShareWorkAlert;
