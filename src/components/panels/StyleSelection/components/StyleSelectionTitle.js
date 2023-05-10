import React, { useState, useEffect, useRef } from "react";
import router from "components/shared/router";

function StyleSelectionTitle({ go, inputValue, history }) {
  useEffect(() => {
    const textareaTwo = document.getElementById("textareaTwo");
    autoResize(textareaTwo);
  }, []);

  const autoResize = (e) => {
    textareaTwo.style.height = "auto";
    textareaTwo.style.height = textareaTwo.scrollHeight + "px";
  };

  return (
    <div
      className="styleSelection__title"
      onClick={() => {
        if (router.history[router.history.length - 2].page == "main.inquiry") {
          window.history.back();
        } else {
          go("main.inquiry");
        }
      }}
    >
      <div className="inquiry__inputWrap">
        <textarea
          id="textareaTwo"
          defaultValue={inputValue}
          className="inquiry__input"
          rows={1}
        />
      </div>
    </div>
  );
}

export default StyleSelectionTitle;
