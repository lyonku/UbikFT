import TonLogo from "assets/img/TonLogo.svg";
import TonSymbol from "assets/img/ton_symbol.svg";

function ContestPrizes__item({ activeContest, handleStopPropagation }) {
  let title = "";
  let link = "GetGems";
  let subTitle = "";

  switch (activeContest.type) {
    case "ended":
      if (activeContest.price) {
        title = "NFT продан на ";
        link = `GetGems за ${activeContest.price}`;
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
            {link}
            {activeContest.price && (
              <>
                <img src={TonSymbol} className="TonSymbol" />
              </>
            )}
          </a>
          {subTitle}
        </div>
      </div>
    </div>
  );
}

export default ContestPrizes__item;
