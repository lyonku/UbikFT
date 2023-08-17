import backBtn from "assets/img/back-btn.svg";
import EnergySvg from "components/common/svgs/energySvg";
import HeartSvg from "components/common/svgs/heartSvg";

function ContestControls({ router, userData }) {
  return (
    <div className="Contest__controls Header__controls">
      <div
        className="inquiry__controls_closeBtn roundBtn_blur"
        onClick={() => {
          router.toBack();
        }}
      >
        <img src={backBtn} />
      </div>
      <div className="styleSelection__header_rightSide">
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
