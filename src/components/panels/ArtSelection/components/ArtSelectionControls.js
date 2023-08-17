import closeBtn from "assets/img/close-btn.svg";
import HeartSvg from "components/common/svgs/heartSvg";

import EnergySvg from "components/common/svgs/energySvg";
import EditSvg from "components/common/svgs/editSvg";
import RefreshBtn from "components/common/svgs/refreshSvg";

function ArtSelectionControls({ router, handleSetArtCountPopout, userData }) {
  return (
    <div className="ArtSelection__controls">
      <div className="styleSelection__header_rightSide">
        <div
          className="styleSelection__rating smallBtn-text"
          onClick={() => router.toView("Rating")}
        >
          <HeartSvg width={"32px"} height={"32px"} />
          {userData.rating ?? "..."}
        </div>
        <div
          className="ArtSelection__energy smallBtn-text"
          onClick={() => router.toView("payEnergy")}
        >
          <EnergySvg width={"32px"} height={"32px"} />
          {userData.energy ?? "..."}
        </div>
      </div>
      <div className="ArtSelection__firstControls">
        <div
          className="ArtSelection__edit smallBtn-text"
          onClick={() => router.toBack()}
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
