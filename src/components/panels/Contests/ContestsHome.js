import React, { useContext } from "react";

import ContestsFilters from "./components/ContestsFilters";
import { Panel } from "@vkontakte/vkui";
import { MainContext } from "components/shared/providers/MainProvider";
import ContestItem from "./components/ContestItem";

import ContestsControls from "./components/ContestsControls";

function ContestHome({ id }) {
  const { router, activeFilter, setActiveFilter, userData, contests } =
    useContext(MainContext);

  const handleChangeFilter = (e) => {
    setActiveFilter(e.target.id);
  };

  return (
    <Panel id={id}>
      <div className="Contests">
        <div className="gradient-round"></div>
        <div className={`overlay ${router.popout && "open"}`}></div>
        <div className="Contests__wrap">
          <ContestsControls router={router} userData={userData} />
          <div
            className="Contests__add btn"
            onClick={() => router.toPanel("newContest")}
          >
            Добавить
          </div>
          <div className="Contests__body">
            <ContestsFilters
              activeFilter={activeFilter}
              handleChangeFilter={handleChangeFilter}
            />
            <div className="Contests__items">
              {contests?.map((item, index) => {
                if (activeFilter == item.type) {
                  return <ContestItem data={item} key={index} />;
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
