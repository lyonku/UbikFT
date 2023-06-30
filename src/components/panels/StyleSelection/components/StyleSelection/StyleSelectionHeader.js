import EnergySvg from "components/common/energySvg";
import { Switch } from "@vkontakte/vkui";

function StyleSelectionHeader({ router, handleChangeModePro, modePro }) {
  return (
    <div className="styleSelection__header">
      <div
        className="styleSelection__pro smallBtn-text"
        onClick={handleChangeModePro}
      >
        <Switch checked={modePro} onChange={handleChangeModePro} />
        <span>PRO</span>
      </div>
      <div
        className="styleSelection__energy smallBtn-text"
        onClick={() => router.toView("payEnergy")}
      >
        <EnergySvg width={"20px"} height={"20px"} />
        100
      </div>
    </div>
  );
}

export default StyleSelectionHeader;
