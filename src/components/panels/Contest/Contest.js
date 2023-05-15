import React, { useState, useContext } from "react";
import { Panel } from "@vkontakte/vkui";

import "./Contest.css";

import { MainContext } from "components/shared/providers/MainProvider";

import contestImg1 from "assets/img/ContestImg1.png";

import ContestWork from "./components/ContestWork";
import ContestPrizes from "./components/ContestPrizes";
import ContestControls from "./components/ContestControls";
import ContestItemHeader from "./components/ContestItemHeader";

const Contest = ({ id }) => {
  const [participation, setParticipation] = useState(false);
  const [contestFilters, setContestFilters] = useState("New");
  const { router, handleSendLikePopout, handleShowSharePopout } =
    useContext(MainContext);

  return (
    <Panel id={id}>
      <div
        className="Contest"
        style={{
          background: `linear-gradient(180deg, rgba(10, 10, 10, 0) 0%, #0A0A0A 50%), url(${contestImg1}) center top ${-50}px / contain no-repeat`,
        }}
      >
        <div className={`overlay ${router.popout && "open"}`}></div>
        <div className="Contest__wrap">
          <ContestControls router={router} />
          <div className="Contest__body">
            <div className="ContestItem__wrap">
              <div className="ContestItem__body">
                <ContestItemHeader />
                <ContestPrizes participation={participation} />
                <div
                  className="Contest__btn btn"
                  onClick={() => setParticipation(true)}
                >
                  Принять участие в конкурсе
                </div>
                <div className="Contest__filters">
                  <div
                    className={`Contest__filter ${
                      contestFilters == "New" && "active"
                    }`}
                  >
                    По новизне
                  </div>
                  <div
                    className={`Contest__filter ${
                      contestFilters == "Popular" && "active"
                    }`}
                  >
                    По популярности
                  </div>
                </div>
                <div className="ContestWorks">
                  <div className="ContestWorks__title title_h3-24px">
                    <span className="title_h3-24px">Работы</span>
                    <span className="ContestWorks__count title_h3-24px">
                      432
                    </span>
                  </div>
                  <div className="ContestWorks__body">
                    <ContestWork
                      handleSendLikePopout={handleSendLikePopout}
                      handleShowSharePopout={handleShowSharePopout}
                      participation={participation}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
};

export default Contest;
