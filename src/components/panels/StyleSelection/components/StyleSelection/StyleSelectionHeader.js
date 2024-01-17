import { Switch, Tooltip, TooltipContainer } from "@vkontakte/vkui";
import { GenerateContext } from "components/shared/providers";
import { useContext, useState } from "react";
import HeaderControls from "components/common/HeaderControls";

function StyleSelectionHeader() {
  const { modePro, handleChangeModePro } = useContext(GenerateContext);
  // const [tooltip, setTooltip] = useState(true);

  return (
    <div className="styleSelection__header">
      {/* <TooltipContainer style={{ zIndex: 999 }} fixed>
        <Tooltip
          isShown={tooltip}
          onClose={() => {
            setTooltip(false);
          }}
          text="Нажмите на кнопку, чтобы войти в про режим"
          header="Про режим"
          appearance="neutral"
        > */}
      <div
        className="styleSelection__pro smallBtn-text"
        onClick={handleChangeModePro}
      >
        <Switch checked={modePro} onChange={handleChangeModePro} />
        <span className="styleSelection__pro_text">PRO</span>
      </div>
      {/* </Tooltip>
      </TooltipContainer> */}

      <HeaderControls />
    </div>
  );
}

export default StyleSelectionHeader;
