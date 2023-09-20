import React, { useContext, useRef, useState, useEffect } from "react";
import EnergySvg from "components/common/svgs/energySvg";
import { useClickAway } from "react-use";

import { MainContext } from "components/shared/providers/MainProvider";
import LikeSvg from "components/common/svgs/LikeSvg";
import HeartSvg from "components/common/svgs/heartSvg";
import { ContestsContext } from "components/shared/providers";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

function PayConfirm({ art_id, liked_user_id, isLikeSet, isArtLiked }) {
  const routeNavigator = useRouteNavigator();
  const { userData } = useContext(MainContext);
  const { addLike, handleGetContestWorks } = useContext(ContestsContext);

  let totalLike = Math.floor(userData.rating / 100);
  const plural = require("plural-ru");

  const handleSetLike = () => {
    addLike({ art_id, liked_user_id }).then(() => handleGetContestWorks());
    setTimeout(() => {
      routeNavigator.hidePopout();
    }, 200);
  };

  return (
    <div className={`PayConfirm`}>
      <div className="PayConfirm__title title_h2-32px">
        {isLikeSet && !isArtLiked && (
          <span>
            Вы уже проголосовали. Хотите изменить решение?
            <br />
          </span>
        )}
        {isArtLiked && (
          <div className="PayConfirm__title title_h2-32px">
            <span>
              Вы уже оценили эту работу. <br />
              Хотите убрать лайк?
            </span>
          </div>
        )}
        {!isLikeSet && !isArtLiked && (
          <span>
            Вы добавите{" "}
            <span className="text_accented">
              {plural(totalLike, "%d лайк", "%d лайка", "%d лайков")}
            </span>
          </span>
        )}
      </div>
      {!isArtLiked && (
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
              <HeartSvg width="20px" height="20px" />
              {`${userData.rating} = ${totalLike}`}
              <LikeSvg width="20px" height="20px" full={"true"} />
            </div>
          </div>
        </div>
      )}
      <div className="PayConfirm__btn" onClick={handleSetLike}>
        <div className="PayConfirm__btn_text">
          {isArtLiked ? "Убрать лайк" : "Проголосовать"}{" "}
        </div>
      </div>
    </div>
  );
}

export default PayConfirm;
