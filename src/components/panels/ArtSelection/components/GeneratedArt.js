import React, { useState, useEffect } from "react";
import EnergySvg from "components/common/energySvg";
import ShareSvg from "components/common/shareSvg";
import NftLogoSvg from "components/common/nftLogoSvg";
import editBtn from "assets/img/artSelection__edit.svg";
import RefreshBtn from "components/common/refreshSvg";

const ArtSelection = ({
  currentImg,
  setShowShareAlert,
  handleArtGenerate,
  goBack,
}) => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="ArtSelection__body">
      <div className="ArtSelection__title title">
        Получился шедевр? <br />
        Выпусти
        <span className="title_accented">
          {" "}
          NFT на {width < 503 && <br />}OpenSea{" "}
          <NftLogoSvg width="30px" height="30px" />
        </span>
      </div>
      <div className="ArtSelection__img">
        <img src={currentImg} />

        <div className="ArtSelection__imgControls ">
          <div
            className="ArtSelection__edit ArtSelection__shareBtn"
            onClick={() => goBack(1)}
          >
            <img src={editBtn} />
          </div>
          <div
            className="ArtSelection__refreshBtn ArtSelection__shareBtn"
            onClick={() => {
              goBack(1);
              handleArtGenerate();
            }}
          >
            <RefreshBtn color="#b0e822" />
          </div>
          <div
            className="ArtSelection__shareBtn "
            onClick={() => setShowShareAlert(true)}
          >
            <ShareSvg />
          </div>
        </div>
      </div>
      <div className="ArtSelection__glow"></div>

      <div className="ArtSelection__btns">
        <div className="ArtSelection__nftBtn btn">
          Создать NFT <div className="createBtn__delimetr"></div>
          <EnergySvg width={"18px"} height={"18px"} color="#FFFFFF" /> 1
        </div>
      </div>
    </div>
  );
};

export default ArtSelection;
