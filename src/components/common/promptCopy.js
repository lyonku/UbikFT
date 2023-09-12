import React, { useContext, useRef } from "react";
import { useClickAway } from "react-use";
import { GenerateContext, MainContext } from "components/shared/providers";

import closeImg from "assets/img/close-btn.svg";

function promptCopy({ prompt, seed, styles, pro }) {
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
    <div className="promptCopy" ref={ref}>
      <div className="promptCopy__controls">
        <img src={closeImg} onClick={() => router.toBack()} />
      </div>
      <div className={`promptCopy__body`}>
        <div className="promptCopy__item title_h4-18px">
          Prompt: <span>{prompt}</span>
        </div>
        <div className="promptCopy__item title_h4-18px">
          Seed: <span>{seed}</span>
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
