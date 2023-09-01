function ContestItem__header({ activeContest }) {
  return (
    <div className="ContestItem__header">
      <div className="ContestItem__title title_h2-32px">
        {activeContest.name}
      </div>
      <div className="ContestItem__desc text_gray">{activeContest.desc}</div>
    </div>
  );
}

export default ContestItem__header;
