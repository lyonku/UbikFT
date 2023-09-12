import React, { useState, useContext, useRef, useEffect } from "react";

import ShareSvg from "components/common/svgs/shareSvg";
import {
  GenerateContext,
  MainContext,
  PopoutContext,
} from "components/shared/providers";
import { Carousel } from "antd";
import { Icon12Chevron } from "@vkontakte/icons";

const GeneratedArt = () => {
  const { notify } = useContext(MainContext);
  const { setCurrentImg, currentImg } = useContext(GenerateContext);
  const { handleContestSelectPopout, handleShowSharePopout } =
    useContext(PopoutContext);
  const ref = useRef();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [artInContest, setArtInContest] = useState(false);

  useEffect(() => {
    onChange(0);
  }, []);

  const onChange = (currentSlide) => {
    setCurrentSlide(currentSlide);
    if (currentImg[currentSlide].imagesLink.includes("contests")) {
      setArtInContest(true);
    } else {
      setArtInContest(false);
    }
  };

  return (
    <div className="ArtSelection__body">
      <div className="ArtSelection__title title">
        Получился шедевр? <br />
        <span className="text_accented">Отправь работу на конкурс</span>
      </div>
      <Carousel
        arrows
        className="ArtSelection__carousel"
        afterChange={onChange}
        draggable
        ref={ref}
      >
        {currentImg.length >= 1 &&
          currentImg?.map((img, index) => {
            return (
              <div className="ArtSelection__imgWrap" key={index}>
                <div className="ArtSelection__img">
                  <img src={img.imagesLink} />
                  <div className="ArtSelection__imgControls ">
                    <div
                      className="ArtSelection__shareBtn "
                      onClick={() =>
                        handleShowSharePopout({ inContest: false })
                      }
                    >
                      <ShareSvg width="16px" height="16px" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </Carousel>
      {currentImg?.length > 1 && (
        <>
          <div className="Carousel__arrow Carousel__arrow_prev">
            <Icon12Chevron
              width={32}
              height={32}
              fill="#b0e822"
              onClick={() => {
                ref.current.prev();
              }}
            />
          </div>
          <div className="Carousel__arrow Carousel__arrow_next">
            <Icon12Chevron
              width={32}
              height={32}
              fill="#b0e822"
              onClick={() => {
                ref.current.next();
              }}
            />
          </div>
        </>
      )}
      <div className="ArtSelection__glow"></div>
      <div className="ArtSelection__btns">
        <div
          className={`ArtSelection__nftBtn btn ${artInContest && "disable"}`}
          onClick={() => {
            if (!artInContest) {
              handleContestSelectPopout({
                art_id: currentImg[currentSlide].art_id,
              });
            } else {
              notify({
                text: "Арт уже добавлен на конкурс",
                type: "error",
              });
            }
          }}
        >
          Отправить на конкурс
        </div>
      </div>
    </div>
  );
};

export default GeneratedArt;
