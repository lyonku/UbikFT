import React, { useState, useContext } from "react";
import EnergySvg from "components/common/energySvg";

import ContestFilters from "./components/ContestFilters";
import { View, Panel } from "@vkontakte/vkui";
import { MainContext } from "components/shared/providers/MainProvider";
import ContestItem from "./components/ContestItem";
import data from "./data.json";

function ContestHome({ id }) {
  const [activeFilter, setActiveFilter] = useState("workAcceptance");
  const { router, setActiveContest, getTimeUntilDate } =
    useContext(MainContext);

  const handleChangeFilter = (e) => {
    setActiveFilter(e.target.id);
  };

  return (
    <Panel id={id}>
      <div className="Contests">
        <div className="gradient-round"></div>
        <div className="Contests__wrap">
          <div className="Contests__controls Header__controls">
            <span className="Contests__title title_h2-32px">Конкурсы</span>
            <div
              className="Contests__energy transparentBlock_blur"
              onClick={() => router.toView("payEnergy")}
            >
              <EnergySvg width={"20px"} height={"20px"} />
              100
            </div>
          </div>
          <div className="Contests__body">
            <ContestFilters
              activeFilter={activeFilter}
              handleChangeFilter={handleChangeFilter}
            />
            <div className="Contests__items">
              {data.map((item, index) => {
                if (activeFilter == item.type) {
                  return (
                    <ContestItem
                      data={item}
                      router={router}
                      key={index}
                      setActiveContest={setActiveContest}
                      getTimeUntilDate={getTimeUntilDate}
                    />
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}

export default ContestHome;
