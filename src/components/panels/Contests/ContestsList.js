import React, { useContext, useEffect, useState } from "react";

import { Panel } from "@vkontakte/vkui";
import ContestItem from "./components/ContestItem";
import profile__emptyImg from "assets/img/profile__emptyImg.svg";

import ContestsControls from "./components/ContestsControls";
import Filters from "components/common/Filters";
import { MainContext, ContestsContext } from "components/shared/providers";

function ContestList({ id }) {
  const { go } = useContext(MainContext);
  const {
    activeContestsFilter,
    setActiveContestsFilter,
    contests,
    activeContest,
    setActiveContest,
  } = useContext(ContestsContext);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    if (contests.length >= 1) {
      let item = contests?.find((item) =>
        activeContestsFilter.includes(item.type)
      );
      setIsEmpty(item?.id ? false : true);
    }
  }, [activeContestsFilter, contests]);

  const filtersData = [
    { id: "workAcceptance", text: "Прием работ" },
    { id: "vote", text: "Голосование" },
    { id: "ended, pre-ended", text: "Закончилось" },
  ];

  useEffect(() => {
    if (activeContest.id) {
      setActiveContest({});
    }
  }, []);

  return (
    <Panel id={id}>
      <div className="Contests">
        <div className="gradient-round"></div>
        <div className="Contests__wrap">
          <ContestsControls />
          <div className="Contests__body">
            <Filters
              data={filtersData}
              currentFilter={activeContestsFilter}
              setCurrentFilter={setActiveContestsFilter}
            />
            <div className="Contests__items">
              {contests?.map((item, index) => {
                if (activeContestsFilter.includes(item.type)) {
                  return <ContestItem data={item} key={index} />;
                }
              })}
            </div>
            {isEmpty && (
              <div className="ProfileArts__item_empty ProfileArts__item">
                <img src={profile__emptyImg} />
                Пока что здесь пусто, <br /> нужно немного подождать 😉
              </div>
            )}
          </div>
        </div>
      </div>
    </Panel>
  );
}

export default ContestList;
