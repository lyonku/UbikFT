import React, { useState, useEffect, useRef } from "react";

function StyleSelectionTitle({ inputValue, router }) {
  useEffect(() => {
    const textareaTwo = document.getElementById("textareaTwo");
    autoResize(textareaTwo);
  }, []);

  const autoResize = (e) => {
    textareaTwo.style.height = "auto";
    textareaTwo.style.height = textareaTwo.scrollHeight + "px";
  };

  return (
    <div className="styleSelection__title" onClick={() => router.toBack()}>
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
