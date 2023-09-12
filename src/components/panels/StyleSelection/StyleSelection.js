import React, { useState, useContext, useRef, useEffect } from "react";
import "./StyleSelection.css";
import "./Inquiry.css";

import StyleSelectionHeader from "./components/StyleSelection/StyleSelectionHeader";
import StyleSelectionTitle from "./components/StyleSelection/StyleSelectionTitle";
import StyleSelectionBody from "./components/StyleSelection/StyleSelectionBody";
import StyleSelectionCreateBtn from "./components/StyleSelection/StyleSelectionCreateBtn";
import { Panel } from "@vkontakte/vkui";

import { GenerateContext, MainContext } from "components/shared/providers";

const StyleSelection = ({ id }) => {
  const { modePro } = useContext(GenerateContext);

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
          <StyleSelectionHeader />
          <StyleSelectionTitle error={error} />
          {!modePro && <StyleSelectionBody error={error} />}
          <StyleSelectionCreateBtn
            setError={setError}
            handleScrollToTop={handleScrollToTop}
          />
        </div>
      </div>
    </Panel>
  );
};

export default StyleSelection;
