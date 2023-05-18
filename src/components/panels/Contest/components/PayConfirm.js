import React, { useContext, useRef, useState, useEffect } from "react";
import EnergySvg from "components/common/energySvg";
import { useClickAway } from "react-use";

import { MainContext } from "components/shared/providers/MainProvider";
import LikeSvg from "components/common/LikeSvg";

function PayConfirm() {
  const ref = useRef(null);
  const inputRef = useRef(null);
  const { router } = useContext(MainContext);
  const [likeCount, setLikeCount] = useState(1);
  const [width, setWidth] = useState(0);

  useClickAway(
    ref,
    () => {
      router.toBack();
    },
    ["mousedown"]
  );

  const handleIncreaseCount = () => {
    if (likeCount < 1000) {
      setLikeCount((prevLikeCount) => (prevLikeCount += 1));
    }
  };

  const handleDecreaseCount = () => {
    if (likeCount > 1) {
      setLikeCount((prevLikeCount) => (prevLikeCount -= 1));
    }
  };

  const handleChangeLikeCount = (e) => {
    if (
      e.target.value < 1000 &&
      e.target.value >= 0 &&
      e.target.value[0] != 0
    ) {
      setLikeCount(e.target.value);
    }
  };

  useEffect(() => {
    setWidth(inputRef?.current?.value.length);
  }, [likeCount]);

  return (
    <div className={`PayConfirm ${"open"}`} ref={ref}>
      <div className="PayConfirm__header" onClick={() => router.toBack()}></div>
      <div className="PayConfirm__title mini-title">
        Выберите количество <span className="text_accented">лайков</span>{" "}
        которые хотите поставить
      </div>
      <div className="LikeCouter">
        <div
          className="LikeCouter__minus LikeCouter__block"
          onClick={handleDecreaseCount}
        >
          <div></div>
        </div>
        <div
          className="LikeCouter__total"
          onClick={() => inputRef.current.focus()}
        >
          <input
            value={likeCount}
            onChange={handleChangeLikeCount}
            onBlur={() => likeCount == 0 && setLikeCount(1)}
            ref={inputRef}
            style={{ width: width + "ch" }}
          />
          <LikeSvg full="true" />
        </div>
        <div
          className="LikeCouter__plus LikeCouter__block"
          onClick={handleIncreaseCount}
        >
          <div></div>
        </div>
      </div>
      <div className="PayConfirm__btn">
        <div className="PayConfirm__btn_text">Поставить лайк</div>
        <div className="PayConfirm__delimetr"></div>
        <div className="PayConfirm__pay">
          <EnergySvg color="#BCDE3B" width="24px" height="24px" />
          <div className="PayConfirm__pay_text">{likeCount}</div>
        </div>
      </div>
    </div>
  );
}

export default PayConfirm;
