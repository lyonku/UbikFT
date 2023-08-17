import React, { useContext, useRef, useState, useEffect } from "react";
import EnergySvg from "components/common/svgs/energySvg";
import { useClickAway } from "react-use";

import { MainContext } from "components/shared/providers/MainProvider";
import LikeSvg from "components/common/svgs/LikeSvg";
import HeartSvg from "components/common/svgs/heartSvg";

function PayConfirm() {
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
    <div className={`PayConfirm ${"open"}`} ref={ref}>
      <div className="PayConfirm__header" onClick={() => router.toBack()}></div>
      <div className="PayConfirm__title title_h2-32px">
        Вы добавите <span className="text_accented">53 лайка</span>
      </div>
      <div className="PayConfirm__list">
        <div className="PayConfirm__item">
          <div className="PayConfirm__listMarker"></div>
          <div className="PayConfirm__listTitle">
            Проголосовать можно только за одну работу
          </div>
        </div>
        <div className="PayConfirm__item">
          <div className="PayConfirm__listMarker"></div>
          <div className="PayConfirm__listTitle">Ваш рейтинг</div>
          <div className="PayConfirm__text">
            <HeartSvg width="20px" height="20px" /> 5312 = 53
            <LikeSvg width="20px" height="20px" full={"true"} />
          </div>
        </div>
      </div>
      <div className="PayConfirm__btn">
        <div className="PayConfirm__btn_text">Проголосовать</div>
      </div>
    </div>
  );
}

export default PayConfirm;
