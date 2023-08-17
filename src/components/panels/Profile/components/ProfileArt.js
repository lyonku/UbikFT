import React, { useContext, useState } from "react";
import profile__delete from "assets/img/profile__delete.svg";
import ShareSvg from "components/common/svgs/shareSvg";

import { MainContext, PopoutContext } from "components/shared/providers";

function ProfileArt({ item }) {
  const { router, deleteArt } = useContext(MainContext);
  const {
    handlePromptCopyPopout,
    handleShowSharePopout,
    handleContestSelectPopout,
  } = useContext(PopoutContext);

  const handleDeleteArt = () => {
    let startIndex = item.imagesLink.lastIndexOf("/") + 1;
    let endIndex = item.imagesLink.lastIndexOf(".");
    let imageId = item.imagesLink.substring(startIndex, endIndex);
    deleteArt(imageId);
  };
  return (
    <div className={`ProfileArt `}>
      <div className="ProfileArt__body">
        <img className="ProfileArt__body_img" src={item.imagesLink} />
        <div
          className="Gallery__controls transparentBlock"
          onClick={() => handleContestSelectPopout({ img: item })}
        >
          На конкурс
        </div>
      </div>

      <div className="Gallery__prompt">
        <div
          className="ContestWork__profile_prompt text_gray"
          onClick={() =>
            handlePromptCopyPopout(item.prompt, item.styles, item.isPro)
          }
        >
          {item.isPro && <span className="modeProHint">pro</span>}
          {item.prompt}... <span className="text_accented">Подробнее</span>
        </div>
        <div className="promptControls">
          {!item.contest && (
            <div
              className="ProfileArt__delete roundBtn"
              onClick={handleDeleteArt}
            >
              <img src={profile__delete} />
            </div>
          )}

          <div
            className="shareBtn roundBtn"
            onClick={() => handleShowSharePopout()}
          >
            <ShareSvg color={"#fff"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileArt;
