import React, { useContext } from "react";
import "./Home.css";
import { Panel } from "@vkontakte/vkui";
import backgroundAnything from "assets/img/home__anything_background.png";
import backgroundVintedois from "assets/img/home__vintedois_background.png";
import HomeBody from "./components/HomeBody";

import { MainContext } from "components/shared/providers/MainProvider";

const Home = ({ id }) => {
  const { currentModel, setCurrentModel, inputValue, router } =
    useContext(MainContext);

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
    router.toPanel("inquiry");
    if (inputValue.length >= 1) {
      router.toPanel("styleSelection");
    }
  };

  return (
    <Panel id={id}>
      <div
        className="home"
        style={{
          background: `linear-gradient(180deg, rgba(0, 0, 0, 0) -19.13%, #000000 100%), no-repeat center/cover url(${
            currentModel == "Rev Anim"
              ? backgroundVintedois
              : backgroundAnything
          })`,
        }}
      >
        <div className="gradient-round"></div>
        <HomeBody
          currentModel={currentModel}
          handleModel={handleModel}
          go={goTo}
        />
      </div>
    </Panel>
  );
};

export default Home;
