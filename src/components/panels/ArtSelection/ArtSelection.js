import React, { useState, useContext } from "react";
import "./ArtSelection.css";

import GeneratedArt from "./components/GeneratedArt";
import ArtSelectionControls from "./components/ArtSelectionControls";

import ShareWorkAlert from "components/common/ShareWorkAlert";

import wallPostBox from "components/App/features/wallPostBox";
import storiesPostBox from "components/App/features/storiesPostBox";

import { MainContext } from "components/shared/providers/MainProvider";

const ArtSelection = ({ id }) => {
  const { currentImg, goBack, handleArtGenerate, goToPage, handleClearPrompt } =
    useContext(MainContext);
  const [showShareAlert, setShowShareAlert] = useState(false);

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
        <ArtSelectionControls
          go={goToPage}
          goBack={goBack}
          handleClearPrompt={handleClearPrompt}
        />
        <GeneratedArt
          currentImg={currentImg}
          go={goToPage}
          setShowShareAlert={setShowShareAlert}
          handleArtGenerate={handleArtGenerate}
          goBack={goBack}
        />
        <ShareWorkAlert
          showShareAlert={showShareAlert}
          setShowShareAlert={setShowShareAlert}
          handleShareWallPost={handleShareWallPost}
          handleShareStoriesPost={handleShareStoriesPost}
        />
        <div className={`overlay ${showShareAlert && "open"}`}></div>
      </div>
    </div>
  );
};

export default ArtSelection;
