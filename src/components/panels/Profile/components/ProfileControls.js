import HeartSvg from "components/common/svgs/heartSvg";
import EnergySvg from "components/common/svgs/energySvg";

function ProfileControls({ router, userData }) {
  return (
    <div className="Profile__controls">
      <div
        className="styleSelection__rating smallBtn-text"
        onClick={() => router.toView("Rating")}
      >
        <HeartSvg width={"32px"} height={"32px"} />
        {userData.rating ?? "..."}
      </div>
      <div
        className="Profile__energy smallBtn-text"
        onClick={() => router.toView("payEnergy")}
      >
        <EnergySvg width={"32px"} height={"32px"} />
        {userData.energy ?? "..."}
      </div>
    </div>
  );
}

export default ProfileControls;
