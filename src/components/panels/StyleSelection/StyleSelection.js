import React, { useState, useContext, useRef, useEffect } from "react";
import "./StyleSelection.css";
import "./Inquiry.css";

import StyleSelectionHeader from "./components/StyleSelection/StyleSelectionHeader";
import StyleSelectionTitle from "./components/StyleSelection/StyleSelectionTitle";
import StyleSelectionBody from "./components/StyleSelection/StyleSelectionBody";
import StyleSelectionCreateBtn from "./components/StyleSelection/StyleSelectionCreateBtn";
import { View, Panel } from "@vkontakte/vkui";

import { MainContext, PopoutContext } from "components/shared/providers";

const StyleSelection = ({ id }) => {
  const {
    inputValue,
    chosenStyles,
    setChosenStyles,
    router,
    modePro,
    handleChangeModePro,
    setInputValue,
    userData,
  } = useContext(MainContext);
  const { handleSetArtCountPopout } = useContext(PopoutContext);

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
            userData={userData}
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
            handleSetArtCountPopout={handleSetArtCountPopout}
            inputValue={inputValue}
            modePro={modePro}
          />
        </div>
      </div>
    </Panel>
  );
};

export default StyleSelection;
