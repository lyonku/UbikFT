import React, { useState, useContext } from "react";
import "./ArtSelection.css";
import { PopoutWrapper } from "@vkontakte/vkui";

import GeneratedArt from "./components/GeneratedArt";
import ArtSelectionControls from "./components/ArtSelectionControls";

import ShareWorkAlert from "components/common/ShareWorkAlert";

import { MainContext } from "components/shared/providers/MainProvider";

const ArtSelection = () => {
  const {
    currentImg,
    handleArtGenerate,
    router,
    handleClearPrompt,
    handleContestSelectPopout,
  } = useContext(MainContext);

  const handleShowSharePopout = () => {
    router.toPopout(
      <PopoutWrapper alignY="center" alignX="center">
        <ShareWorkAlert img={currentImg} />
      </PopoutWrapper>
    );
  };

  return (
    <div className="ArtSelection">
      <div className="gradient-round"></div>
      <div className="ArtSelection__wrap">
        <ArtSelectionControls
          router={router}
          handleClearPrompt={handleClearPrompt}
          handleArtGenerate={handleArtGenerate}
        />
        <GeneratedArt
          currentImg={currentImg}
          router={router}
          handleShowSharePopout={handleShowSharePopout}
          handleContestSelectPopout={handleContestSelectPopout}
        />

        <div className={`overlay ${router.popout && "open"}`}></div>
      </div>
    </div>
  );
};

export default ArtSelection;
