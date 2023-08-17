import galleryItem__avatar from "assets/img/galleryItem__avatar.png";

import ShareSvg from "components/common/svgs/shareSvg";
import LikeSvg from "components/common/svgs/LikeSvg";
import { MainContext, PopoutContext } from "components/shared/providers";
import { useContext } from "react";

function ContestWorks__item({ data, index }) {
  const { router, activeContest } = useContext(MainContext);
  const {
    handleSendLikePopout,
    handleShowSharePopout,
    handlePromptCopyPopout,
  } = useContext(PopoutContext);

  return (
    <div className="ContestWork">
      <img src={data.art.imagesLink} className="ContestWork__img" />

      <div className="ContestWork__footer">
        <div className="ContestWork__profile">
          {activeContest.type !== "workAcceptance" && (
            <div className="numeration">{index}</div>
          )}

          <div className="ContestWork__profile_img">
            <img src={data.photo} />
          </div>
          <div className="ContestWork__profile_text">
            <div className="ContestWork__profile_name">
              {data.firstName + " " + data.lastName}
            </div>
            {(activeContest.type == "vote" ||
              activeContest.type == "ended") && (
              <>
                <div
                  className="ContestWork__profile_prompt text_gray"
                  onClick={() =>
                    handlePromptCopyPopout(
                      data.art.prompt,
                      data.art.styles,
                      data.art.isPro
                    )
                  }
                >
                  {data.art.isPro && <span className="modeProHint">pro</span>}
                  {data.art.prompt}...{" "}
                  <span className="text_accented"> Подробнее</span>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="ContestWork__controls">
          <div
            className="shareBtn roundBtn ContestWork__shareBtn"
            onClick={() =>
              handleShowSharePopout({
                inContest: activeContest,
                img: data.img,
              })
            }
          >
            <ShareSvg color={"#fff"} />
          </div>
          {(activeContest.type == "vote" || activeContest.type == "ended") && (
            <>
              <div
                className={`ContestWork__like ${
                  activeContest.type == "ended" && "ended"
                }`}
              >
                <LikeSvg
                  full={activeContest.type == "ended" ? "true" : "false"}
                  onClick={() =>
                    activeContest.type === "vote" && handleSendLikePopout()
                  }
                />
              </div>

              <div
                className={`ContestWork__likeCount ${
                  activeContest.type == "ended" && "ended"
                }`}
                onClick={() => router.toView("ArtVoted")}
              >
                <span>{data.likes}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContestWorks__item;
