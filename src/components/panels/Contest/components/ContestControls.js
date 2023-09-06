import backBtn from "assets/img/back-btn.svg";
import checkMark from "assets/img/check-mark.svg";
import EnergySvg from "components/common/svgs/energySvg";
import HeartSvg from "components/common/svgs/heartSvg";
import { MainContext } from "components/shared/providers";
import { useContext } from "react";

function ContestControls() {
  const { router, userData, activeContest, approveContest, exitPage } =
    useContext(MainContext);

  return (
    <div className="Contest__controls Header__controls">
      <div
        className="inquiry__controls_closeBtn roundBtn_blur"
        onClick={() => {
          exitPage("contest");
        }}
      >
        <img src={backBtn} />
      </div>
      <div className="styleSelection__header_rightSide">
        {activeContest.type === "pre-ended" && (
          <div
            className="transparentBlock_blur approveContest"
            onClick={() => approveContest(activeContest.id)}
          >
            <img src={checkMark} />
          </div>
        )}

        <div
          className="styleSelection__rating smallBtn-text"
          onClick={() => router.toView("Rating")}
        >
          <HeartSvg width={"32px"} height={"32px"} />
          {userData.rating ?? "..."}
        </div>
        <div
          className="Contests__energy transparentBlock_blur"
          onClick={() => router.toView("payEnergy")}
        >
          <EnergySvg width={"32px"} height={"32px"} />
          {userData.energy ?? "..."}
        </div>
      </div>
    </div>
  );
}

export default ContestControls;
