import React, { useState, useContext, useEffect } from "react";
import { Panel } from "@vkontakte/vkui";

import "./Contest.css";

import { MainContext } from "components/shared/providers/MainProvider";

import ContestWork from "./components/ContestWork";
import ContestPrizes from "./components/ContestPrizes";
import ContestControls from "./components/ContestControls";
import ContestItemHeader from "./components/ContestItemHeader";
import benefitsImg from "assets/img/payEnergy__benefitsImg.svg";
import profile__emptyImg from "assets/img/profile__emptyImg.svg";

const Contest = ({ id }) => {
  const [contestFilters, setContestFilters] = useState("New");
  const [copyPromptAlert, setCopyPromptAlert] = useState(false);
  const {
    router,
    handleSendLikePopout,
    handleShowSharePopout,
    activeContest,
    getTimeUntilDate,
    handleCopyPrompt,
  } = useContext(MainContext);

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
        <div className={`overlay ${router.popout && "open"}`}></div>

        <div className="Contest__wrap">
          <ContestControls router={router} />
          <div className="Contest__body">
            <div className="ContestItem__wrap">
              <div className="ContestItem__body">
                <ContestItemHeader activeContest={activeContest} time={time} />
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
                <ContestPrizes activeContest={activeContest} />

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
                      onClick={() => setContestFilters("My")}
                      className={`Contest__filter ${
                        contestFilters == "My" && "active"
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
                    {activeContest.works.map((data, index) => {
                      if (contestFilters != "My" || data.my) {
                        return (
                          <ContestWork
                            key={index}
                            handleSendLikePopout={handleSendLikePopout}
                            handleShowSharePopout={handleShowSharePopout}
                            handleCopyPrompt={handleCopyPrompt}
                            data={data}
                            activeContest={activeContest}
                          />
                        );
                      }
                    })}
                    {activeContest.works.filter(
                      (data) => contestFilters !== "My" || data.my
                    ).length < 1 && (
                      <div className="ProfileArts__item_empty ProfileArts__item">
                        <img src={profile__emptyImg} />
                        Вы ещё не отправляли <br /> арты на конкурс
                      </div>
                    )}
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
