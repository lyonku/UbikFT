import backBtn from "assets/img/back-btn.svg";
import EnergySvg from "components/common/energySvg";

function ContestControls({ router }) {
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

      <div
        className="Contest__energy transparentBlock_blur"
        onClick={() => router.toView("payEnergy")}
      >
        <EnergySvg width={"20px"} height={"20px"} />
        100
      </div>
    </div>
  );
}

export default ContestControls;
