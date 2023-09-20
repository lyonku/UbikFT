import EnergySvg from "components/common/svgs/energySvg";
import HeartSvg from "components/common/svgs/heartSvg";

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
        <HeartSvg width={"32px"} height={"32px"} />
        {userData.rating ?? "..."}
      </div>
      <div
        className="styleSelection__energy smallBtn-text"
        onClick={() => go("/store")}
      >
        <EnergySvg width={"32px"} height={"32px"} />
        {userData.energy ?? "..."}
      </div>
    </div>
  );
}

export default HeaderControls;
