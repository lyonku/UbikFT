import React, { useContext, useRef, useState, useEffect } from "react";
import EnergySvg from "components/common/svgs/energySvg";
import { useClickAway } from "react-use";

import { MainContext } from "components/shared/providers/MainProvider";
import LikeSvg from "components/common/svgs/LikeSvg";
import HeartSvg from "components/common/svgs/heartSvg";
import { ContestsContext } from "components/shared/providers";

function PayConfirm({ art_id, vk_user_id }) {
  const ref = useRef(null);
  const { router, userData } = useContext(MainContext);
  const { addLike, handleGetContestArts } = useContext(ContestsContext);
  useClickAway(
    ref,
    () => {
      router.toBack();
    },
    ["mousedown"]
  );

  let totalLike = Math.floor(userData.rating / 100);
  const plural = require("plural-ru");

  return (
    <div className={`PayConfirm ${"open"}`} ref={ref}>
      <div className="PayConfirm__header" onClick={() => router.toBack()}></div>
      <div className="PayConfirm__title title_h2-32px">
        Вы добавите{" "}
        <span className="text_accented">
          {plural(totalLike, "%d лайк", "%d лайка", "%d лайков")}
        </span>
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
            <HeartSvg width="20px" height="20px" />{" "}
            {`${userData.rating} = ${totalLike}`}
            <LikeSvg width="20px" height="20px" full={"true"} />
          </div>
        </div>
      </div>
      <div
        className="PayConfirm__btn"
        onClick={() => {
          addLike({ art_id, vk_user_id }).then(() => handleGetContestArts());
          router.toBack();
        }}
      >
        <div className="PayConfirm__btn_text">Проголосовать</div>
      </div>
    </div>
  );
}

export default PayConfirm;
