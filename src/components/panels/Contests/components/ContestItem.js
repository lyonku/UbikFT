import React, { useState, useEffect, useContext } from "react";
import ContestPrizes from "components/panels/Contest/components/ContestPrizes";
import { MainContext, PopoutContext } from "components/shared/providers";

function ContestItem({ data }) {
  const { router, setActiveContest } = useContext(MainContext);
  const { handleInfoPopout } = useContext(PopoutContext);

  const handleEventInfoPopout = (event) => {
    handleInfoPopout();
    event.stopPropagation();
  };

  const navigateToContestPanel = () => {
    router.toPanel("contest");
    setActiveContest(data);
  };

  return (
    <div
      className="ContestsItem"
      style={{
        background: `linear-gradient(180deg, rgba(10, 10, 10, 0) 0%, #0A0A0A 100%), no-repeat center/cover url(${data.img})`,
      }}
      onClick={() => {
        navigateToContestPanel();
      }}
    >
      <div className="ContestsItem__wrap">
        <div className="ContestsItem__header">
          <div
            className="ContestsItem__rules transparentBlock"
            onClick={handleEventInfoPopout}
          >
            Правила
          </div>
        </div>
        <div className="ContestsItem__body">
          <div className="ContestsItem__title title_h3-24px">{data.name}</div>
          <div className="ContestsItem__desc text_gray">{data.desc}</div>
          <ContestPrizes activeContest={data} />
        </div>
      </div>
    </div>
  );
}

export default ContestItem;
