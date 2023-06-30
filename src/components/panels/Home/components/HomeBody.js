function HomeBody({ currentModel, handleModel, go }) {
  return (
    <div className="home__body">
      <div className="home__title title">
        Выберите модель <span className="text_accented">ИИ</span>
      </div>
      <div className="home__row">
        <div
          className={`models-item ${
            currentModel == "Rev Anim" && "models-item_active"
          }`}
          onClick={handleModel}
        >
          <input
            type="radio"
            id="Rev Anim"
            name="models"
            className="models-item__radio"
            defaultChecked
          ></input>
          <label htmlFor="Rev Anim">
            <div className="models-item__title mini-title">Общий</div>
            <div className="models-item__text text">Rev Anim</div>
          </label>
        </div>
        <div
          className={`models-item ${
            currentModel == "Counterfeit" && "models-item_active"
          }`}
          onClick={handleModel}
        >
          <input
            type="radio"
            id="Counterfeit"
            name="models"
            className="models-item__radio"
          ></input>
          <label htmlFor="Counterfeit">
            <div className="models-item__title mini-title">Аниме</div>
            <div className="models-item__text text">Counterfeit</div>
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
