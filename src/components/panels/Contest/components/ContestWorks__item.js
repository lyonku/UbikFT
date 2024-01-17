import { useContext, useState } from "react";
import {
  ContestsContext,
  MainContext,
  PopoutContext,
} from "components/shared/providers";

import ArtControls from "components/common/ArtControls";
import ShareSvg from "components/common/svgs/shareSvg";

import LikeSvg from "components/common/svgs/LikeSvg";
import { useParams } from "@vkontakte/vk-mini-apps-router";

function ContestWorks__item({ data, index }) {
  const { go, fetchedUser } = useContext(MainContext);
  const { setArtVoted, activeContest, artRef } = useContext(ContestsContext);
  const {
    handleSendLikePopout,
    handleShowSharePopout,
    handlePromptCopyPopout,
  } = useContext(PopoutContext);

  const isArtLiked = !!data?.likes?.personLikes?.find(
    (item) => item.vk_user_id === fetchedUser.id
  );
  let isLikeSet = !!activeContest?.globalLikes?.find(
    (item) => item.vk_user_id === fetchedUser.id
  );

  let isEnded =
    activeContest.type == "ended" || activeContest.type == "pre-ended";
  let isTypeVote = activeContest.type == "vote";
  let isTypeVoteOrEnd = activeContest.type !== "workAcceptance";

  const addLike = () => {
    if (isTypeVote) {
      handleSendLikePopout({
        art_id: data.art.art_id,
        liked_user_id: data.vk_user_id,
        isLikeSet: isLikeSet,
        isArtLiked: isArtLiked,
      });
    }
  };

  const params = useParams();
  const art_id = params.art_id;

  return (
    <div
      className="ContestWork"
      ref={data.art.art_id == art_id ? artRef : null}
    >
      <div className="ContestWork__img_wrap">
        <img src={data.art.artLink} className="ContestWork__img" />
        <ArtControls
          data={data}
          art={data.art}
          isComplaint={true}
          isDelete={true}
          isDownload={true}
        />
        {isTypeVoteOrEnd && <div className="numeration">{index}</div>}
      </div>
      <div className="ContestWork__footer">
        <div className="ContestWork__profile">
          <div className="ContestWork__profile_img">
            <img src={data.photo} />
          </div>
          <div className="ContestWork__profile_text">
            <a
              className="ContestWork__profile_name"
              key={index}
              href={`https://vk.com/id${data.vk_user_id}`}
              target="_blank"
            >
              {data.firstName + " " + data.lastName}
            </a>
            {isTypeVoteOrEnd && (
              <div
                className="Prompt text_gray"
                onClick={() => {
                  handlePromptCopyPopout(data.art);
                }}
              >
                <span className="Prompt__text">
                  {data.art.isPro && <span className="modeProHint">pro</span>}
                  {data.art.prompt}
                </span>
              </div>
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
          {isTypeVoteOrEnd && (
            <div className="ContestWork__like_wrap">
              <div
                className={`ContestWork__like  ${isEnded && "ended"}`}
                onClick={addLike}
              >
                <LikeSvg full={isArtLiked.toString()} />
              </div>
              <div
                className={`ContestWork__likeCount ${isEnded && "ended"}`}
                onClick={() => {
                  go("/artVoted");
                  setArtVoted(data.likes);
                }}
              >
                <span>{data.likes.total}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContestWorks__item;
