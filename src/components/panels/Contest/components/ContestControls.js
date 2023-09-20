import backBtn from "assets/img/back-btn.svg";
import HeaderControls from "components/common/HeaderControls";
import { ContestsContext, MainContext } from "components/shared/providers";
import { useContext } from "react";

function ContestControls() {
  const { go } = useContext(MainContext);
  const { setActiveContest } = useContext(ContestsContext);

  return (
    <div className="Contest__controls Header__controls">
      <div
        className="inquiry__controls_closeBtn roundBtn_blur"
        onClick={() => {
          go("/contests");
          setTimeout(() => {
            setActiveContest({});
          }, 100);
        }}
      >
        <img src={backBtn} />
      </div>
      <div className="styleSelection__header_rightSide">
        <HeaderControls />
      </div>
    </div>
  );
}

export default ContestControls;
