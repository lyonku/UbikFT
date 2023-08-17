import EnergySvg from "components/common/svgs/energySvg";

function StyleSelectionCreateBtn({
  chosenStyles,
  setError,
  handleScrollToTop,
  handleSetArtCountPopout,
  inputValue,
  modePro,
}) {
  return (
    <div
      className="createBtn btn"
      onClick={
        (chosenStyles?.genre?.length >= 1 || modePro) && inputValue.length >= 1
          ? () => handleSetArtCountPopout()
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
