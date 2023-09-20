import {
  AdminContext,
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
  const { downloadArt, isAdmin } = useContext(MainContext);
  const { handleArtComplaint, handleDeleteContestArt } =
    useContext(PopoutContext);
  const [shown, setShown] = useState(false);

  return (
    <div className="Art__controls darkBlock">
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
                  });
                  setShown(false);
                }}
              >
                <img src={warningMark} />
                <span>Пожаловаться</span>
              </div>
            )}
            {isDelete && isAdmin && (
              <div
                className="ContestWork__menu_btn"
                onClick={() =>
                  handleDeleteContestArt({
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
                onClick={() => downloadArt(art.artLink, art.prompt)}
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
