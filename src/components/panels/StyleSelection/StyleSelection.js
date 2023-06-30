import React, { useState, useContext, useRef, useEffect } from "react";
import "./StyleSelection.css";
import "./Inquiry.css";

import StyleSelectionHeader from "./components/StyleSelection/StyleSelectionHeader";
import StyleSelectionTitle from "./components/StyleSelection/StyleSelectionTitle";
import StyleSelectionBody from "./components/StyleSelection/StyleSelectionBody";
import StyleSelectionCreateBtn from "./components/StyleSelection/StyleSelectionCreateBtn";
import { View, Panel } from "@vkontakte/vkui";

import { MainContext } from "components/shared/providers/MainProvider";

const StyleSelection = ({ id }) => {
  const {
    inputValue,
    chosenStyles,
    setChosenStyles,
    router,
    modePro,
    handleArtGenerate,
    handleChangeModePro,
    setInputValue,
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
            router={router}
            modePro={modePro}
            handleChangeModePro={handleChangeModePro}
          />
          <StyleSelectionTitle
            error={error}
            inputValue={inputValue}
            router={router}
            setInputValue={setInputValue}
          />
          {!modePro && (
            <StyleSelectionBody
              chosenStyles={chosenStyles}
              error={error}
              setChosenStyles={setChosenStyles}
            />
          )}
          <StyleSelectionCreateBtn
            chosenStyles={chosenStyles}
            setError={setError}
            handleScrollToTop={handleScrollToTop}
            handleArtGenerate={handleArtGenerate}
            inputValue={inputValue}
            modePro={modePro}
          />
        </div>
      </div>
    </Panel>
  );
};

export default StyleSelection;
