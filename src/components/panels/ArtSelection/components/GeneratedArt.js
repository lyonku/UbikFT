import React, { useState, useContext, useRef, useEffect } from "react";
import { Icon12Chevron } from "@vkontakte/icons";
import ShareSvg from "components/common/svgs/shareSvg";
import { Carousel } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Mousewheel, Navigation, Pagination } from "swiper/modules";
import {
  GenerateContext,
  MainContext,
  PopoutContext,
} from "components/shared/providers";

const GeneratedArt = () => {
  const { notify } = useContext(MainContext);
  const { currentImg } = useContext(GenerateContext);
  const { handleContestSelectPopout, handleShowSharePopout } =
    useContext(PopoutContext);
  const ref = useRef();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [artInContest, setArtInContest] = useState(true);

  const checkContestArt = (currentSlide) => {
    setArtInContest(currentImg[currentSlide]?.artLink?.includes("contests"));
  };

  useEffect(() => {
    checkContestArt(0);
  }, []);

  const onChange = (currentSlide) => {
    setCurrentSlide(currentSlide);
    checkContestArt(currentSlide);
  };

  return (
    <div className="ArtSelection__body">
      <div className="ArtSelection__title title">{`${
        currentImg.length > 1
          ? `Ваши арт готовы (${currentSlide + 1}/${currentImg.length})`
          : "Ваш арт готов"
      } `}</div>

      <Swiper
        spaceBetween={30}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Mousewheel, Pagination, Navigation]}
        className="ArtSelection__carousel"
        grabCursor={true}
        mousewheel={true}
        onSlideChange={(e) => onChange(e.activeIndex)}
      >
        {currentImg.length >= 1 &&
          currentImg?.map((img, index) => {
            return (
              <SwiperSlide className="ArtSelection__imgWrap" key={index}>
                <div className="ArtSelection__img">
                  <div className="ArtSelection__imgControls ">
                    <img src={img.artLink} />
                    <div
                      className="ArtSelection__shareBtn "
                      onClick={() => handleShowSharePopout(img)}
                    >
                      <ShareSvg width="16px" height="16px" />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
      <div className="ArtSelection__glow"></div>
      <div className="ArtSelection__btns">
        <div
          className={`ArtSelection__nftBtn btn ${artInContest && "disable"}`}
          onClick={() => {
            if (!artInContest) {
              handleContestSelectPopout({
                art_id: currentImg[currentSlide]?.art_id,
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
