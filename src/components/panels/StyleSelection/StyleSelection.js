import React, { useState, useEffect, useRef } from "react";
import "./StyleSelection.css";

import StyleSelectionHeader from "./components/StyleSelectionHeader";
import StyleSelectionTitle from "./components/StyleSelectionTitle";
import StyleSelectionBody from "./components/StyleSelectionBody";
import StyleSelectionCreateBtn from "./components/StyleSelectionCreateBtn";

const StyleSelection = ({
  id,
  go,
  inputValue,
  handleArtGenerate,
  setChosenStyles,
  chosenStyles,
  goBack,
  history,
}) => {
  const [error, setError] = useState(false);
  const scrollToTopRef = useRef(null); // создаем ref

  function handleScrollToTop() {
    scrollToTopRef.current.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    if (!inputValue) {
      goBack(1);
    }
  }, []);

  return (
    <div className="styleSelection" ref={scrollToTopRef}>
      <div className="styleSelection__wrap">
        <StyleSelectionHeader go={go} goBack={goBack} history={history} />
        <StyleSelectionTitle
          go={go}
          inputValue={inputValue}
          history={history}
        />
        <StyleSelectionBody
          chosenStyles={chosenStyles}
          error={error}
          setChosenStyles={setChosenStyles}
        />
        <StyleSelectionCreateBtn
          chosenStyles={chosenStyles}
          setError={setError}
          handleScrollToTop={handleScrollToTop}
          handleArtGenerate={handleArtGenerate}
        />
      </div>
    </div>
  );
};

export default StyleSelection;
