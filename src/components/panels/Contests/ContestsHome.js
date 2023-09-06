import React, { useContext, useEffect, useState } from "react";

import { Panel } from "@vkontakte/vkui";
import { MainContext } from "components/shared/providers/MainProvider";
import ContestItem from "./components/ContestItem";
import profile__emptyImg from "assets/img/profile__emptyImg.svg";

import ContestsControls from "./components/ContestsControls";
import Filters from "components/common/Filters";

function ContestHome({ id }) {
  const { router, activeFilter, setActiveFilter, userData, contests } =
    useContext(MainContext);
  const [isEmpty, setIsEmpty] = useState(true);

  const handleChangeFilter = (e) => {
    setActiveFilter(e.target.id);
  };

  useEffect(() => {
    let item = contests?.find((item) => activeFilter.includes(item.type));
    setIsEmpty(item?.id ? false : true);
  }, [activeFilter, contests]);

  const filtersData = [
    { id: "workAcceptance", text: "Прием работ" },
    { id: "vote", text: "Голосование" },
    { id: "ended, pre-ended", text: "Закончилось" },
  ];

  return (
    <Panel id={id}>
      <div className="Contests">
        <div className="gradient-round"></div>
        <div className={`overlay ${router.popout && "open"}`}></div>
        <div className="Contests__wrap">
          <ContestsControls router={router} userData={userData} />

          <div className="Contests__body">
            <Filters
              data={filtersData}
              currentFilter={activeFilter}
              setCurrentFilter={setActiveFilter}
            />
            <div className="Contests__items">
              {contests?.map((item, index) => {
                if (activeFilter.includes(item.type)) {
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

export default ContestHome;
