import React, { useState, useEffect } from "react";
import EnergySvg from "components/common/energySvg";
import ShareSvg from "components/common/shareSvg";
import NftLogoSvg from "components/common/nftLogoSvg";
import RefreshBtn from "components/common/refreshSvg";

const ArtSelection = ({
  currentImg,
  setShowShareAlert,
  handleArtGenerate,
  router,
  handleShowSharePopout,
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
            className="ArtSelection__refreshBtn "
            onClick={() => {
              router.toBack();
              handleArtGenerate();
            }}
          >
            <RefreshBtn color="#b0e822" />
            {width >= 465 && <span>Повторить</span>}

            <div className="ArtSelection__refreshBtn_delimetr"></div>
            <span className="count">1</span>
            <EnergySvg width="16px" height="16px" color="#b0e822" />
          </div>
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
        <div className="ArtSelection__nftBtn btn">Отправить на конкурс</div>
        <div className="ArtSelection__desc">
          Один автор может отправить только одну работу на конкурс
        </div>
      </div>
    </div>
  );
};

export default ArtSelection;
