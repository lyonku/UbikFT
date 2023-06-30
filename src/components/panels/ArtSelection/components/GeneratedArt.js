import React, { useState, useContext } from "react";

import ShareSvg from "components/common/shareSvg";
import benefitsImg from "assets/img/payEnergy__benefitsImg.svg";
import { MainContext } from "components/shared/providers/MainProvider";

const GeneratedArt = () => {
  const [copyPromptAlert, setCopyPromptAlert] = useState(false);
  const {
    currentImg,
    handleCopy,
    handleContestSelectPopout,
    handleShowSharePopout,
  } = useContext(MainContext);

  const handleCopyAlert = (text) => {
    handleCopy(text);
    setCopyPromptAlert(true);
    setTimeout(() => setCopyPromptAlert(false), 2000);
  };

  return (
    <div className="ArtSelection__body">
      <div className="ArtSelection__title title">
        Получился шедевр? <br />
        <span className="text_accented">Отправь работу на конкурс</span>
      </div>

      <div className="ArtSelection__img">
        <img src={currentImg?.img} />
        <div className="ArtSelection__imgControls ">
          <div
            className="ArtSelection__shareBtn "
            onClick={() => handleShowSharePopout()}
          >
            <ShareSvg width="16px" height="16px" />
          </div>
          <div className="ArtSelection__seed" onClick={handleCopyAlert}>
            Seed: {currentImg?.seed}
          </div>
        </div>
      </div>

      <div className="ArtSelection__glow"></div>

      <div className="ArtSelection__btns">
        <div
          className="ArtSelection__nftBtn btn"
          onClick={handleContestSelectPopout}
        >
          Отправить на конкурс
        </div>
      </div>
      <div className={`Notification ${copyPromptAlert && "open"}`}>
        <img src={benefitsImg} />
        Seed скопирован
      </div>
    </div>
  );
};

export default GeneratedArt;
