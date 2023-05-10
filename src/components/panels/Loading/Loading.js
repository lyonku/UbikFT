import React, { useState, useEffect, useContext } from "react";
import "./Loading.css";
import { Panel } from "@vkontakte/vkui";
import "animate.css";
import background from "assets/img/loading__background.png";
import { MainContext } from "components/shared/providers/MainProvider";
import LoadingMain from "./components/LoadingMain";

const Loading = ({ id }) => {
  const { currentImg, error, handleArtGenerate, goToPage } =
    useContext(MainContext);

  useEffect(() => {
    if (currentImg) {
      const img = new Image();
      img.src = currentImg;
      goToPage("main.artSelection");
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
        {error ? (
          <LoadingError handleArtGenerate={handleArtGenerate} />
        ) : (
          <LoadingMain />
        )}
      </div>
    </Panel>
  );
};

export default Loading;
