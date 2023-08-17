import EnergySvg from "components/common/svgs/energySvg";
import HeartSvg from "components/common/svgs/heartSvg";
function ContestsControls({ router, userData }) {
  return (
    <div className="Contests__controls Header__controls">
      <span className="Contests__title title_h2-32px">Конкурсы</span>

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

export default ContestsControls;
