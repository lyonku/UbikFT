import TonLogo from "assets/img/TonLogo.svg";
import twoArrow from "assets/img/twoArrow.svg";
import TONlogo from "assets/img/TONlogo2.svg";
import LikeSvg from "components/common/LikeSvg";

function ContestPrizes({ activeContest }) {
  return (
    <div className="ContestPrize roundedBlock_greenBroder">
      <div className="ContestPrizes">
        <div className="ContestPrizes__item">
          {activeContest.type == "ended" ? (
            activeContest.price ? (
              <div className="ContestPrizes__item">
                <div className="ContestPrize__logo">
                  <img src={TonLogo} />
                </div>

                <div className="ContestsItemPrize__title title_h4-18px">
                  NFT выпущено на{" "}
                  <span className="text_accented underline">GetGems</span>
                  <br />
                  {`Аукцион завершен, `}
                  <br />
                  {`работа продана за ${activeContest.price} `}
                  <img src={TONlogo} /> {` (29 766 ₽)`}
                </div>
              </div>
            ) : (
              <div className="ContestPrizes__item">
                <div className="ContestPrize__logo">
                  <img src={TonLogo} />
                </div>

                <div className="ContestsItemPrize__title title_h4-18px">
                  NFT выпущено на{" "}
                  <span className="text_accented underline">GetGems</span>
                  <br />
                  Проводится аукцион
                </div>
              </div>
            )
          ) : (
            <div className="ContestPrizes__item">
              <div className="ContestPrize__logo">
                <img src={TonLogo} />
              </div>
              <div className="ContestsItemPrize__title title_h4-18px">
                Приз <span className="text_accented"> за 1 место</span>
                <br />
                Выпуск NFT на{" "}
                <a
                  href="https://getgems.io/"
                  target="_blank"
                  className="text_accented underline"
                >
                  GetGems
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="ContestPrize__rules">
          Участие в творческом конкурсе <span>бесплатное</span>. <br />
          {activeContest.type == "workAcceptance" &&
            "Если ваша работа нарушает закон и/или нормы этики, то она не будет допущена до участия в конкурсе."}
        </div>
      </div>
      {activeContest.type == "vote" && (
        <>
          <div className="ContestPrize__fullDelimetr"></div>
          <div className="ContestPrize__voting">
            <LikeSvg full="true" />
            <span className="ContestPrize__voting_text">
              Ставь лайк, чтобы определить победителя
            </span>
            <img src={twoArrow} />
          </div>
        </>
      )}
    </div>
  );
}

export default ContestPrizes;
