import React, { useState, useContext, useEffect } from "react";
import { Panel } from "@vkontakte/vkui";

import "./Contest.css";

import { MainContext } from "components/shared/providers/MainProvider";

import ContestPrizes from "./components/ContestPrizes";
import ContestControls from "./components/ContestControls";
import ContestItemHeader from "./components/ContestItemHeader";
import ContestWorks from "./components/ContestWorks";
import ContestFilters from "./components/ContestFilters";
import ContestBtn from "./components/ContestBtn";

const Contest = ({ id }) => {
  const [contestFilters, setContestFilters] = useState("New");
  const { router, activeContest, getTimeUntilDate, handleInfoPopout } =
    useContext(MainContext);

  const [time, setTime] = useState("");
  const date = new Date(+activeContest.date);
  var currentDate = new Date();

  var options = {
    month: "long",
    day: "numeric",
    timezone: "UTC",
  };

  useEffect(() => {
    var oneDay = 24 * 60 * 60 * 1000;
    var timeDiff = date.getTime() - currentDate.getTime();

    if (timeDiff < oneDay) {
      setTime(` осталось ${getTimeUntilDate(date)}`);
    } else {
      setTime(` до ${date.toLocaleString("ru", options)}`);
    }
  }, []);

  return (
    <Panel id={id}>
      <div
        className="Contest"
        style={{
          background: `linear-gradient(180deg, rgba(10, 10, 10, 0) 0%, #0A0A0A 50%), url(${
            activeContest.img
          }) center top ${-50}px / contain no-repeat`,
        }}
      >
        <div className="Contest__wrap">
          <ContestControls router={router} />
          <div className="Contest__body">
            <div className="ContestItem__wrap">
              <div className="ContestItem__body">
                <ContestItemHeader activeContest={activeContest} time={time} />
                {/* <ContestBtn activeContest={activeContest} router={router} /> */}
                <ContestPrizes
                  activeContest={activeContest}
                  router={router}
                  time={time}
                />
                <ContestFilters
                  activeContest={activeContest}
                  contestFilters={contestFilters}
                  setContestFilters={setContestFilters}
                />
                <ContestWorks contestFilters={contestFilters} time={time} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
};

export default Contest;
