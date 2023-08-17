import React, { useContext } from "react";
import { View } from "@vkontakte/vkui";

import "./Contests.css";

import { MainContext } from "components/shared/providers/MainProvider";
import Contest from "components/panels/Contest";
import ContestsHome from "./ContestsHome";
import NewContest from "./components/NewContest";

const Contests = ({ id }) => {
  const { router } = useContext(MainContext);

  return (
    <View id={id} activePanel={router.activePanel}>
      <ContestsHome id="contestsHome" />
      <Contest id="contest" />
      <NewContest id="newContest" />
    </View>
  );
};

export default Contests;
