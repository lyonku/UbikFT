import React, { useState, useRef } from "react";
import checkMark from "img/check-mark.png";

function StylesItem({ style }) {
  const [state, setState] = useState("");
  const handleStyle = (event) => {
    if (!state) {
      setState("styles__item_active");
    } else {
      setState("");
    }
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
