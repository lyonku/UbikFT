import EnergySvg from "components/common/svgs/energySvg";
import HeartSvg from "components/common/svgs/heartSvg";
import { Switch } from "@vkontakte/vkui";
import { GenerateContext, MainContext } from "components/shared/providers";
import { useContext } from "react";

function StyleSelectionHeader() {
  const { router, userData } = useContext(MainContext);
  const { modePro, handleChangeModePro } = useContext(GenerateContext);

  return (
    <div className="styleSelection__header">
      <div
        className="styleSelection__pro smallBtn-text"
        onClick={handleChangeModePro}
      >
        <Switch checked={modePro} onChange={handleChangeModePro} />
        <span className="styleSelection__pro_text">PRO</span>
      </div>
      <div className="styleSelection__header_rightSide">
        <div
          className="styleSelection__rating smallBtn-text"
          onClick={() => router.toView("Rating")}
        >
          <HeartSvg width={"32px"} height={"32px"} />
          {userData.rating ?? "..."}
        </div>
        <div
          className="styleSelection__energy smallBtn-text"
          onClick={() => router.toView("payEnergy")}
        >
          <EnergySvg width={"32px"} height={"32px"} />
          {userData.energy ?? "..."}
        </div>
      </div>
    </div>
  );
}

export default StyleSelectionHeader;
