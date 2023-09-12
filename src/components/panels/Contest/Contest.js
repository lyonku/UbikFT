import React, { useState, useContext, useEffect } from "react";
import { Panel } from "@vkontakte/vkui";

import "./Contest.css";

import useInfiniteScroll from "components/shared/hooks/useInfiniteScroll";
import { ContestsContext, MainContext } from "components/shared/providers";

import ContestPrizes from "./components/ContestPrizes";
import ContestControls from "./components/ContestControls";
import ContestItem__header from "./components/ContestItem__header";
import ContestWorks from "./components/ContestWorks";
import Filters from "components/common/Filters";

const Contest = ({ id }) => {
  const { router, fetchedUser } = useContext(MainContext);
  const {
    handleInitContests,
    activeContest,
    handleGetContestArts,
    updateContest,
  } = useContext(ContestsContext);

  const [currentFilter, setCurrentFilter] = useState();

  const filtersData = [
    { id: "New", text: "Все работы" },
    { id: "My", text: "Мои работы" },
  ];

  useEffect(() => {
    if (updateContest) {
      handleInitContests();
    }
  }, [updateContest]);

  useEffect(() => {
    let mass = window.location.hash.split("/");
    if (!activeContest.works && fetchedUser?.id) {
      console.log(fetchedUser?.id);

      handleGetContestArts(null, null, null, mass.at(-1));
    }
  }, [updateContest, fetchedUser]);

  useInfiniteScroll({
    сurrentPage: activeContest.currentPage ?? 1,
    func: handleGetContestArts,
    maxPages: activeContest.maxPages,
    className: ".Contest",
  });

  return (
    <Panel id={id}>
      <div className={`overlay ${router.popout && "open"}`}></div>
      <div
        className="Contest"
        style={{
          background: `linear-gradient(180deg, rgba(10, 10, 10, 0) 0%, #0A0A0A 50%), url(${
            activeContest?.img
          }) center top ${-50}px / contain no-repeat`,
        }}
      >
        <div className="Contest__wrap">
          <ContestControls />
          <div className="Contest__body">
            <div className="ContestItem__wrap">
              <div className="ContestItem__body">
                <ContestItem__header activeContest={activeContest} />
                <ContestPrizes activeContest={activeContest} />
                {activeContest?.type !== "ended" && (
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
      </div>
    </Panel>
  );
};

export default Contest;
