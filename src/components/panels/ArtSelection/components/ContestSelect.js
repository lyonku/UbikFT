import React, { useContext, useRef } from "react";
import { useClickAway } from "react-use";

import { MainContext } from "components/shared/providers/MainProvider";

import background from "assets/img/ContestImg1.png";

function ContestSelect() {
  const ref = useRef(null);
  const { router } = useContext(MainContext);

  useClickAway(
    ref,
    () => {
      router.toBack();
    },
    ["mousedown"]
  );

  return (
    <div className={`ContestSelect ${"open"}`} ref={ref}>
      <div
        className="ContestSelect__header"
        onClick={() => router.toBack()}
      ></div>
      <div className="ContestSelect__title title_h3-24px">Выберите конкурс</div>
      <div className="ContestSelect__items">
        <div
          className="ContestSelectItem"
          style={{ background: `no-repeat center/cover url(${background})` }}
        >
          <div className="ContestSelectItem__title title_h3-24px">
            Дом мечты
          </div>
          <div className="ContestSelectItem__text text_gray">
            Создайте дом мечты и покажите насколько комфортным и удобным он
            может быть.
          </div>
          <div
            className="ContestSelectItem__btn btn"
            onClick={() => {
              router.toBack();
              router.toView("contests");
              router.toPanel("contest");
            }}
          >
            Отправить на конкурс
          </div>
        </div>
        <div
          className="ContestSelectItem"
          style={{ background: `no-repeat center/cover url(${background})` }}
        >
          <div className="ContestSelectItem__title title_h3-24px">
            Дом мечты
          </div>
          <div className="ContestSelectItem__text text_gray">
            Создайте дом мечты и покажите насколько комфортным и удобным он
            может быть.
          </div>
          <div
            className="ContestSelectItem__btn btn"
            onClick={() => {
              router.toBack();
              router.toView("contests");
              router.toPanel("contest");
            }}
          >
            Отправить на конкурс
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContestSelect;
