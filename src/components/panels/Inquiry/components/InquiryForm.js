import React, { useState, useEffect, useRef } from "react";
import refresh from "assets/img/prompt-refresh.svg";
import deleteBtn from "assets/img/close-btn.svg";

function InquiryForm({
  inputValue,
  handleInputValue,
  setInputValue,
  handleExample,
  example,
  randomizeExample,
  router,
}) {
  const [error, setError] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      const length = textareaRef.current.value.length;
      textareaRef.current.setSelectionRange(length, length);
    }
  }, []);

  return (
    <div className="inquiry__form">
      <div className="inquiry__wrap">
        <div
          className={`inquiry__inputWrap ${
            error && "animate__animated animate__shakeX"
          }`}
        >
          <textarea
            placeholder="Опишите, что у вас на уме"
            className="inquiry__input"
            id="textarea"
            value={inputValue}
            onChange={handleInputValue}
            rows={1}
            ref={textareaRef}
            maxLength={400}
          />
          <img
            src={deleteBtn}
            onClick={() => {
              setInputValue("");
              textareaRef.current.focus();
            }}
            className={`inquiry__clearBtn ${
              inputValue.length >= 1 && "displayed"
            }`}
          />
        </div>

        <div className="text inquiry__inputExample ">
          Например:
          <span
            className="inquiry__inputExample_underline"
            onClick={handleExample}
          >
            {example}
          </span>
          <img src={refresh} onClick={randomizeExample} />
        </div>
      </div>
      <div
        className="inquiry__btn btn"
        onClick={
          inputValue.length >= 1
            ? () => router.toPanel("styleSelection")
            : () => {
                setError(true);
                setTimeout(() => {
                  setError(false);
                }, 1000);
              }
        }
      >{`Выберите свой стиль`}</div>
    </div>
  );
}

export default InquiryForm;
