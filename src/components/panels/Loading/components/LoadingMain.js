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
        Обычно это занимает 15 секунд, но вы можете написать команде{" "}
        <a href="https://vk.com/vkappsdev" target="_blank">
          VK Mini apps
        </a>{" "}
        и попросить мощный сервер для нашего проекта. Спасибо :)
      </div>
    </div>
  );
}

export default LoadingMain;
