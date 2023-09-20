import { Switch } from "@vkontakte/vkui";
import { GenerateContext, MainContext } from "components/shared/providers";
import { useContext } from "react";
import HeaderControls from "components/common/HeaderControls";

function StyleSelectionHeader() {
  const { go, userData } = useContext(MainContext);
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
      <HeaderControls />
    </div>
  );
}

export default StyleSelectionHeader;
