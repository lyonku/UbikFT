import closeBtn from "assets/img/close-btn.svg";

function LoadingError({ handleSetArtCountPopout, goReplace, goBack }) {
  return (
    <div className="Loading__wrap">
      <div className="Header__controls">
        <div
          className="payEnergy__closeBtn closeBtn Loading__close"
          onClick={() => {
            goReplace("/main");
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
            handleSetArtCountPopout({ from: "loadingError" });
          }}
        >
          Повторить попытку
        </div>
      </div>
    </div>
  );
}

export default LoadingError;
