import closeBtn from "assets/img/close-btn.svg";

import EnergySvg from "components/common/energySvg";
import editBtn from "assets/img/artSelection__edit.svg";

function ArtSelectionControls({ go, goBack, handleClearPrompt }) {
  return (
    <div className="ArtSelection__controls">
      <div className="ArtSelection__firstControls">
        <div
          className="ArtSelection__close smallBtn-text"
          onClick={() => {
            handleClearPrompt();
            goBack(3);
          }}
        >
          <img src={closeBtn} />
        </div>
        <div
          className="ArtSelection__edit smallBtn-text"
          onClick={() => goBack(1)}
        >
          <img src={editBtn} />
        </div>
      </div>
      <div
        className="ArtSelection__energy smallBtn-text"
        onClick={() => go("payEnergy")}
      >
        <EnergySvg width={"20px"} height={"20px"} />
        100
      </div>
    </div>
  );
}

export default ArtSelectionControls;
