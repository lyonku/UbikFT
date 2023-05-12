function HomeBody({ currentModel, handleModel, go }) {
  return (
    <div className="home__body">
      <div className="home__title title">
        Выберите модель <span className="text_accented">ИИ</span>
      </div>
      <div className="home__row">
        <div
          className={`models-item ${
            currentModel == "Protogen" && "models-item_active"
          }`}
          onClick={handleModel}
        >
          <input
            type="radio"
            id="Protogen"
            name="models"
            className="models-item__radio"
            defaultChecked
          ></input>
          <label htmlFor="Protogen">
            <div className="models-item__title mini-title">Люди</div>
            <div className="models-item__text text">Protogen</div>
          </label>
        </div>
        <div
          className={`models-item ${
            currentModel == "Anything" && "models-item_active"
          }`}
          onClick={handleModel}
        >
          <input
            type="radio"
            id="Anything"
            name="models"
            className="models-item__radio"
          ></input>
          <label htmlFor="Anything">
            <div className="models-item__title mini-title">Аниме</div>
            <div className="models-item__text text">Anything</div>
          </label>
        </div>
        <div
          className={`models-item ${
            currentModel == "Vintedois" && "models-item_active"
          }`}
          onClick={handleModel}
        >
          <input
            type="radio"
            id="Vintedois"
            name="models"
            className="models-item__radio"
          ></input>
          <label htmlFor="Vintedois">
            <div className="models-item__title mini-title">Общий</div>
            <div className="models-item__text text">Vintedois</div>
          </label>
        </div>
      </div>
      <div
        className="home__btn btn"
        onClick={() => go()}
      >{`Выбрать ${currentModel}`}</div>
    </div>
  );
}

export default HomeBody;
