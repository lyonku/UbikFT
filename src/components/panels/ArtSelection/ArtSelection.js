import React, { useState, useEffect } from "react";
import "./ArtSelection.css";
import GeneratedArt from "./components/GeneratedArt";

import closeBtn from "assets/img/close-btn.svg";

import EnergySvg from "components/common/energySvg";
import SaveWorkAlert from "./components/SaveWorkAlert";
import ShareWorkAlert from "components/common/ShareWorkAlert";
import wallPostBox from "components/App/features/wallPostBox";
import storiesPostBox from "components/App/features/storiesPostBox";

const ArtSelection = ({
  id,
  go,
  currentImg,
  goBack,
  setAlertClose,
  showNotificationDelete,
  setShowNotificationDelete,
  alertClose,
}) => {
  const [showShareAlert, setShowShareAlert] = useState(false);

  useEffect(() => {
    setAlertClose();
  }, []);

  const handleShareWallPost = () => {
    wallPostBox(currentImg);
  };

  const handleShareStoriesPost = () => {
    storiesPostBox(currentImg);
  };

  return (
    <div className="ArtSelection">
      <div className="gradient-round"></div>
      <div className="ArtSelection__wrap">
        <div className={`ArtSelection__controls twoBlocks`}>
          <div
            className="ArtSelection__close smallBtn-text"
            onClick={() => {
              setShowNotificationDelete(true);
            }}
          >
            <img src={closeBtn} />
          </div>
          <div
            className="ArtSelection__energy smallBtn-text"
            onClick={() => go("payEnergy")}
          >
            <EnergySvg width={"20px"} height={"20px"} />
            12345
          </div>
        </div>
        <GeneratedArt
          currentImg={currentImg}
          go={go}
          setShowShareAlert={setShowShareAlert}
        />
        <div
          className={`overlay ${
            (showNotificationDelete || showShareAlert) && "open"
          }`}
        ></div>
        <SaveWorkAlert
          goBack={goBack}
          setAlertClose={setAlertClose}
          showNotificationDelete={showNotificationDelete}
          setShowNotificationDelete={setShowNotificationDelete}
          alertClose={alertClose}
        />
        <ShareWorkAlert
          showShareAlert={showShareAlert}
          setShowShareAlert={setShowShareAlert}
          handleShareWallPost={handleShareWallPost}
          handleShareStoriesPost={handleShareStoriesPost}
        />
      </div>
    </div>
  );
};

export default ArtSelection;
