import data from "data.json";
import { HorizontalScroll } from "@vkontakte/vkui";
import StylesItem from "./StylesItem";
import closeBtn from "assets/img/close-btn.svg";

function StyleSelectionBody({ chosenStyles, error, setChosenStyles }) {
  const handleClearStyles = (category) => {
    let copy = { ...chosenStyles };
    copy[category] = [];
    setChosenStyles(copy);
  };

  return (
    <div className={`styleSelection__body`}>
      {data.map((category, categoryIndex) => {
        return (
          <div
            className={`styleСategory__wrap ${
              error &&
              category.title == "genre" &&
              (!chosenStyles.genre || chosenStyles?.genre?.length < 1) &&
              "animate__animated animate__shakeX"
            }`}
            key={category.title}
          >
            <div className="styleСategory__title">
              <span>{category.name}</span>
            </div>
            <HorizontalScroll
              showArrows
              getScrollToLeft={(i) => i - 220}
              getScrollToRight={(i) => i + 220}
              color="#b0e822"
            >
              <div className="styleСategory__row">
                {category.array.map((style, styleIndex) => {
                  return (
                    <StylesItem
                      key={styleIndex}
                      style={style}
                      category={category.title}
                      setChosenStyles={setChosenStyles}
                      chosenStyles={chosenStyles}
                    />
                  );
                })}
              </div>
            </HorizontalScroll>
          </div>
        );
      })}
    </div>
  );
}

export default StyleSelectionBody;
