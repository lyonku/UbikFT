import ShareSvg from "components/common/svgs/shareSvg";
import LikeSvg from "components/common/svgs/LikeSvg";
import warningMark from "assets/img/warningMark.svg";

import { MainContext, PopoutContext } from "components/shared/providers";
import { useContext, useState } from "react";
import ArtControls from "components/common/ArtControls";

function ContestWorks__item({ data, index }) {
  const { router, activeContest, setArtVoted, fetchedUser, artRef } =
    useContext(MainContext);
  const {
    handleSendLikePopout,
    handleShowSharePopout,
    handlePromptCopyPopout,
    handleShowComplaints,
  } = useContext(PopoutContext);

  const isLiked = data?.likes?.personLikes?.find(
    (item) => item.vk_user_id === fetchedUser.id
  );
  let isLikedContest = activeContest?.globalLikes?.find(
    (item) => item.vk_user_id === fetchedUser.id
  );

  let isEnded =
    activeContest.type == "ended" || activeContest.type == "pre-ended";
  let mass = window.location.hash.split("/");

  return (
    <div
      className="ContestWork"
      ref={data.art.art_id == mass.at(-1) ? artRef : null}
    >
      <div className="ContestWork__img_wrap">
        <img src={data.art.imagesLink} className="ContestWork__img" />
        {data.complaint?.length >= 1 && (
          <div
            className="ContestWork__complaint"
            onClick={() => handleShowComplaints(data.complaint)}
          >
            <img src={warningMark} />
            <span>Жалобы</span>
          </div>
        )}
      </div>
      <ArtControls
        data={data}
        art={data.art}
        isComplaint={true}
        isDelete={true}
        isDownload={true}
      />
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
            {(activeContest.type == "vote" || isEnded) && (
              <>
                <div
                  className="Prompt text_gray"
                  onClick={() => {
                    handlePromptCopyPopout(
                      data.art.prompt,
                      data.art.styles,
                      data.art.isPro,
                      data.art.seed
                    );
                  }}
                >
                  <span className="Prompt__text">
                    {data.art.isPro && <span className="modeProHint">pro</span>}
                    {data.art.prompt}
                  </span>
                  {/* <span className="text_accented"> Подробнее</span> */}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="ContestWork__controls">
          <div
            className="shareBtn roundBtn ContestWork__shareBtn"
            onClick={() => handleShowSharePopout(data.art)}
          >
            <ShareSvg color={"#fff"} />
          </div>
          {(activeContest.type == "vote" || isEnded) && (
            <>
              <div
                className={`ContestWork__like ${
                  (isEnded || isLikedContest || isLiked) && "ended"
                }`}
                onClick={() => {
                  activeContest.type === "vote" &&
                    !isLiked &&
                    !isLikedContest &&
                    handleSendLikePopout({
                      art_id: data.art.art_id,
                      vk_user_id: data.vk_user_id,
                    });
                }}
              >
                <LikeSvg full={isEnded || isLiked ? "true" : "false"} />
              </div>

              <div
                className={`ContestWork__likeCount ${isEnded && "ended"}`}
                onClick={() => {
                  router.toView("ArtVoted");
                  setArtVoted(data.likes);
                }}
              >
                <span>{data.likes.total}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContestWorks__item;
