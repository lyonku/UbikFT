import React, { useState, useEffect } from "react";
import checkMark from "assets/img/check-mark.svg";

function StylesItem({ style, category, setChosenStyles, chosenStyles }) {
  const [state, setState] = useState("");
  // Function to select only one genre
  useEffect(() => {
    if (category == "genre" && chosenStyles?.genre) {
      if (chosenStyles?.genre[0]?.sub_title == style.sub_title) {
        setState("styles__item_active");
      } else {
        setState("");
      }
    } else {
      if (chosenStyles[category]) {
        var cityId = chosenStyles[category].filter(
          (val) => val.sub_title == style.sub_title
        );
        if (cityId.length >= 1) {
          setState("styles__item_active");
        } else {
          setState("");
        }
      }
    }
  }, [chosenStyles]);

  // Function to select style
  const handleStyle = (event) => {
    let copy = Object.assign({}, chosenStyles);

    if (!state) {
      setState("styles__item_active");
      if (category == "genre" || category == "setting") {
        copy[category] = [style];
      } else {
        let mass = copy[category] ? copy[category] : [];
        mass.push(style);
        copy[category] = mass;
      }
    } else {
      setState("");
      if (category != "genre" || category != "setting") {
        for (let i = 0; i < copy[category].length; i++) {
          if (copy[category][i].sub_title == style.sub_title) {
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
      key={style.sub_title}
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
