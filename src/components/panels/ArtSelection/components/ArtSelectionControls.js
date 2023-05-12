import closeBtn from "assets/img/close-btn.svg";

import EnergySvg from "components/common/energySvg";
import EditSvg from "components/common/editSvg";

function ArtSelectionControls({ router }) {
  return (
    <div className="ArtSelection__controls">
      <div className="ArtSelection__firstControls">
        <div
          className="ArtSelection__close smallBtn-text"
          onClick={() => {
            router.toBack();
            router.toBack();
            router.toBack();
          }}
        >
          <img src={closeBtn} />
        </div>
        <div
          className="ArtSelection__edit smallBtn-text"
          onClick={() => router.toBack()}
        >
          <EditSvg color="#b2e723" />
        </div>
      </div>
      <div
        className="ArtSelection__energy smallBtn-text"
        onClick={() => router.toView("payEnergy")}
      >
        <EnergySvg width={"20px"} height={"20px"} />
        100
      </div>
    </div>
  );
}

export default ArtSelectionControls;
