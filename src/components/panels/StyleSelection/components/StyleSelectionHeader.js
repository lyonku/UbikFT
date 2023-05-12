import backBtn from "assets/img/back-btn.svg";
import EnergySvg from "components/common/energySvg";

function StyleSelectionHeader({ router }) {
  return (
    <div className="styleSelection__header">
      <div
        className="styleSelection__modelSwitch smallBtn-text"
        onClick={() => {
          router.toBack();
          router.toBack();
        }}
      >
        <img src={backBtn} />
        Изменить модель
      </div>
      <div
        className="styleSelection__energy smallBtn-text"
        onClick={() => router.toView("payEnergy")}
      >
        <EnergySvg width={"20px"} height={"20px"} />
        100
      </div>
    </div>
  );
}

export default StyleSelectionHeader;
