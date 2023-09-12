import React, { useContext, useRef } from "react";
import { useClickAway } from "react-use";
import { GenerateContext, MainContext } from "components/shared/providers";

import closeImg from "assets/img/close-btn.svg";

function ComplaintsList({ mass }) {
  const ref = useRef(null);
  const { router } = useContext(MainContext);
  const { handleCopyPrompt } = useContext(GenerateContext);

  useClickAway(
    ref,
    () => {
      router.toBack();
    },
    ["mousedown"]
  );
  return (
    <div className="promptCopy ComplaintsList" ref={ref}>
      <div className="ComplaintsList__controls promptCopy__controls">
        <div className="title_h3-24px">Жалобы:</div>
        <img src={closeImg} onClick={() => router.toBack()} />
      </div>
      <div className={`ComplaintsList__body promptCopy__body`}>
        {mass?.map((el, index) => {
          return (
            <div key={index} className="promptCopy__item title_h4-18px">
              <span>{el}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ComplaintsList;
