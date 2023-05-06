import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Home.css";
import { Panel } from "@vkontakte/vkui";
import backgroundProtogen from "assets/img/home__protogen_background.png";
import backgroundAnything from "assets/img/home__anything_background.png";
import backgroundVintedois from "assets/img/home__vintedois_background.png";
import HomeBody from "./components/HomeBody";
import MainNavFooter from "components/panels/Main/components/MainNavFooter";

const Home = ({
  id,
  go,
  currentModel,
  setCurrentModel,
  inputValue,
  setCurrentNavItem,
  currentNavItem,
}) => {
  const handleModel = (event) => {
    if (event.target.id) {
      setCurrentModel(event.target.id);
    } else {
      if (event.target.children[0]) {
        setCurrentModel(event.target.children[0]?.id);
        event.target.children[0].checked = true;
      }
    }
  };

  const goTo = () => {
    go("inquiry");
    if (inputValue.length >= 1) {
      go("main");
    }
  };

  return (
    <Panel id={id}>
      <div
        className="home"
        style={{
          background: `linear-gradient(180deg, rgba(0, 0, 0, 0) -19.13%, #000000 100%), no-repeat center/cover url(${
            currentModel == "Protogen"
              ? backgroundProtogen
              : currentModel == "Anything"
              ? backgroundAnything
              : backgroundVintedois
          })`,
        }}
      >
        <div className="gradient-round"></div>
        <HomeBody
          currentModel={currentModel}
          handleModel={handleModel}
          go={goTo}
        />
        <MainNavFooter
          currentNavItem={currentNavItem}
          setCurrentNavItem={setCurrentNavItem}
          go={go}
          id={id}
        />
      </div>
    </Panel>
  );
};

export default Home;
