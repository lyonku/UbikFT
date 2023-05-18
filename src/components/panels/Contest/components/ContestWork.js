import galleryItem__avatar from "assets/img/galleryItem__avatar.png";
import contestHouse from "assets/img/contestHouse.png";

import ShareSvg from "components/common/shareSvg";
import LikeSvg from "components/common/LikeSvg";

function ContestWork({
  handleShowSharePopout,
  handleSendLikePopout,
  handleCopyPromptAlert,
  participation,
}) {
  const Name = "Дом с каскадной крышей в стиле ван гога";
  return (
    <div className="ContestWork">
      <img src={contestHouse} className="ContestWork__img" />
      <div className="ContestWork__footer">
        <div className="ContestWork__profile">
          <div className="ContestWork__profile_img">
            <img src={galleryItem__avatar} />
          </div>
          <div className="ContestWork__profile_text">
            <div className="ContestWork__profile_name">KlypKlypik</div>
            {participation && (
              <div
                className="ContestWork__profile_prompt text_gray"
                onClick={() => handleCopyPromptAlert(Name)}
              >
                {Name}
              </div>
            )}
          </div>
        </div>
        <div className="ContestWork__controls">
          <div className="ContestWork__shareBtn">
            <ShareSvg color={"#fff"} onClick={handleShowSharePopout} />
          </div>
          {participation && (
            <div className="ContestWork__like" onClick={handleSendLikePopout}>
              <LikeSvg />
              <span>1321</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContestWork;
