import twoArrow from "assets/img/twoArrow.svg";
import LikeSvg from "components/common/LikeSvg";
import ContestPrizesItems from "./ContestPrizesItems";

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
      <div className="ContestPrizes">
        <ContestPrizesItems
          activeContest={activeContest}
          handleStopPropagation={handleStopPropagation}
        />
      </div>

      {activeContest.type !== "ended" && (
        <>
          <div className="ContestPrize__fullDelimetr"></div>
          <div className="ContestPrize__voting">
            {activeContest.type == "vote" ? (
              <>
                <LikeSvg full="true" />
                <span className="ContestPrize__voting_text">
                  Ставь лайк, чтобы определить победителя
                </span>
              </>
            ) : (
              <>
                <div className="ContestPrize__plug"></div>
                <a
                  className="ContestPrize__voting_text underline text_accented"
                  onClick={handleContestParticipate}
                >
                  Принять участие в конкурсе
                </a>
              </>
            )}
            <img src={twoArrow} className={`${!time && "rotateImg"}`} />
          </div>
        </>
      )}
      {
        <div className="ContestItem__date transparentBlock">
          {activeContest.type == "workAcceptance"
            ? "Прием работ "
            : activeContest.type == "vote"
            ? "Голосование "
            : "Конкурс "}
          {activeContest.type == "ended" ? "закончился" : "до 18 июля"}
        </div>
      }
    </div>
  );
}

export default ContestPrizes;
