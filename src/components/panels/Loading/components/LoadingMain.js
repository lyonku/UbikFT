import RoundLoader from "components/common/roundLoader";

function LoadingMain() {
  return (
    <div className="Loading__wrap">
      <div className="Loading__title title">
        Ваш арт <br />
        <span className="text_accented">генерируется</span>
        <div className="dot-flashing"></div>
      </div>

      <RoundLoader />
      <div className="Loading__desc text">
        Обычно генерация занимает 7 секунд
      </div>
    </div>
  );
}

export default LoadingMain;
