import closeBtn from "assets/img/close-btn.svg";
import HeartSvg from "components/common/svgs/heartSvg";

import EnergySvg from "components/common/svgs/energySvg";
import EditSvg from "components/common/svgs/editSvg";
import RefreshBtn from "components/common/svgs/refreshSvg";
import {
  GenerateContext,
  MainContext,
  PopoutContext,
} from "components/shared/providers";
import { useContext } from "react";
import HeaderControls from "components/common/HeaderControls";

function ArtSelectionControls() {
  const { go } = useContext(MainContext);
  const { setCurrentImg } = useContext(GenerateContext);
  const { handleSetArtCountPopout } = useContext(PopoutContext);

  return (
    <div className="ArtSelection__controls">
      <div className="styleSelection__header_rightSide">
        <HeaderControls />
      </div>
      <div className="ArtSelection__firstControls">
        <div
          className="ArtSelection__edit smallBtn-text"
          onClick={() => {
            go("/");
            setTimeout(() => {
              setCurrentImg([]);
            }, 100);
          }}
        >
          <EditSvg color="#b2e723" />
        </div>
        <div
          className="ArtSelection__refreshBtn smallBtn-text"
          onClick={() => {
            handleSetArtCountPopout();
          }}
        >
          <RefreshBtn />
        </div>
      </div>
    </div>
  );
}

export default ArtSelectionControls;
