function ChestPrizes() {
  return (
    <div className="InfoPopout" ref={ref}>
      <div className="InfoPopout__controls">
        <img src={closeImg} onClick={() => router.toBack()} />
      </div>
      <div className="InfoPopout__title ">Призы:</div>
    </div>
  );
}

export default ChestPrizes;
