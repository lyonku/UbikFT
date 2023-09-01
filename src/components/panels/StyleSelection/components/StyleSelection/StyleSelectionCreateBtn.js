import EnergySvg from "components/common/svgs/energySvg";
import { MainContext, PopoutContext } from "components/shared/providers";
import { useContext } from "react";

function StyleSelectionCreateBtn({ setError, handleScrollToTop }) {
  const { inputValue, chosenStyles, modePro } = useContext(MainContext);
  const { handleSetArtCountPopout } = useContext(PopoutContext);

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
