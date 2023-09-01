import React, { useState, useEffect } from "react";
import checkMark from "assets/img/check-mark.svg";
import { Skeleton } from "antd";
import { Blurhash } from "react-blurhash";

function StylesItem({ style, category, setChosenStyles, chosenStyles }) {
  const [state, setState] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
    };
    img.src = style.url;
  }, []);

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
      // if (category == "genre" || category == "setting") {
      copy[category] = [style];
      // } else {
      //   let mass = copy[category] ? copy[category] : [];
      //   mass.push(style);
      //   copy[category] = mass;
      // }
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
        <div
          style={{ display: imageLoaded ? "none" : "block", height: "110px" }}
        >
          <Blurhash
            hash={style?.blurHash}
            width={110}
            height={110}
            resolutionX={32}
            resolutionY={32}
            punch={1}
          />
        </div>
        <Skeleton.Avatar
          active
          style={{
            display: imageLoaded ? "none" : "inline-block",
            height: "110px",
            width: "110px",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 999,
          }}
        />
        <img
          className="styles__img"
          src={style.url}
          style={{ display: !imageLoaded ? "none" : "block" }}
        />
        <img className="styles__checkMark" src={checkMark} />
      </div>
      <div className="styles__title">{style.sub_name}</div>
    </div>
  );
}

export default StylesItem;
