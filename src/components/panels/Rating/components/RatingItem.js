import EnergySvg from "components/common/svgs/energySvg";
import HeartSvg from "components/common/svgs/heartSvg";
import checkMark from "assets/img/check-mark.svg";
import { Progress } from "antd";

function RatingItem({ item }) {
  return (
    <div className={`RatingItem ${item.complete && "complete"}`}>
      {item.complete && <img src={checkMark} className="RatingItem__img" />}

      <div className="RatingItem__body">
        <div className="RatingItem__title">{item.title}</div>
        {item.maxProgress ? (
          <div className="RatingItem__progress">
            <div className="RatingItem__progressText">{`${item.currentProgress} из ${item.maxProgress}`}</div>
            {item.currentProgress !== item.maxProgress && (
              <Progress
                percent={(item.currentProgress / item.maxProgress) * 100}
                showInfo={false}
                trailColor="#646464"
                strokeColor="#b0e822"
                size={[, 4]}
                className="RatingItem__progressBar"
              />
            )}
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="RatingItem__award">
        <span>{item.reward}</span>
        {item.rewardVal == "energy" ? (
          <EnergySvg width="32px" height="32px" />
        ) : (
          <HeartSvg width={"32px"} height={"32px"} />
        )}
      </div>
    </div>
  );
}

export default RatingItem;
