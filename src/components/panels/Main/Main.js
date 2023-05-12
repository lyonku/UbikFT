import React, { useState, useContext, useRef, useEffect } from "react";
import { MainContext } from "components/shared/providers/MainProvider";
import { Panel, View } from "@vkontakte/vkui";
import PayEnergy from "components/panels/PayEnergy/PayEnergy";

import "./Main.css";

import Home from "../Home";
import Inquiry from "../Inquiry";
import StyleSelection from "../StyleSelection";
import Loading from "../Loading";
import ArtSelection from "../ArtSelection/ArtSelection";

const Main = ({ id, activePanel }) => {
  const { router } = useContext(MainContext);

  return (
    <View id={id} activePanel={router.activePanel}>
      <Home id="home" />
      <Inquiry id="inquiry" />
      <StyleSelection id="styleSelection" />
      <Loading id="loading" />
      <ArtSelection id={"artSelection"} />
    </View>
  );
};

export default Main;
