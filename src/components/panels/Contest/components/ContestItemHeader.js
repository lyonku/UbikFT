function ContestItemHeader({ activeContest, time }) {
  return (
    <div className="ContestItem__header">
      <div className="ContestItem__title title_h2-32px">
        {activeContest.name}
      </div>
      <div className="ContestItem__desc text_gray">{activeContest.desc}</div>
      {/* <div className="ContestItem__date transparentBlock">
        {activeContest.type == "workAcceptance"
          ? "Прием работ"
          : activeContest.type == "vote"
          ? "Голосование"
          : "Конкурс"}
        <span className="text_accented">
          {activeContest.type == "ended" ? " закончился" : time}
        </span>
        <div>
          {activeContest.type == "workAcceptance"
            ? "Создайте тематический арт, и отправьте его на конкурс"
            : ""}
        </div>
      </div> */}
    </div>
  );
}

export default ContestItemHeader;
