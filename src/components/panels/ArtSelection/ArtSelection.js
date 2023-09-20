import React, { useState, useContext, useEffect } from "react";
import "./ArtSelection.css";

import GeneratedArt from "./components/GeneratedArt";
import ArtSelectionControls from "./components/ArtSelectionControls";
import { GenerateContext, MainContext } from "components/shared/providers";

const ArtSelection = () => {
  const { goReplace } = useContext(MainContext);
  const { currentImg, generation } = useContext(GenerateContext);

  useEffect(() => {
    if (currentImg.length < 1 && !generation) {
      goReplace("/main");
    }
  }, [currentImg]);

  return (
    <div className="ArtSelection">
      <div className="gradient-round"></div>
      <div className="ArtSelection__wrap">
        <ArtSelectionControls />
        <GeneratedArt />
      </div>
    </div>
  );
};

export default ArtSelection;
