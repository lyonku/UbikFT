import React, { useState, useEffect, useRef, useContext } from "react";
import examples from "components/panels/StyleSelection/inputExamples.json";
import InquiryForm from "../Inquiry/InquiryForm";
import { MainContext } from "components/shared/providers";

function StyleSelectionTitle({ error }) {
  const { setInputValue } = useContext(MainContext);

  const [example, setExample] = useState(false);

  const handleExample = (event) => {
    setInputValue(event.target.innerText);
  };

  const randomizeExample = () => {
    const randomIndex = Math.floor(Math.random() * examples.length);
    if (example == examples[randomIndex]) {
      randomizeExample();
      return;
    }
    setExample(examples[randomIndex]);
  };

  useEffect(() => {
    randomizeExample();
  }, []);

  return (
    <div className="inquiry__body">
      <div className="inquiry__title title">
        Напишите запрос для создания <span className="text_accented">арта</span>
      </div>

      <InquiryForm
        error={error}
        handleExample={handleExample}
        example={example}
        randomizeExample={randomizeExample}
      />
    </div>
  );
}

export default StyleSelectionTitle;
