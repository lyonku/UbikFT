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
import {
  useFirstPageCheck,
  useParams,
  useSearchParams,
} from "@vkontakte/vk-mini-apps-router";

const Contest = ({ id }) => {
  const params = useParams();
  const contest_id = params.contest_id;
  const art_id = params.art_id;
  const { fetchedUser, goBack, goReplace, notify } = useContext(MainContext);
  const { contests, activeContest, handleGetContestWorks, updateContest } =
    useContext(ContestsContext);
  const isFirstPage = useFirstPageCheck();
  const [currentFilter, setCurrentFilter] = useState();

  const filtersData = [
    { id: "New", text: "Все работы" },
    { id: "My", text: "Мои работы" },
  ];

  useEffect(() => {
    if (!contest_id && activeContest.id) {
      isFirstPage ? goReplace("/contests") : goBack();
      return;
    }
    if (contests.length >= 1) {
      let isIdFound = contests.some((item) => item.id == contest_id);
      if (!isIdFound) {
        goReplace("/contests");
        notify({ text: "Конкурса не существует", type: "error" });
        return;
      }
    }
  }, [contests]);

  // useEffect(() => {
  //   if (updateContest && contest_id) {
  //     handleInitContests();
  //   }
  // }, [updateContest]);

  useEffect(() => {
    let mass = window.location.hash.split("/");
    if (
      !activeContest.works &&
      fetchedUser?.id &&
      (!contest_id || activeContest.id)
    ) {
      if (art_id) {
        handleGetContestWorks(null, null, null, art_id);
      } else {
        handleGetContestWorks();
      }
    }
  }, [updateContest, fetchedUser]);

  useInfiniteScroll({
    сurrentPage: activeContest.currentPage ?? 1,
    func: handleGetContestWorks,
    maxPages: activeContest.maxPages,
    className: ".Contest",
  });

  return (
    <Panel id={id}>
      <div
        className="Contest"
        style={{
          background: `linear-gradient(180deg, rgba(10, 10, 10, 0) 0%, #0A0A0A 50%), url(${
            activeContest?.backgroundLink
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
