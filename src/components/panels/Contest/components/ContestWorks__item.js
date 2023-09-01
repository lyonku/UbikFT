import ShareSvg from "components/common/svgs/shareSvg";
import LikeSvg from "components/common/svgs/LikeSvg";
import warningMark from "assets/img/warningMark.svg";
import deleteSvg from "assets/img/profile__delete.svg";
import download from "assets/img/download.svg";
import { MainContext, PopoutContext } from "components/shared/providers";
import { useContext, useState } from "react";
import { MoreOutlined } from "@ant-design/icons";
import { Popover } from "@vkontakte/vkui/dist/components/Popover/Popover";

function ContestWorks__item({ data, index }) {
  const { router, activeContest, setArtVoted, fetchedUser } =
    useContext(MainContext);
  const {
    handleSendLikePopout,
    handleShowSharePopout,
    handlePromptCopyPopout,
    handleArtComplaint,
    handleShowComplaints,
  } = useContext(PopoutContext);
  const [shown, setShown] = useState(false);

  const isLiked = data?.likes?.personLikes?.find(
    (item) => item.vk_user_id === fetchedUser.id
  );
  let isLikedContest = activeContest?.globalLikes?.find(
    (item) => item.vk_user_id === fetchedUser.id
  );

  return (
    <div className="ContestWork">
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
      <div className="ContestWork__profile_controls">
        <Popover
          className="ContestWork__menu"
          action="click"
          shown={shown}
          onShownChange={setShown}
          content={
            <div className="ContestWork__menu_wrap">
              <div
                className="ContestWork__menu_btn"
                onClick={() => {
                  handleArtComplaint({
                    user_id: data.vk_user_id,
                    art_id: data.art.art_id,
                    contest_id: data.art.contest,
                  });
                  setShown(false);
                }}
              >
                <img src={warningMark} />
                <span>Пожаловаться</span>
              </div>
              <div className="ContestWork__menu_btn">
                <img src={deleteSvg} />
                <span>Удалить</span>
              </div>
              <div className="ContestWork__menu_btn">
                <img src={download} />
                <span>Скачать</span>
              </div>
            </div>
          }
        >
          <div className="ContestWork__menuBtn">
            <MoreOutlined style={{ fontSize: "18px" }} />
          </div>
        </Popover>
      </div>

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
          {(activeContest.type == "vote" || activeContest.type == "ended") && (
            <>
              <div
                className={`ContestWork__like ${
                  (activeContest.type == "ended" ||
                    isLikedContest ||
                    isLiked) &&
                  "ended"
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
                <LikeSvg
                  full={
                    activeContest.type == "ended" || isLiked ? "true" : "false"
                  }
                />
              </div>

              <div
                className={`ContestWork__likeCount ${
                  activeContest.type == "ended" && "ended"
                }`}
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
