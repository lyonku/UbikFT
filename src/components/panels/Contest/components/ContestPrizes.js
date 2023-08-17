import ozonLogo from "assets/img/ozonLogo.svg";
import TonLogo from "assets/img/TonLogo.svg";

function ContestPrizes({ activeContest, router, time }) {
  const handleStopPropagation = (event) => {
    event.stopPropagation();
  };

  const handleContestParticipate = (event) => {
    event.stopPropagation();
    router.toView("main");
  };

  return (
    <div className="ContestPrize roundedBlock_greenBroder">
      <div className="ContestPrize__title title_h4-18px">Призы в конкурсе</div>
      <div className="ContestPrize__list ended">
        {activeContest.prizes.map((item, index) => {
          return (
            <div key={index}>
              <div className="ContestPrize__item">
                <div className="ContestPrize__place">
                  <div className="ContestPrize__place_num first">
                    {index + 1}
                  </div>
                  <div className="ContestPrize__place_text">место</div>
                </div>
                <img src={item.img} className="ContestPrize__img" />
                <div className="ContestPrize__text">
                  {item.winner && (
                    <div className="ContestPrize__profileName">
                      {item.winner}
                    </div>
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
        {activeContest.type == "workAcceptance"
          ? "Идет прием работ: "
          : activeContest.type == "vote"
          ? "Идет голосование: "
          : "Конкурс "}
        {activeContest.type == "ended" ? "закончился" : time}
      </div>
    </div>
  );
}

export default ContestPrizes;
