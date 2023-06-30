import React, { useContext } from "react";
import profile__delete from "assets/img/profile__delete.svg";
import ShareSvg from "components/common/shareSvg";
import MedalSvg from "assets/img/MedalSvg.svg";

import { MainContext } from "components/shared/providers/MainProvider";

function ProfileArt({ item }) {
  const { router, handleShowSharePopout, handleCopyPrompt, setActiveContest } =
    useContext(MainContext);

  const setContest = () => {
    setActiveContest(item.contest);
  };

  return (
    <div className="ProfileArt">
      <div
        className="ProfileArt__body"
        style={{
          background: `no-repeat center/cover url(${item.img})`,
        }}
      >
        <div className="ProfileArt__leftSide"></div>
        <div className="ProfileArt__rightSide">
          {item.contest && (
            <div
              className="ProfileArt__participation"
              onClick={() => {
                setContest();
                router.toView("contests");
                router.toPanel("contest");
              }}
            >
              <img src={MedalSvg} />
            </div>
          )}
        </div>
      </div>
      <div className="Gallery__prompt">
        <div
          className="ContestWork__profile_prompt text_gray"
          onClick={() => handleCopyPrompt(item.prompt, item.styles, item.pro)}
        >
          {item.pro && <span className="modeProHint">pro</span>}
          {item.prompt}... <span className="text_accented">Подробнее</span>
        </div>
        <div className="promptControls">
          {!item.contest && (
            <div className="ProfileArt__delete roundBtn">
              <img src={profile__delete} />
            </div>
          )}

          <div className="shareBtn roundBtn" onClick={handleShowSharePopout}>
            <ShareSvg color={"#fff"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileArt;
