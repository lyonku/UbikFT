import React, { useState, useContext, useEffect } from "react";
import { Panel } from "@vkontakte/vkui";

import "./Contest.css";

import useInfiniteScroll from "components/shared/hooks/useInfiniteScroll";
import { MainContext } from "components/shared/providers";
import benefitsImg from "assets/img/payEnergy__benefitsImg.svg";

import ContestPrizes from "./components/ContestPrizes";
import ContestControls from "./components/ContestControls";
import ContestItem__header from "./components/ContestItem__header";
import ContestWorks from "./components/ContestWorks";
import Filters from "components/common/Filters";

const Contest = ({ id }) => {
  const {
    router,
    activeContest,
    updateContestTime,
    userData,
    handleGetContestArts,
  } = useContext(MainContext);
  const [artAdded, setArtAdded] = useState(false);
  const [time, setTime] = useState("");
  const [currentFilter, setCurrentFilter] = useState();

  const filtersData = [
    { id: "New", text: "Все работы" },
    { id: "My", text: "Мои работы" },
  ];

  useEffect(() => {
    handleGetContestArts(activeContest.id);
  }, []);

  useInfiniteScroll({
    сurrentPage: 1,
    func: handleGetContestArts,
    maxPages: activeContest.maxPages,
    className: ".Contest",
  });

  useEffect(() => {
    setTime(updateContestTime(+activeContest[activeContest.type + "Date"]));

    const intervalId = setInterval(() => {
      setTime(updateContestTime(+activeContest[activeContest.type + "Date"]));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (activeContest.from == "artGenerate") {
      setArtAdded(true);
      setTimeout(() => setArtAdded(false), 2000);
      setCurrentFilter("My");
    }
  }, []);

  return (
    <Panel id={id}>
      <div className={`overlay ${router.popout && "open"}`}></div>
      <div
        className="Contest"
        style={{
          background: `linear-gradient(180deg, rgba(10, 10, 10, 0) 0%, #0A0A0A 50%), url(${
            activeContest.img
          }) center top ${-50}px / contain no-repeat`,
        }}
      >
        <div className="Contest__wrap">
          <ContestControls router={router} userData={userData} />
          <div className="Contest__body">
            <div className="ContestItem__wrap">
              <div className="ContestItem__body">
                <ContestItem__header
                  activeContest={activeContest}
                  time={time}
                />
                <ContestPrizes
                  activeContest={activeContest}
                  router={router}
                  time={time}
                />
                {activeContest.type !== "ended" && (
                  <Filters
                    data={filtersData}
                    currentFilter={currentFilter}
                    setCurrentFilter={setCurrentFilter}
                  />
                )}
                <ContestWorks currentFilter={currentFilter} />
              </div>
            </div>
          </div>
        </div>
        <div className={`Notification ${artAdded && "open"}`}>
          <img src={benefitsImg} />
          Арт выставлен на конкурс
        </div>
      </div>
    </Panel>
  );
};

export default Contest;
