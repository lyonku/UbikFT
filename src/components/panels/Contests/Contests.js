import React, { useContext, useEffect } from "react";
import { View } from "@vkontakte/vkui";

import "./Contests.css";

import { ContestsContext } from "components/shared/providers";
import { MainContext } from "components/shared/providers/MainProvider";
import Contest from "components/panels/Contest";
import ContestsList from "./ContestsList";
import {
  useActiveVkuiLocation,
  useGetPanelForView,
} from "@vkontakte/vk-mini-apps-router";

const Contests = ({ id }) => {
  const { handleInitContests, updateContest, activeContest } =
    useContext(ContestsContext);
  const activePanel = useGetPanelForView(id);
  const {
    panelsHistory, // Получение данных об истории переходов
  } = useActiveVkuiLocation();
  useEffect(() => {
    if (updateContest) {
      handleInitContests();
    }
  }, [updateContest]);

  return (
    <View
      id={id}
      activePanel={activePanel}
      onSwipeBack={() => routeNavigator.back()}
      history={panelsHistory}
    >
      <ContestsList id="contestsList" />
      <Contest id="contest" />
    </View>
  );
};

export default Contests;
