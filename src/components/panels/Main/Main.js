import React, { useState, useContext, useRef, useEffect } from "react";
import { MainContext } from "components/shared/providers/MainProvider";
import { Panel, View } from "@vkontakte/vkui";
import "./Main.css";

import StyleSelection from "../StyleSelection";
import Loading from "../Loading";
import ArtSelection from "../ArtSelection/ArtSelection";
import {
  useActiveVkuiLocation,
  useGetPanelForView,
  useRouteNavigator,
} from "@vkontakte/vk-mini-apps-router";

const Main = ({ id }) => {
  const {
    panelsHistory, // Получение данных об истории переходов
  } = useActiveVkuiLocation();
  const activePanel = useGetPanelForView(id);
  const routeNavigator = useRouteNavigator();

  return (
    <View
      id={id}
      activePanel={activePanel}
      onSwipeBack={() => routeNavigator.back()}
      history={panelsHistory}
    >
      <StyleSelection id="styleSelection" />
      <Loading id="loading" />
      <ArtSelection id="artSelection" />
    </View>
  );
};

export default Main;
