import React, { useState, useEffect } from "react";
import TonLogo from "assets/img/TonLogo.svg";
import LikeSvg from "components/common/LikeSvg";
import twoArrow from "assets/img/twoArrow.svg";
import ContestPrizes from "components/panels/Contest/components/ContestPrizes";

function ContestItem({
  data,
  router,
  setActiveContest,
  getTimeUntilDate,
  handleInfoPopout,
}) {
  const date = new Date(+data.date);
  var currentDate = new Date();

  const [time, setTime] = useState("");

  var options = {
    month: "long",
    day: "numeric",
    timezone: "UTC",
  };

  const handleEventInfoPopout = (event) => {
    handleInfoPopout();
    event.stopPropagation();
  };

  const navigateToContestPanel = () => {
    router.toPanel("contest");
    setActiveContest(data);
  };

  useEffect(() => {
    var oneDay = 24 * 60 * 60 * 1000; // количество миллисекунд в одном дне
    var timeDiff = date.getTime() - currentDate.getTime();

    if (timeDiff < oneDay) {
      setTime(` осталось ${getTimeUntilDate(date)}`);
    } else {
      setTime(` до ${date.toLocaleString("ru", options)}`);
    }
  }, []);

  return (
    <div
      className="ContestsItem"
      style={{
        background: `linear-gradient(180deg, rgba(10, 10, 10, 0) 0%, #0A0A0A 100%), no-repeat center/cover url(${data.img})`,
      }}
      onClick={() => {
        navigateToContestPanel();
      }}
    >
      <div className="ContestsItem__wrap">
        <div className="ContestsItem__header">
          <div
            className="ContestsItem__rules transparentBlock"
            onClick={handleEventInfoPopout}
          >
            Правила
          </div>
        </div>

        <div className="ContestsItem__body">
          <div className="ContestsItem__title title_h3-24px">{data.name}</div>
          <div className="ContestsItem__desc text_gray">{data.desc}</div>
          <ContestPrizes activeContest={data} time={false} router={router} />
        </div>
      </div>
    </div>
  );
}

export default ContestItem;
