import React, { useState, useContext } from "react";
import "./ArtSelection.css";

import GeneratedArt from "./components/GeneratedArt";
import ArtSelectionControls from "./components/ArtSelectionControls";

import { MainContext } from "components/shared/providers/MainProvider";

const ArtSelection = () => {
  const { handleArtGenerate, router } = useContext(MainContext);

  return (
    <div className="ArtSelection">
      <div className="gradient-round"></div>
      <div className="ArtSelection__wrap">
        <ArtSelectionControls
          router={router}
          handleArtGenerate={handleArtGenerate}
        />
        <GeneratedArt />
        <div className={`overlay ${router.popout && "open"}`}></div>
      </div>
    </div>
  );
};

export default ArtSelection;
