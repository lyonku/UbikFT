import React, { useContext, useEffect, useRef, useState } from "react";
import addToHistory from "assets/img/addToHistory.svg";
import addToWall from "assets/img/addToWall.svg";
import { ContestsContext, MainContext } from "components/shared/providers";
import { Icon16MessageOutline } from "@vkontakte/icons";
import { Spinner } from "@vkontakte/vkui";

function ShareWorkAlert({ art }) {
  const { fetchShare, sendImgToVK, shareArtLoading, setShareArtLoading } =
    useContext(MainContext);

  const [typeOfShare, setTypeOfShare] = useState("");

  useEffect(() => {
    setShareArtLoading(false);
  }, []);

  const handleShareWallPost = () => {
    if (!shareArtLoading) {
      setTypeOfShare("wall");
      sendImgToVK({ art: art, type: "wall" });
    }
  };

  const handleShareStoriesPost = () => {
    if (!shareArtLoading) {
      setTypeOfShare("stories");
      sendImgToVK({ art: art, type: "stories" });
    }
  };

  const handleShareMessage = () => {
    if (!shareArtLoading) {
      fetchShare(art?.contest_id, art?.art_id);
    }
  };

  return (
    <div className="ArtSelection__notification-btns">
      <div className="ArtSelection__notification-btns_header">
        <div
          className="Notification__btn Notification__btn_addHistory"
          onClick={handleShareStoriesPost}
        >
          {shareArtLoading && typeOfShare === "stories" ? (
            <div className="Notification__spinner">
              <Spinner size="regular" />
            </div>
          ) : (
            <img src={addToHistory} />
          )}
          <span>В историю</span>
        </div>
        <div
          className="Notification__btn Notification__btn_addWall"
          onClick={handleShareWallPost}
        >
          {shareArtLoading && typeOfShare === "wall" ? (
            <div className="Notification__spinner">
              <Spinner size="regular" />
            </div>
          ) : (
            <img src={addToWall} />
          )}
          <span>На стену</span>
        </div>
        {art?.contest_id && (
          <div
            className="Notification__btn Notification__btn_sendMessage"
            onClick={handleShareMessage}
          >
            <Icon16MessageOutline width={25} height={25} />
            <span>В сообщении</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShareWorkAlert;
