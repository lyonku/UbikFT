import React, { useState, useContext } from "react";
import "./ArtSelection.css";
import { PopoutWrapper } from "@vkontakte/vkui";

import GeneratedArt from "./components/GeneratedArt";
import ArtSelectionControls from "./components/ArtSelectionControls";

import ShareWorkAlert from "components/common/ShareWorkAlert";

import wallPostBox from "components/App/features/wallPostBox";
import storiesPostBox from "components/App/features/storiesPostBox";

import { MainContext } from "components/shared/providers/MainProvider";

const ArtSelection = () => {
  const { currentImg, handleArtGenerate, router, handleClearPrompt } =
    useContext(MainContext);

  const handleShowSharePopout = () => {
    router.toPopout(
      <PopoutWrapper alignY="center" alignX="center">
        <ShareWorkAlert
          handleShareWallPost={handleShareWallPost}
          handleShareStoriesPost={handleShareStoriesPost}
        />
      </PopoutWrapper>
    );
  };

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
          router={router}
          handleClearPrompt={handleClearPrompt}
        />
        <GeneratedArt
          currentImg={currentImg}
          router={router}
          handleArtGenerate={handleArtGenerate}
          handleShowSharePopout={handleShowSharePopout}
        />

        <div className={`overlay ${router.popout && "open"}`}></div>
      </div>
    </div>
  );
};

export default ArtSelection;
