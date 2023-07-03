import React, { useState } from "react";

const ContestFilters = ({
  activeContest,
  contestFilters,
  setContestFilters,
}) => {
  if (
    activeContest.type !== "vote" &&
    activeContest.type !== "workAcceptance"
  ) {
    return null;
  }

  return (
    <div className="Contest__filters">
      <div
        onClick={() => setContestFilters("New")}
        className={`Contest__filter ${contestFilters == "New" && "active"}`}
      >
        Все работы
      </div>

      <div
        onClick={() => setContestFilters("My")}
        className={`Contest__filter ${contestFilters == "My" && "active"}`}
      >
        Мои работы
      </div>
    </div>
  );
};

export default ContestFilters;
