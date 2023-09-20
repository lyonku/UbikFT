import React, { useState, useEffect, useContext } from "react";
import "./Loading.css";
import { Panel } from "@vkontakte/vkui";
import "animate.css";
import background from "assets/img/loading__background.png";
import { MainContext } from "components/shared/providers/MainProvider";
import LoadingMain from "./components/LoadingMain";
import LoadingError from "./components/LoadingError";
import { GenerateContext, PopoutContext } from "components/shared/providers";

const Loading = ({ id }) => {
  const { goReplace, goBack } = useContext(MainContext);
  const { currentImg, generationError, generation } =
    useContext(GenerateContext);
  const { handleSetArtCountPopout } = useContext(PopoutContext);

  useEffect(() => {
    if (currentImg.length >= 1 && generation && !generationError) {
      goReplace("/artSelection");
    } else {
      if (!generation) {
        goReplace("/main");
      }
    }
  }, [currentImg]);

  return (
    <Panel id={id}>
      <div
        className="Loading"
        style={{
          background: `linear-gradient(180deg, rgba(0, 0, 0, 0) -19.13%, #000000 100%), no-repeat center/cover url(${background})`,
        }}
      >
        <div className="Loading__background_blackoutdown"></div>
        <div className="Loading__background_blackoutup"></div>
        <div className="Loading__background_glow"></div>
        {generationError ? (
          <LoadingError
            handleSetArtCountPopout={handleSetArtCountPopout}
            goReplace={goReplace}
            goBack={goBack}
          />
        ) : (
          <LoadingMain />
        )}
      </div>
    </Panel>
  );
};

export default Loading;
