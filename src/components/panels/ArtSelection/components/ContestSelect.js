import React, { useContext, useRef } from "react";
import { useClickAway } from "react-use";

import { MainContext } from "components/shared/providers/";
import checkMark from "assets/img/payEnergy__benefitsImg.svg";

function ContestSelect({ accept, img }) {
  const ref = useRef(null);
  const { router, contests, setActiveContest, addArtToContest } =
    useContext(MainContext);

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
          contests?.map((item, index) => {
            if (item.type == "workAcceptance") {
              console.log(item);
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
                      addArtToContest(item.id, img.art_id);
                      router.toBack();
                      router.toView("contests");
                      router.toPanel("contest");
                      setActiveContest({ ...item, from: "artGenerate" });
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
