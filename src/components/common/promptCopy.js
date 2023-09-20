import React, { useContext, useEffect, useRef, useState } from "react";
import { useClickAway } from "react-use";
import { GenerateContext, MainContext } from "components/shared/providers";

function promptCopy({ data }) {
  const { handleCopyPrompt } = useContext(GenerateContext);

  return (
    <div className={`promptCopy__body`}>
      <div className="promptCopy__item title_h4-18px">
        Prompt: <span>{data.prompt}</span>
      </div>

      {data.isPro && (
        <div className="promptCopy__item title_h4-18px">
          Negative prompt: <span>{data.negativePrompt}</span>
        </div>
      )}
      <div className="promptCopy__item title_h4-18px">
        Seed: <span>{data.seed}</span>
      </div>
      {data.isPro && (
        <div className="promptCopy__item title_h4-18px">{`Guidance Scale: ${data.cfg_scale}`}</div>
      )}
      <div
        className="btn"
        onClick={() => {
          handleCopyPrompt(data);
        }}
      >
        Применить
      </div>
    </div>
  );
}

export default promptCopy;
