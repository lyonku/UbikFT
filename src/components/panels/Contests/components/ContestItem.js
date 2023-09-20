import React, { useState, useEffect, useContext } from "react";
import ContestPrizes from "components/panels/Contest/components/ContestPrizes";
import {
  ContestsContext,
  MainContext,
  PopoutContext,
} from "components/shared/providers";
import { useSearchParams } from "@vkontakte/vk-mini-apps-router";

function ContestItem({ data }) {
  const { go } = useContext(MainContext);
  const { setActiveContest } = useContext(ContestsContext);
  const { handleInfoPopout } = useContext(PopoutContext);

  const handleEventInfoPopout = (event) => {
    handleInfoPopout();
    event.stopPropagation();
  };

  const navigateToContestPanel = () => {
    setActiveContest(data);
    go(`contest/${data.id}`);
  };

  return (
    <div
      className="ContestsItem"
      style={{
        background: `linear-gradient(180deg, rgba(10, 10, 10, 0) 0%, #0A0A0A 100%), no-repeat center/cover url(${data.backgroundLink})`,
      }}
      onClick={() => {
        navigateToContestPanel();
      }}
    >
      <div className="ContestsItem__wrap">
        <div className="ContestsItem__header">
          <div
            className="ContestsItem__rules transparentBlock darkBlock"
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
