import React, { useContext, useRef } from "react";
import { useClickAway } from "react-use";
import { MainContext } from "components/shared/providers";

import closeImg from "assets/img/close-btn.svg";

function promptCopy({ prompt, styles, pro }) {
  const ref = useRef(null);
  const { router, handleCopyPrompt } = useContext(MainContext);

  useClickAway(
    ref,
    () => {
      router.toBack();
    },
    ["mousedown"]
  );

  return (
    <div className="promptCopy" ref={ref}>
      <div className="promptCopy__controls">
        <img src={closeImg} onClick={() => router.toBack()} />
      </div>
      <div className={`promptCopy__body`}>
        <div className="promptCopy__item title_h4-18px">
          Prompt:{" "}
          <span>
            {prompt} много текста очень, моного авв апвдапло втаьбтпв азщпзщ
            вазщшп вазпщш зваппп зщшзщшзшщшзш взап авпв
          </span>
        </div>

        <div className="promptCopy__item title_h4-18px">
          Seed: <span>2244766882</span>
        </div>
        <div
          className="btn"
          onClick={() => {
            handleCopyPrompt(prompt, styles, pro);
          }}
        >
          Применить
        </div>
      </div>
    </div>
  );
}

export default promptCopy;
