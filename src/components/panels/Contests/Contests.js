import React, { useState, useContext } from "react";
import { View, Panel } from "@vkontakte/vkui";

import "./Contests.css";

import { MainContext } from "components/shared/providers/MainProvider";
import EnergySvg from "components/common/energySvg";

import contestImg1 from "assets/img/ContestImg1.png";
import OzonLogo from "assets/img/OzonLogo.svg";
import Contest from "../Contest/Contest";

const Contests = ({ id }) => {
  const { router } = useContext(MainContext);

  const [activeFilter, setActiveFilter] = useState("all");

  const handleChangeFilter = (e) => {
    setActiveFilter(e.target.id);
  };

  return (
    <View id={id} activePanel={router.activePanel}>
      <Panel id="contests">
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
              <div className="Contests__filters">
                <div
                  className={`Contests__filter ${
                    activeFilter == "all" && "Contests__filter_active"
                  }`}
                  id="all"
                  onClick={handleChangeFilter}
                >
                  Все
                </div>
                <div
                  className={`Contests__filter ${
                    activeFilter == "workAcceptance" &&
                    "Contests__filter_active"
                  }`}
                  id="workAcceptance"
                  onClick={handleChangeFilter}
                >
                  Прием работ
                </div>
                <div
                  className={`Contests__filter ${
                    activeFilter == "vote" && "Contests__filter_active"
                  }`}
                  id="vote"
                  onClick={handleChangeFilter}
                >
                  Голосование
                </div>
                <div
                  className={`Contests__filter ${
                    activeFilter == "ended" && "Contests__filter_active"
                  }`}
                  id="ended"
                  onClick={handleChangeFilter}
                >
                  Закончились
                </div>
              </div>
              <div className="Contests__items">
                <div
                  className="ContestsItem"
                  style={{
                    background: `no-repeat center/cover url(${contestImg1})`,
                  }}
                  onClick={() => router.toPanel("contest")}
                >
                  <div className="ContestsItem__wrap">
                    <div className="ContestsItem__header">
                      <div className="ContestsItem__date transparentBlock">
                        Прием работ{" "}
                        <span className="text_accented"> до 31 мая</span>
                      </div>
                    </div>

                    <div className="ContestsItem__body">
                      <div className="ContestsItem__title title_h3-24px">
                        Дом мечты
                      </div>
                      <div className="ContestsItem__desc text_gray">
                        Создайте дом мечты и покажите насколько комфортным и
                        удобным он может быть.
                      </div>
                      <div className="ContestsItemPrize roundedBlock_greenBroder">
                        <div className="ContestsItemPrize__logo">
                          <img src={OzonLogo} />
                        </div>
                        <div className="ContestsItemPrize__title title_h4-18px">
                          Приз{" "}
                          <span className="text_accented"> за 1 место</span>
                          <br />
                          сертификат{" "}
                          <span className="text_accented">100000₽</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="ContestsItem"
                  style={{
                    background: `no-repeat center/cover url(${contestImg1})`,
                  }}
                  onClick={() => router.toPanel("contest")}
                >
                  <div className="ContestsItem__wrap">
                    <div className="ContestsItem__header">
                      <div className="ContestsItem__date transparentBlock">
                        Прием работ{" "}
                        <span className="text_accented"> осталось 23:15</span>
                      </div>
                    </div>

                    <div className="ContestsItem__body">
                      <div className="ContestsItem__title title_h3-24px">
                        Дом мечты
                      </div>
                      <div className="ContestsItem__desc text_gray">
                        Создайте дом мечты и покажите насколько комфортным и
                        удобным он может быть.
                      </div>
                      <div className="ContestsItemPrize roundedBlock_greenBroder">
                        <div className="ContestsItemPrize__logo">
                          <img src={OzonLogo} />
                        </div>
                        <div className="ContestsItemPrize__title title_h4-18px">
                          Приз{" "}
                          <span className="text_accented"> за 1 место</span>
                          <br />
                          сертификат{" "}
                          <span className="text_accented">100000₽</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Panel>
      <Contest id={"contest"} />
    </View>
  );
};

export default Contests;
