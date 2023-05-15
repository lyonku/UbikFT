import React, { useContext, useRef } from "react";
import EnergySvg from "components/common/energySvg";
import { useClickAway } from "react-use";

import { MainContext } from "components/shared/providers/MainProvider";

function PayConfirm() {
  const ref = useRef(null);
  const { router } = useContext(MainContext);

  useClickAway(
    ref,
    () => {
      router.toPopout(null);
    },
    ["mousedown"]
  );

  return (
    <div className={`PayConfirm ${"open"}`} ref={ref}>
      <div
        className="PayConfirm__header"
        onClick={() => router.toPopout(null)}
      ></div>
      <div className="PayConfirm__title mini-title">
        Чтобы поставить лайк нужно потратить{" "}
        <span className="text_accented">единицу энергии.</span>
      </div>
      <div className="PayConfirm__check">
        <input
          type="checkbox"
          id="check"
          name="check"
          className="PayConfirm__checkbox"
        />
        <label htmlFor="check">Больше не показывать эту подсказку</label>
      </div>
      <div className="PayConfirm__btn">
        <div className="PayConfirm__btn_text">Поставить лайк</div>
        <div className="PayConfirm__delimetr"></div>

        <div className="PayConfirm__pay">
          <EnergySvg color="#BCDE3B" width="24px" height="24px" />
          <div className="PayConfirm__pay_text">1</div>
        </div>
      </div>
    </div>
  );
}

export default PayConfirm;
