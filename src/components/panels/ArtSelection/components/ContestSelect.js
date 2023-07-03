import React, { useContext, useRef, useState } from "react";
import { useClickAway } from "react-use";

import { MainContext } from "components/shared/providers/MainProvider";
import data from "components/panels/Contests/data.json";
import checkMark from "assets/img/payEnergy__benefitsImg.svg";
function ContestSelect({ accept }) {
  const ref = useRef(null);
  const {
    router,
    setActiveContest,
    handleWalletConnectPopout,
    handleContestSelectPopout,
  } = useContext(MainContext);

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
      <div className="ContestSelect__title title_h3-24px">
        {accept == true ? "Арт выставлен на конкурс" : "Выберите конкурс"}
      </div>
      <div className="ContestSelect__items">
        {accept == true ? (
          <div className="WalletConnect__accepted">
            <img src={checkMark} />
          </div>
        ) : (
          data.map((item, index) => {
            if (item.type == "workAcceptance") {
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
                      handleWalletConnectPopout();
                    }}
                  >
                    Отправить на конкурс
                  </div>
                </div>
              );
            }
          })
        )}
      </div>
    </div>
  );
}

export default ContestSelect;
