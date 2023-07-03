import TonLogo from "assets/img/TonLogo.svg";
import TonSymbol from "assets/img/ton_symbol.svg";
function ContestPrizesItems({ activeContest, handleStopPropagation }) {
  let title = "";
  let subTitle = "";

  switch (activeContest.type) {
    case "ended":
      if (activeContest.price) {
        title = "NFT продан на ";
        subTitle = ` за ${activeContest.price} `;
      } else {
        title = "NFT выпущен на ";
        subTitle = ``;
      }
      break;
    default:
      title = "Приз за 1 место \r\nВыпуск NFT на ";
      break;
  }

  return (
    <div className="ContestPrizes__item">
      <div className="ContestPrizes__item">
        <div className="ContestPrize__logo">
          <img src={TonLogo} />
        </div>
        <div className="ContestsItemPrize__title title_h4-18px">
          {title}
          <a
            className="text_accented underline"
            href="https://getgems.io/"
            target="_blank"
            onClick={handleStopPropagation}
          >
            GetGems
          </a>
          {subTitle}
          {activeContest.price && <img src={TonSymbol} />}
        </div>
      </div>

      {/* {activeContest.type == "ended" ? (
        activeContest.price ? (
          <div className="ContestPrizes__item">
            <div className="ContestPrize__logo">
              <img src={TonLogo} />
            </div>

            <div className="ContestsItemPrize__title title_h4-18px">
              NFT продан на{" "}
              <a
                className="text_accented underline"
                href="https://getgems.io/"
                target="_blank"
                onClick={handleStopPropagation}
              >
                GetGems
              </a>
              {` за ${activeContest.price} `}
              <img src={TonSymbol} />
            </div>
          </div>
        ) : (
          <div className="ContestPrizes__item">
            <div className="ContestPrize__logo">
              <img src={TonLogo} />
            </div>

            <div className="ContestsItemPrize__title title_h4-18px">
              NFT выпущен на{" "}
              <a
                className="text_accented underline"
                href="https://getgems.io/"
                onClick={handleStopPropagation}
                target="_blank"
              >
                GetGems
              </a>
            </div>
          </div>
        )
      ) : (
        <div className="ContestPrizes__item">
          <div className="ContestPrize__logo">
            <img src={TonLogo} />
          </div>

          <div className="ContestsItemPrize__title title_h4-18px">
            Приз за 1 место
            <br />
            Выпуск NFT на{" "}
            <a
              href="https://getgems.io/"
              target="_blank"
              onClick={handleStopPropagation}
              className="text_accented underline"
            >
              GetGems
            </a>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default ContestPrizesItems;
