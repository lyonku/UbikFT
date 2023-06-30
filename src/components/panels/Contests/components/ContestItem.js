import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import TonLogo from "assets/img/TonLogo.svg";
=======
import OzonLogo from "assets/img/OzonLogo.svg";
>>>>>>> 5754305a7c5e0553411fae854cec52a52f8ab576

function ContestItem({ data, router, setActiveContest, getTimeUntilDate }) {
  const date = new Date(+data.date);
  var currentDate = new Date();

  const [time, setTime] = useState("");

  var options = {
    month: "long",
    day: "numeric",
    timezone: "UTC",
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
        background: `no-repeat center/cover url(${data.img})`,
      }}
      onClick={() => {
        router.toPanel("contest");
        setActiveContest(data);
      }}
    >
      <div className="ContestsItem__wrap">
        <div className="ContestsItem__header">
          <div className="ContestsItem__date transparentBlock">
            {data.type == "workAcceptance"
              ? "Прием работ"
              : data.type == "vote"
              ? "Голосование"
              : "Конкурс"}
            <span className="text_accented">
              {data.type == "ended" ? " закончился" : time}
            </span>
          </div>
        </div>

        <div className="ContestsItem__body">
          <div className="ContestsItem__title title_h3-24px">{data.name}</div>
          <div className="ContestsItem__desc text_gray">{data.desc}</div>
          <div className="ContestsItemPrize roundedBlock_greenBroder">
            <div className="ContestsItemPrize__logo">
<<<<<<< HEAD
              <img src={TonLogo} />
=======
              <img src={OzonLogo} />
>>>>>>> 5754305a7c5e0553411fae854cec52a52f8ab576
            </div>
            <div className="ContestsItemPrize__title title_h4-18px">
              Приз <span className="text_accented"> за 1 место</span>
              <br />
<<<<<<< HEAD
              Выпуск NFT на <span className="text_accented">GetGems</span>
=======
              сертификат <span className="text_accented">100000₽</span>
>>>>>>> 5754305a7c5e0553411fae854cec52a52f8ab576
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContestItem;
