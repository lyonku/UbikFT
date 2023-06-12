import React, { useState, useEffect, useRef, useContext } from "react";
import deleteBtn from "assets/img/close-btn.svg";
import { MainContext } from "components/shared/providers/MainProvider";

function InquiryTextarea({ error, item }) {
  const { modePro } = useContext(MainContext);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      const length = textareaRef.current.value.length;
      textareaRef.current.setSelectionRange(length, length);
    }
  }, []);

  useEffect(() => {
    const textarea = document.getElementById(item.id);
    autoResize(textarea);
  }, [item.value]);

  const autoResize = (e) => {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  const handleInputValue = (event) => {
    if (item.id == "textareaSeed") {
      const inputText = event.target.value;
      const numericOnlyText = inputText.replace(/\D/g, "");
      item.setValue(numericOnlyText);
    } else {
      item.setValue(event.target.value);
    }
  };

  return (
    <>
      {modePro && (
        <div className="inquiry__inputTitle title_h4-18px">
          {item.inputTitle}
        </div>
      )}
      <div
        className={`inquiry__inputWrap ${
          error && "animate__animated animate__shakeX"
        } ${modePro && "inquiry__inputWrap-pro"}`}
      >
        <textarea
          placeholder={item.placeholder}
          className="inquiry__input"
          id={item.id}
          value={item.value}
          onChange={handleInputValue}
          rows={1}
          ref={textareaRef}
          maxLength={400}
        />
        <img
          src={deleteBtn}
          onClick={() => {
            item.setValue("");
            textareaRef.current.focus();
          }}
          className={`inquiry__clearBtn ${
            item.value.length >= 1 && "displayed"
          }`}
        />
      </div>
    </>
  );
}
export default InquiryTextarea;
