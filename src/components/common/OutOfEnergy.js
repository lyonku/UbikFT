import outOfEnergyImg from "assets/img/outOfEnergyImg.png";
import { MainContext } from "components/shared/providers";
import { useContext } from "react";

function OutOfEnergy() {
  const { go } = useContext(MainContext);
  return (
    <div className={`ArtCount__wrap outOfEnergy`}>
      <div className="outOfEnergy__img_wrap">
        <img src={outOfEnergyImg} className="outOfEnergy__img" />
      </div>
      <div className="ArtCount__title title_h2-32px">
        Вы исчерпали <br />
        весь запас энергии
      </div>
      <div
        className={`ArtCount__btn btn`}
        onClick={() => {
          go("/store");
        }}
      >
        Купить энергию
      </div>
    </div>
  );
}

export default OutOfEnergy;
