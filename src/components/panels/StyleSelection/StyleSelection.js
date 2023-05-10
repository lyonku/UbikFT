import React, { useState, useContext, useRef, useEffect } from "react";
import "./StyleSelection.css";

import StyleSelectionHeader from "./components/StyleSelectionHeader";
import StyleSelectionTitle from "./components/StyleSelectionTitle";
import StyleSelectionBody from "./components/StyleSelectionBody";
import StyleSelectionCreateBtn from "./components/StyleSelectionCreateBtn";
import { View, Panel } from "@vkontakte/vkui";

import { MainContext } from "components/shared/providers/MainProvider";

const StyleSelection = ({ id }) => {
  const {
    inputValue,
    chosenStyles,
    setChosenStyles,
    goBack,
    history,
    goToPage,
    onStoryChange,
    handleArtGenerate,
  } = useContext(MainContext);

  const [error, setError] = useState(false);
  const scrollToTopRef = useRef(null); // создаем ref

  function handleScrollToTop() {
    scrollToTopRef.current.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <Panel id={id}>
      <div className="styleSelection" ref={scrollToTopRef}>
        <div className="gradient-round"></div>
        <div className="styleSelection__wrap">
          <StyleSelectionHeader
            go={goToPage}
            goBack={goBack}
            history={history}
          />
          <StyleSelectionTitle
            go={goToPage}
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
    </Panel>
  );
};

export default StyleSelection;
