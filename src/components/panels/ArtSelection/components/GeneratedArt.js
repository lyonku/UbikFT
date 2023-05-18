import React, { useState, useEffect } from "react";

import ShareSvg from "components/common/shareSvg";

const GeneratedArt = ({
  currentImg,
  router,
  handleShowSharePopout,
  handleContestSelectPopout,
}) => {
  const [width, setWidth] = useState(window.innerWidth);

  // This hook is used to resize the image when the window is resized.
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="ArtSelection__body">
      <div className="ArtSelection__title title">
        Получился шедевр? <br />
        <span className="text_accented">Отправь работу на конкурс</span>
      </div>
      <div className="ArtSelection__img">
        <img src={currentImg} />

        <div className="ArtSelection__imgControls ">
          <div
            className="ArtSelection__shareBtn "
            onClick={() => handleShowSharePopout()}
          >
            <ShareSvg width="16px" height="16px" />
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
    </div>
  );
};

export default GeneratedArt;
