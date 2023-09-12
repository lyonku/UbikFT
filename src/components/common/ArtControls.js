import {
  ContestsContext,
  MainContext,
  PopoutContext,
} from "components/shared/providers";
import { useContext, useState } from "react";
import deleteSvg from "assets/img/profile__delete.svg";
import download from "assets/img/download.svg";
import warningMark from "assets/img/warningMark.svg";
import { MoreOutlined } from "@ant-design/icons";
import { Popover } from "@vkontakte/vkui/dist/components/Popover/Popover";

function ArtControls({
  data,
  art,
  isDownload = false,
  isComplaint = false,
  isDelete = false,
}) {
  const { downloadArt } = useContext(MainContext);
  const { deleteContestArt } = useContext(ContestsContext);
  const { handleArtComplaint } = useContext(PopoutContext);
  const [shown, setShown] = useState(false);

  return (
    <div className="Art__controls">
      <Popover
        placement="bottom-end"
        className="ContestWork__menu"
        action="click"
        shown={shown}
        onShownChange={setShown}
        content={
          <div className="ContestWork__menu_wrap">
            {isComplaint && (
              <div
                className="ContestWork__menu_btn"
                onClick={() => {
                  handleArtComplaint({
                    user_id: data.vk_user_id,
                    art_id: art.art_id,
                    contest_id: art.contest,
                  });
                  setShown(false);
                }}
              >
                <img src={warningMark} />
                <span>Пожаловаться</span>
              </div>
            )}
            {isDelete && (
              <div
                className="ContestWork__menu_btn"
                onClick={() =>
                  deleteContestArt({
                    contest_id: art.contest,
                    user_id: data.vk_user_id,
                    art_id: art.art_id,
                  })
                }
              >
                <img src={deleteSvg} />
                <span>Удалить</span>
              </div>
            )}
            {isDownload && (
              <div
                className="ContestWork__menu_btn"
                onClick={() => downloadArt(art.imagesLink, art.prompt)}
              >
                <img src={download} />
                <span>Скачать</span>
              </div>
            )}
          </div>
        }
      >
        <div className="ContestWork__menuBtn">
          <MoreOutlined style={{ fontSize: "18px" }} />
        </div>
      </Popover>
    </div>
  );
}

export default ArtControls;
