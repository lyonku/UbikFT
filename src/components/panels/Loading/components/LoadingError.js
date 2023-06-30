import closeBtn from "assets/img/close-btn.svg";

function LoadingError({ handleArtGenerate, router }) {
  return (
    <div className="Loading__wrap">
      <div className="Header__controls">
        <div
          className="payEnergy__closeBtn closeBtn Loading__close"
          onClick={() => {
            router.toBack();
          }}
        >
          <img src={closeBtn} />
        </div>
      </div>
<<<<<<< HEAD
      <div className="Loading__body">
        <div className="Loading__title title">Сервер перегружен</div>
        <div
          className="Loading__errorBtn"
          onClick={() => {
            router.toBack();
            handleArtGenerate();
          }}
        >
          Повторить попытку
        </div>
=======

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
          router.toBack();
          handleArtGenerate();
        }}
      >
        Повторить попытку
>>>>>>> 5754305a7c5e0553411fae854cec52a52f8ab576
      </div>
    </div>
  );
}

export default LoadingError;
