import React, { useState, useEffect } from "react";
import checkMark from "img/check-mark.png";

function StylesItem({ style, category, setChosenStyles, chosenStyles }) {
  const [state, setState] = useState("");

  // Function to select only one genre
  useEffect(() => {
    if (category == "genre") {
      if (chosenStyles.genre?.sub_name == style.sub_name) {
        setState("styles__item_active");
      } else {
        setState("");
      }
    }
  }, [chosenStyles]);

  // Function to select style
  const handleStyle = (event) => {
    let copy = Object.assign({}, chosenStyles);

    if (!state) {
      setState("styles__item_active");
      if (category == "genre") {
        copy[category] = style;
      } else {
        let mass = copy[category] ? copy[category] : [];
        mass.push(style);
        copy[category] = mass;
      }
    } else {
      setState("");
      if (category != "genre") {
        console.log(copy[category]);
        for (let i = 0; i < copy[category].length; i++) {
          if (copy[category][i].sub_name == style.sub_name) {
            copy[category].splice(i, 1);
          }
        }
      }
    }
    setChosenStyles(copy);
  };

  return (
    <div
      className={`styles__item ${state}`}
      onClick={handleStyle}
      key={style.sub_name}
    >
      <div className="styles__imgWrap">
        <img className="styles__img" src={style.url} />
        <img className="styles__checkMark" src={checkMark} />
      </div>
      <div className="styles__title">{style.sub_name}</div>
    </div>
  );
}

export default StylesItem;
