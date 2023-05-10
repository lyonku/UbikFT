import closeBtn from "assets/img/close-btn.svg";

import EnergySvg from "components/common/energySvg";
import editBtn from "assets/img/artSelection__edit.svg";

import router from "components/shared/router";

function ArtSelectionControls({ go, goBack, handleClearPrompt }) {
  return (
    <div className="ArtSelection__controls">
      <div className="ArtSelection__firstControls">
        <div
          className="ArtSelection__close smallBtn-text"
          onClick={() => {
            if (router.history[router.history.length - 4].page == "main.home") {
              goBack(3);
            } else {
              go("main.home");
            }
            handleClearPrompt();
            window.history.back();
          }}
        >
          <img src={closeBtn} />
        </div>
        <div
          className="ArtSelection__edit smallBtn-text"
          onClick={() => {
            if (
              router.history[router.history.length - 2].page ==
              "main.styleSelection"
            ) {
              window.history.back();
            } else {
              go("main.styleSelection");
            }
          }}
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
