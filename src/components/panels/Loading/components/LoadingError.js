import closeBtn from "assets/img/close-btn.svg";

function LoadingError({ handleSetArtCountPopout, router }) {
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
      <div className="Loading__body">
        <div className="Loading__title title">Сервер перегружен</div>
        <div
          className="Loading__errorBtn"
          onClick={() => {
            router.toBack();
            handleSetArtCountPopout();
          }}
        >
          Повторить попытку
        </div>
      </div>
    </div>
  );
}

export default LoadingError;
