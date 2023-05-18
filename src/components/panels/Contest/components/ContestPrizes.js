import OzonLogo from "assets/img/OzonLogo.svg";
import NftCreate from "assets/img/NftCreate.svg";
import plus from "assets/img/plus.svg";
import twoArrow from "assets/img/twoArrow.svg";
import LikeSvg from "components/common/LikeSvg";

function ContestPrizes({ participation }) {
  return (
    <div className="ContestPrize roundedBlock_greenBroder">
      <div className="ContestPrize__title title_h4-18px">
        Приз <span className="text_accented"> за 1 место</span>
      </div>
      <div className="ContestPrizes">
        <div className="ContestPrizes__item">
          <div className="ContestPrize__logo">
            <img src={OzonLogo} />
          </div>
          <div className="ContestPrize__name ">
            Cертификат на <span className="text_accented">100000₽</span>
          </div>
        </div>
        <div className="ContestPrizes__delimetr">
          <div className="row"></div>
          <img src={plus} />
          <div className="row"></div>
        </div>
        <div className="ContestPrizes__item">
          <div className="ContestPrize__logo">
            <img src={NftCreate} />
          </div>
          <div className="ContestPrize__name ">
            Бесплатный выпуск{" "}
            <span className="text_accented">NFT на OpenSea</span>
          </div>
        </div>
      </div>
      <div className="ContestPrize__rules">
        Участие в творческом конкурсе бесплатное.
        <br />
        <a>Читайте Полные условия конкурса</a>
      </div>
      {participation && <div className="ContestPrize__fullDelimetr"></div>}
      {participation && (
        <div className="ContestPrize__voting">
          <LikeSvg full="true" />
          <span className="ContestPrize__voting">
            Голосуйте за лучшую работу
          </span>
          <img src={twoArrow} />
        </div>
      )}
    </div>
  );
}

export default ContestPrizes;
