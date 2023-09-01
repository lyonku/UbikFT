import React, { useState, useEffect, useRef, useContext } from "react";
import deleteBtn from "assets/img/close-btn.svg";
import { MainContext } from "components/shared/providers/MainProvider";
import TextArea from "antd/es/input/TextArea";

function InquiryTextarea({ error, value, setValue, placeholder }) {
  const inputRef = useRef(null);

  const handleInputFocus = () => {
    inputRef.current.focus({
      cursor: "end",
    });
  };

  return (
    <div
      className={`inquiry__inputWrap ${
        error && value.length < 1 && "animate__animated animate__shakeX"
      }`}
    >
      <TextArea
        className="inquiry__input"
        placeholder={placeholder}
        autoSize={{ minRows: 1, maxRows: 4 }}
        bordered={false}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        maxLength={400}
        ref={inputRef}
      />
      <img
        src={deleteBtn}
        onClick={() => {
          setValue("");
          handleInputFocus();
        }}
        className={`inquiry__clearBtn ${value.length >= 1 && "displayed"}`}
      />
    </div>
  );
}
export default InquiryTextarea;
