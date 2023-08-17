import React, { useState, useContext } from "react";
import "./ArtSelection.css";

import GeneratedArt from "./components/GeneratedArt";
import ArtSelectionControls from "./components/ArtSelectionControls";
import { MainContext, PopoutContext } from "components/shared/providers";

const ArtSelection = () => {
  const { router, userData } = useContext(MainContext);
  const { handleSetArtCountPopout } = useContext(PopoutContext);

  return (
    <div className="ArtSelection">
      <div className="gradient-round"></div>
      <div className="ArtSelection__wrap">
        <ArtSelectionControls
          router={router}
          userData={userData}
          handleSetArtCountPopout={handleSetArtCountPopout}
        />
        <GeneratedArt />
        <div className={`overlay ${router.popout && "open"}`}></div>
      </div>
    </div>
  );
};

export default ArtSelection;
