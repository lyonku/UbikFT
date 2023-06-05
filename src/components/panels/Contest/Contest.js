import React, { useState, useContext, useEffect } from "react";
import { Panel } from "@vkontakte/vkui";

import "./Contest.css";

import { MainContext } from "components/shared/providers/MainProvider";

import ContestWork from "./components/ContestWork";
import ContestPrizes from "./components/ContestPrizes";
import ContestControls from "./components/ContestControls";
import ContestItemHeader from "./components/ContestItemHeader";
import benefitsImg from "assets/img/payEnergy__benefitsImg.svg";

const Contest = ({ id }) => {
  const [contestFilters, setContestFilters] = useState("New");
  const [copyPromptAlert, setCopyPromptAlert] = useState(false);
  const {
    router,
    handleSendLikePopout,
    handleShowSharePopout,
    handleCopyPrompt,
    activeContest,
    getTimeUntilDate,
  } = useContext(MainContext);

  const handleCopyPromptAlert = (text) => {
    handleCopyPrompt(text);
    setCopyPromptAlert(true);
    setTimeout(() => setCopyPromptAlert(false), 2000);
  };
  const [time, setTime] = useState("");
  const date = new Date(+activeContest.date);
  var currentDate = new Date();

  var options = {
    month: "long",
    day: "numeric",
    timezone: "UTC",
  };

  useEffect(() => {
    var oneDay = 24 * 60 * 60 * 1000; // количество миллисекунд в одном дне
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
        <div className={`overlay ${router.popout && "open"}`}></div>

        <div className="Contest__wrap">
          <ContestControls router={router} />
          <div className="Contest__body">
            <div className="ContestItem__wrap">
              <div className="ContestItem__body">
                <ContestItemHeader activeContest={activeContest} time={time} />
                <ContestPrizes activeContest={activeContest} />
                {activeContest.type == "workAcceptance" && (
                  <div
                    className="Contest__btn btn"
                    onClick={() => {
                      router.toView("main");
                    }}
                  >
                    Принять участие в конкурсе
                  </div>
                )}
                {(activeContest.type == "vote" ||
                  activeContest.type == "workAcceptance") && (
                  <div className="Contest__filters">
                    <div
                      onClick={() => setContestFilters("New")}
                      className={`Contest__filter ${
                        contestFilters == "New" && "active"
                      }`}
                    >
                      Все работы
                    </div>
                    <div
                      onClick={() => setContestFilters("Popular")}
                      className={`Contest__filter ${
                        contestFilters == "Popular" && "active"
                      }`}
                    >
                      Мои работы
                    </div>
                  </div>
                )}

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
                      handleCopyPromptAlert={handleCopyPromptAlert}
                      activeContest={activeContest}
                    />
                    <ContestWork
                      handleSendLikePopout={handleSendLikePopout}
                      handleShowSharePopout={handleShowSharePopout}
                      handleCopyPromptAlert={handleCopyPromptAlert}
                      activeContest={activeContest}
                    />
                    <ContestWork
                      handleSendLikePopout={handleSendLikePopout}
                      handleShowSharePopout={handleShowSharePopout}
                      handleCopyPromptAlert={handleCopyPromptAlert}
                      activeContest={activeContest}
                    />
                  </div>
                </div>
                <div className={`Notification ${copyPromptAlert && "open"}`}>
                  <img src={benefitsImg} />
                  Промт скопирован
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
