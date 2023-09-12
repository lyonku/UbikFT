import React, { useContext, useRef } from "react";
import { useClickAway } from "react-use";

import {
  ContestsContext,
  MainContext,
  PopoutContext,
} from "components/shared/providers/";

function ContestSelect({ art_id }) {
  const ref = useRef(null);
  const { router, handleGetArts } = useContext(MainContext);
  const { contests, setActiveContest, handleGetContestArts, addArtToContest } =
    useContext(ContestsContext);

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
      <div className="ContestSelect__items">
        {contests?.map((item, index) => {
          if (item?.type == "workAcceptance") {
            return (
              <div
                key={index}
                className="ContestSelectItem"
                style={{
                  background: `no-repeat center/cover url(${item.img})`,
                }}
              >
                <div className="ContestSelectItem__title title_h3-24px">
                  {item.name}
                </div>
                <div className="ContestSelectItem__text text_gray">
                  {item.desc}
                </div>
                <div
                  className="ContestSelectItem__btn btn"
                  onClick={() => {
                    addArtToContest(item.id, art_id).then(() => {
                      router.toBack();
                      router.toView("contests");
                      router.toPanel("contest");

                      setActiveContest(item);
                      handleGetArts();
                      handleGetContestArts(null, item.id, item);
                    });
                  }}
                >
                  Отправить на конкурс
                </div>
              </div>
            );
          }
        })}
        {!contests?.find((item) => item.type == "workAcceptance") && (
          <div className="ContestSelectItem">
            <div className="ContestSelectItem__title title_h3-24px">
              Пустовато
            </div>
            <div className="ContestSelectItem__text text_gray">
              Скоро будут новые конкурсы
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContestSelect;
