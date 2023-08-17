import React, { useContext, useRef } from "react";
import { useClickAway } from "react-use";
import closeBtn from "assets/img/close-btn.svg";
import addToHistory from "assets/img/addToHistory.svg";
import addToWall from "assets/img/addToWall.svg";
import { MainContext } from "components/shared/providers";
import { Icon16MessageOutline } from "@vkontakte/icons";
import wallPostBox from "components/App/features/wallPostBox";
import storiesPostBox from "components/App/features/storiesPostBox";

function ShareWorkAlert({ props }) {
  console.log(props);
  const ref = useRef(null);
  const { router, fetchShare } = useContext(MainContext);

  useClickAway(
    ref,
    () => {
      router.toBack();
    },
    ["mousedown"]
  );

  const handleShareWallPost = () => {
    wallPostBox(props.img);
  };

  const handleShareStoriesPost = () => {
    storiesPostBox(props.img);
  };

  return (
    <div
      className={`ArtSelection__notification Notification ${"open"}`}
      ref={ref}
    >
      <div className="ArtSelection__notification-header">
        <span>Поделится работой</span>
        <div
          className="ArtSelection__close smallBtn-text"
          onClick={() => {
            router.toBack();
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
          {props?.inContest?.name && (
            <div
              className="Notification__btn Notification__btn_sendMessage"
              onClick={() => fetchShare(props.inContest ? props.inContest : "")}
            >
              <Icon16MessageOutline width={25} height={25} />
              <span>В сообщении</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShareWorkAlert;
