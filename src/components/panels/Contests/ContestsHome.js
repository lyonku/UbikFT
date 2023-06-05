import React, { useState, useContext } from "react";
import EnergySvg from "components/common/energySvg";

import ContestFilters from "./components/ContestFilters";
import { View, Panel } from "@vkontakte/vkui";
import { MainContext } from "components/shared/providers/MainProvider";
import ContestItem from "./components/ContestItem";

function ContestHome({ id }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const { router, setActiveContest, getTimeUntilDate } =
    useContext(MainContext);

  const handleChangeFilter = (e) => {
    setActiveFilter(e.target.id);
  };

  const contestItems = [
    {
      name: "Дом мечты",
      desc: "Создайте дом мечты и покажите насколько комфортным и удобным он может быть.",
      type: "workAcceptance",
      img: "https://i.ibb.co/SPkzjv2/Contest-Img1.png",
      date: "1687122847000",
    },
    {
      name: "Космогонка",
      desc: "Отправляйся в захватывающее путешествие сквозь бескрайние галактики и создай свой собственный космический мир!",
      type: "vote",
      img: "https://i.ibb.co/0GjRttD/be42d35b-a67c-495f-b042-386d69b6c0b0-0.png",
      date: "1685535513000",
    },
    {
      name: "Средневековый воин",
      desc: "Вступи в ряды средневековых воинов и оживи дух этой эпохи.",
      type: "ended",
      img: "https://i.ibb.co/pR6czHq/e1effeb5-ce93-4712-9be4-139f62bed96d-0.png",
      date: "1673039647000",
    },
  ];

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
              {contestItems.map((item, index) => {
                if (activeFilter == "all" || activeFilter == item.type) {
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
