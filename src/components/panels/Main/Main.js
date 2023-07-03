import React, { useState, useContext, useRef, useEffect } from "react";
import { MainContext } from "components/shared/providers/MainProvider";
import { Panel, View } from "@vkontakte/vkui";
import "./Main.css";

import StyleSelection from "../StyleSelection";
import Loading from "../Loading";
import ArtSelection from "../ArtSelection/ArtSelection";

const Main = ({ id }) => {
  const { router } = useContext(MainContext);

  return (
    <View id={id} activePanel={router.activePanel}>
      <StyleSelection id="styleSelection" />
      <Loading id="loading" />
      <ArtSelection id="artSelection" />
    </View>
  );
};

export default Main;
