import React, { useContext, useEffect, useState } from "react";
import profile__delete from "assets/img/profile__delete.svg";
import ShareSvg from "components/common/svgs/shareSvg";

import {
  GenerateContext,
  MainContext,
  PopoutContext,
} from "components/shared/providers";
import ArtControls from "components/common/ArtControls";
import { Spinner } from "@vkontakte/vkui";

function ProfileArt({ item, inContest = false }) {
  const { deleteArt, artDeleting } = useContext(MainContext);
  const { currentImg, setCurrentImg } = useContext(GenerateContext);
  const {
    handlePromptCopyPopout,
    handleShowSharePopout,
    handleContestSelectPopout,
  } = useContext(PopoutContext);

  const handleDeleteArt = (item) => {
    if (!artDeleting) {
      deleteArt(item.art_id).then(() => {
        if (currentImg.length >= 1) {
          const copy = currentImg.slice(); // Копируем текущий массив
          const filteredArray = copy.filter((el) => el.art_id !== item.art_id);
          setCurrentImg(filteredArray);
        }
      });
    }
  };

  return (
    <div className={`ProfileArt `}>
      <div className="ProfileArt__body">
        <img className="ProfileArt__body_img" src={item.artLink} />
        {!inContest && (
          <div
            className="ProfileArt__controls transparentBlock darkBlock"
            onClick={() => handleContestSelectPopout({ art_id: item.art_id })}
          >
            Отправить на конкурс
          </div>
        )}
        <ArtControls art={item} isDownload={true} />
      </div>
      <div className="Prompt__contols">
        <div
          className="Prompt text_gray"
          onClick={() => handlePromptCopyPopout(item)}
        >
          <span className="Prompt__text">
            {item.isPro && <span className="modeProHint">pro</span>}
            {item.prompt}
          </span>
        </div>
        <div className="promptControls">
          {!inContest && (
            <div
              className="ProfileArt__delete roundBtn"
              onClick={() => handleDeleteArt(item)}
            >
              {artDeleting ? (
                <Spinner size="regular" style={{ color: "#fff" }} />
              ) : (
                <img src={profile__delete} />
              )}
            </div>
          )}
          <div
            className="shareBtn roundBtn"
            onClick={() => handleShowSharePopout(item)}
          >
            <ShareSvg color={"#fff"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileArt;
