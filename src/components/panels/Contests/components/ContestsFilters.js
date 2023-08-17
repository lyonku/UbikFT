function ContestsFilters({ activeFilter, handleChangeFilter }) {
  return (
    <div className="Contests__filters">
      <div
        className={`Contests__filter ${
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
          (activeFilter == "ended" || activeFilter == "pre-ended") &&
          "Contests__filter_active"
        }`}
        id="ended"
        onClick={handleChangeFilter}
      >
        Закончились
      </div>
    </div>
  );
}

export default ContestsFilters;
