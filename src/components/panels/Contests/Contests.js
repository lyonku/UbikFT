import React, { useContext, useEffect } from "react";
import { View } from "@vkontakte/vkui";

import "./Contests.css";

import { ContestsContext } from "components/shared/providers";
import { MainContext } from "components/shared/providers/MainProvider";
import Contest from "components/panels/Contest";
import ContestsList from "./ContestsList";
import NewContest from "./components/NewContest";

const Contests = ({ id }) => {
  const { router } = useContext(MainContext);
  const { handleInitContests, updateContest } = useContext(ContestsContext);

  useEffect(() => {
    if (updateContest) {
      handleInitContests();
    }
  }, [updateContest]);

  return (
    <View id={id} activePanel={router.activePanel}>
      <ContestsList id="contestsList" />
      <Contest id="contest" />
      <NewContest id="newContest" />
    </View>
  );
};

export default Contests;
