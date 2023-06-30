function ContestFilters({ activeFilter, handleChangeFilter }) {
  return (
    <div className="Contests__filters">
      <div
        className={`Contests__filter ${
<<<<<<< HEAD
=======
          activeFilter == "all" && "Contests__filter_active"
        }`}
        id="all"
        onClick={handleChangeFilter}
      >
        Все
      </div>
      <div
        className={`Contests__filter ${
>>>>>>> 5754305a7c5e0553411fae854cec52a52f8ab576
          activeFilter == "workAcceptance" && "Contests__filter_active"
        }`}
        id="workAcceptance"
        onClick={handleChangeFilter}
      >
        Прием работ
      </div>
      <div
        className={`Contests__filter ${
          activeFilter == "vote" && "Contests__filter_active"
        }`}
        id="vote"
        onClick={handleChangeFilter}
      >
        Голосование
      </div>
      <div
        className={`Contests__filter ${
          activeFilter == "ended" && "Contests__filter_active"
        }`}
        id="ended"
        onClick={handleChangeFilter}
      >
        Закончились
      </div>
    </div>
  );
}

export default ContestFilters;
