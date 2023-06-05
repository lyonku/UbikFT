import React, { useState, useContext } from "react";
import { View, Panel } from "@vkontakte/vkui";

import "./Contests.css";

import { MainContext } from "components/shared/providers/MainProvider";
import Contest from "components/panels/Contest";
import ContestsHome from "./ContestsHome";

const Contests = ({ id }) => {
  const { router } = useContext(MainContext);

  return (
    <View id={id} activePanel={router.activePanel}>
      <ContestsHome id="contestsHome" />
      <Contest id="contest" />
    </View>
  );
};

export default Contests;
