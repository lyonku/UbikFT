import { ContestsContext, MainContext } from "components/shared/providers";
import { useContext, useEffect, useState } from "react";

function ContestPrizes({ activeContest }) {
  const [time, setTime] = useState("");
  const { updateContestTime, updateContest } = useContext(ContestsContext);

  useEffect(() => {
    setTime(updateContestTime(+activeContest[activeContest.type + "Date"]));

    const intervalId = setInterval(() => {
      setTime(updateContestTime(+activeContest[activeContest.type + "Date"]));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [updateContest, activeContest]);

  const getContestStatusText = (contest, time) => {
    switch (contest.type) {
      case "workAcceptance":
        return `Идет прием работ: ${time}`;
      case "vote":
        return `Идет голосование: ${time}`;
      case "ended":
        return `Конкурс закончился`;
      case "pre-ended":
        return `Идет подсчёт работ`;
      default:
        break;
    }
  };

  return (
    <div className="ContestPrize roundedBlock_greenBroder">
      <div className="ContestPrize__title title_h4-18px">Призы в конкурсе</div>
      <div className="ContestPrize__list ended">
        {activeContest?.prizes?.map((item, index) => {
          return (
            <div key={index}>
              <div className="ContestPrize__item">
                <div className="ContestPrize__place">
                  <div className={`ContestPrize__place_num `}>{index + 1}</div>
                  <div className="ContestPrize__place_text">место</div>
                </div>
                <img src={item.img} className="ContestPrize__img" />
                <div className="ContestPrize__text">
                  {item.winner.vk_user_id ? (
                    <a
                      className={`ContestPrize__profileName first`}
                      href={`https://vk.com/id${item.winner.vk_user_id}`}
                      target="_blank"
                    >
                      {item.winner?.name + " " + item.winner?.surname}
                    </a>
                  ) : (
                    ""
                  )}
                  <div className="ContestPrize__prizeName">{item.name}</div>
                </div>
              </div>
              {index + 1 != activeContest.prizes.length && (
                <div className="ContestPrize__fullDelimetr"></div>
              )}
            </div>
          );
        })}
      </div>
      <div className="ContestItem__date transparentBlock">
        {getContestStatusText(activeContest, time)}
      </div>
    </div>
  );
}

export default ContestPrizes;
