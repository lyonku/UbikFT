import EnergySvg from "components/common/energySvg";

function StyleSelectionCreateBtn({
  chosenStyles,
  setError,
  handleScrollToTop,
  handleArtGenerate,
}) {
  return (
    <div
      className="createBtn btn"
      onClick={
        chosenStyles?.genre?.length >= 1
          ? () => handleArtGenerate()
          : () => {
              handleScrollToTop();
              setError(true);
              setTimeout(() => {
                setError(false);
              }, 1000);
            }
      }
    >
      Создать арт <div className="createBtn__delimetr"></div>
      <EnergySvg width={"18px"} height={"18px"} color="#FFFFFF" /> 15
    </div>
  );
}

export default StyleSelectionCreateBtn;
