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

  const dataCurrent = {
    "Digital painting": [
      "videogame cover art",
      "concept art",
      "hyperrealism",
      "surrealism",
      "warcraft",
      "greg rutkowski",
      "artgerm",
      "Frank Frazetta",
    ],
    "comics book art": [
      "old disney",
      "cartoon",
      "artgerm",
      "neal adams",
      "hayao miyazaki",
      "makoto sninkai",
    ],
  };

  return (
    <div className={`styleSelection__body`}>
      {data.map((category, categoryIndex) => {
<<<<<<< HEAD:src/components/panels/StyleSelection/components/StyleSelection/StyleSelectionBody.js
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
=======
        if (category.title == "genre" || chosenStyles.genre) {
          return (
            <div
              className={`styleСategory__wrap ${
                error &&
                category.title == "genre" &&
                "animate__animated animate__shakeX"
              }`}
              key={category.title}
>>>>>>> 5754305a7c5e0553411fae854cec52a52f8ab576:src/components/panels/StyleSelection/components/StyleSelectionBody.js
            >
              <div className="styleСategory__title">
                <span>{category.name}</span>
                {chosenStyles[category.title]?.length >= 1 &&
                category.title !== "genre" ? (
                  <div className="styleСategory__chips">
                    <span>{chosenStyles[category.title]?.length}</span>
                    <img
                      src={closeBtn}
                      onClick={() => handleClearStyles(category.title)}
                    />
                  </div>
                ) : null}
              </div>
              {chosenStyles.genre ? (
                <HorizontalScroll
                  showArrows
                  getScrollToLeft={(i) => i - 220}
                  getScrollToRight={(i) => i + 220}
                  color="#b0e822"
                >
                  <div className="styleСategory__row">
                    {category.array.map((style, styleIndex) => {
                      if (
                        category.title == "genre" ||
                        category.title == "setting" ||
                        dataCurrent[chosenStyles.genre[0].sub_title]?.includes(
                          style.sub_title
                        )
                      ) {
                        return (
                          <StylesItem
                            key={styleIndex}
                            style={style}
                            category={category.title}
                            setChosenStyles={setChosenStyles}
                            chosenStyles={chosenStyles}
                          />
                        );
                      }
                    })}
                  </div>
                </HorizontalScroll>
              ) : (
                <div className="styleСategory__block">
                  {category.array.map((style, styleIndex) => {
                    if (category.title == "genre") {
                      return (
                        <StylesItem
                          key={styleIndex}
                          style={style}
                          category={category.title}
                          setChosenStyles={setChosenStyles}
                          chosenStyles={chosenStyles}
                        />
                      );
                    }
                  })}
                </div>
              )}
            </div>
          );
        }
      })}
    </div>
  );
}

export default StyleSelectionBody;
