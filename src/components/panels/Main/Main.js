import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import "./Main.css";
import { Panel } from "@vkontakte/vkui";

import Artists from "components/panels/Artists";
import Gallery from "components/panels/Gallery";
import Profile from "components/panels/Profile";
import StyleSelection from "components/panels/StyleSelection";

import MainNavFooter from "./components/MainNavFooter";

const Main = ({
  id,
  go,
  inputValue,
  setCurrentNavItem,
  currentNavItem,
  fetchedUser,
  handleArtGenerate,
  chosenStyles,
  setChosenStyles,
  goBack,
  history,
}) => {
  return (
    <Panel id={id}>
      <div className="mainNav">
        <div className="gradient-round"></div>
        <div className="mainNav__body">
          {currentNavItem == "StyleSelection" ? (
            <StyleSelection
              inputValue={inputValue}
              go={go}
              handleArtGenerate={handleArtGenerate}
              chosenStyles={chosenStyles}
              setChosenStyles={setChosenStyles}
              goBack={goBack}
              history={history}
            />
          ) : currentNavItem == "Gallery" ? (
            <Gallery go={go} />
          ) : (
            // ) : currentNavItem == "Artists" ? (
            // <Artists go={go} />
            <Profile go={go} fetchedUser={fetchedUser} />
          )}
        </div>
        <MainNavFooter
          currentNavItem={currentNavItem}
          setCurrentNavItem={setCurrentNavItem}
        />
      </div>
    </Panel>
  );
};

export default Main;
