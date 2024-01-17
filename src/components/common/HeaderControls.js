import HeartSvg from "assets/img/Frame.svg";
import EnergySvg from "assets/img/energe.svg";

import { MainContext } from "components/shared/providers";
import { useContext } from "react";

function HeaderControls() {
  const { go, userData } = useContext(MainContext);

  return (
    <div className="styleSelection__header_rightSide">
      <div
        className="styleSelection__rating smallBtn-text"
        onClick={() => go("/rating")}
      >
        <img src={HeartSvg} />
        {userData.rating ?? "..."}
      </div>
      <div
        className="styleSelection__energy smallBtn-text"
        onClick={() => go("/store")}
      >
        <img src={EnergySvg} />
        {userData.energy ?? "..."}
      </div>
    </div>
  );
}

export default HeaderControls;
