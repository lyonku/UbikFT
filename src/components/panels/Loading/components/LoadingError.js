import closeBtn from "assets/img/close-btn.svg";

function LoadingError({ handleArtGenerate }) {
  return (
    <div className="Loading__wrap">
      <div className="Header__controls">
        <div
          className="payEnergy__closeBtn closeBtn Loading__close"
          onClick={() => {
            window.history.back();
          }}
        >
          <img src={closeBtn} />
        </div>
      </div>

      <div className="Loading__title title">Сервер перегружен</div>
      <div className="Loading__text text">
        Вы можете помочь написав, в сообщество <br />
        <a href="https://vk.com/vkappsdev" target="_blank">
          VK Mini apps
        </a>{" "}
        примерно следующее:
        <br /> Выделите мощный сервер Убик 🚀
      </div>

      <div
        className="Loading__errorBtn"
        onClick={() => {
          handleArtGenerate();
        }}
      >
        Повторить попытку
      </div>
    </div>
  );
}

export default LoadingError;
