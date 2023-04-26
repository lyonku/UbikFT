import React, { useState, useEffect, useRef } from "react";
import "./Inquiry.css";
import { Panel } from "@vkontakte/vkui";
import "animate.css";
import InquiryForm from "./components/InquiryForm";

const Home = ({ id, go, inputValue, setInputValue }) => {
  const [example, setExample] = useState(false);

  const examples = [
    "корги с зелёным яблоком на голове",
    "коты играют в баскетбол с космонавтами",
    "космонавт скачет на лошади по луне",
    "рыжая лиса отдыхает в кустах",
    "умные коты играют в шахматы",
  ];

  const handleInputValue = (event) => {
    setInputValue(event.target.value);
  };

  const handleExample = (event) => {
    setInputValue(event.target.innerText);
  };

  const randomExample = () => {
    const randomIndex = Math.floor(Math.random() * examples.length);
    if (example == examples[randomIndex]) {
      randomExample();
      return;
    }
    setExample(examples[randomIndex]);
  };

  useEffect(() => {
    randomExample();
  }, []);

  useEffect(() => {
    const textarea = document.getElementById("textarea");
    autoResize(textarea);
  }, [inputValue]);

  const autoResize = (e) => {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  return (
    <Panel id={id}>
      <div className="inquiry">
        <div className="gradient-round"></div>
        <div className="inquiry__body">
          <div className="inquiry__title title">
            Напишите запрос для создания{" "}
            <span className="title_accented">арта</span>
          </div>
          <InquiryForm
            inputValue={inputValue}
            handleInputValue={handleInputValue}
            setInputValue={setInputValue}
            handleExample={handleExample}
            example={example}
            randomExample={randomExample}
            go={go}
          />
        </div>
      </div>
    </Panel>
  );
};

export default Home;
