import galleryItem__avatar from "assets/img/galleryItem__avatar.png";
import Winner from "assets/img/Winner.svg";

import ShareSvg from "components/common/shareSvg";
import LikeSvg from "components/common/LikeSvg";

function ContestWork({
  handleShowSharePopout,
  handleSendLikePopout,
  handleCopyPrompt,
  data,
  activeContest,
}) {
  return (
    <div className="ContestWork">
      <img src={data.img} className="ContestWork__img" />
      {data.winner && <img src={Winner} className="ContestWork__winner" />}

      <div className="ContestWork__footer">
        <div className="ContestWork__profile">
          <div className="ContestWork__profile_img">
            <img src={galleryItem__avatar} />
          </div>
          <div className="ContestWork__profile_text">
            <div className="ContestWork__profile_name">
              Иван Иванов {data.winner && " - Победитель!"}
            </div>
            {(activeContest.type == "vote" ||
              activeContest.type == "ended") && (
              <div
                className="ContestWork__profile_prompt text_gray"
                onClick={() =>
                  handleCopyPrompt(data.prompt, data.styles, data.pro)
                }
              >
                {data.pro && <span className="modeProHint">pro</span>}
                {data.prompt}...{" "}
                <span className="text_accented"> Подробнее</span>
              </div>
            )}
          </div>
        </div>
        <div className="ContestWork__controls">
          <div className="shareBtn roundBtn" onClick={handleShowSharePopout}>
            <ShareSvg color={"#fff"} />
          </div>
          {(activeContest.type == "vote" || activeContest.type == "ended") && (
            <div
              className="ContestWork__like"
              onClick={() =>
                activeContest.type === "vote" && handleSendLikePopout()
              }
            >
              <LikeSvg />
              <span>{data.likes}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContestWork;
