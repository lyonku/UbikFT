import { createContext, useState, useEffect, useContext } from "react";
import { post } from "utils/api";
import { MainContext } from "./MainProvider";
import createPrompts from "components/App/features/createPrompts";

export const GenerateContext = createContext();

export const GenerateContextProvider = ({ children, router }) => {
  const [inputValue, setInputValue] = useState("");
  const [inputValueNegative, setInputValueNegative] = useState("");
  const [inputValueSeed, setInputValueSeed] = useState();
  const [guidanceScale, setGuidanceScale] = useState(7.5);
  const [modePro, setModePro] = useState(false);

  const [chosenStyles, setChosenStyles] = useState({});
  const [currentImg, setCurrentImg] = useState();

  const [generation, setGeneration] = useState(false);
  const [generationError, setGenerationError] = useState();

  const { handleGetArts, handleInitUser, fetchedUser } =
    useContext(MainContext);

  // Mass for input values in pro mode
  const inquiryMass = [
    {
      inputTitle: "Prompt:",
      id: "textarea",
      placeholder: "Напишите, что хотите увидеть",
      value: inputValue,
      setValue: setInputValue,
    },
    {
      inputTitle: "Negative Prompt:",
      id: "textareaNegative",
      placeholder: "Напишите, что хотите исключить",
      value: inputValueNegative,
      setValue: setInputValueNegative,
    },
    {
      inputTitle: "Seed:",
      id: "textareaSeed",
      placeholder: "Введите seed",
      value: inputValueSeed,
      setValue: setInputValueSeed,
    },
  ];

  // Generate art start
  const handleArtGenerate = async (count) => {
    setGenerationError(false);

    router.toPanel("loading");

    const config = {
      text_prompts: [
        {
          text: inputValue,
          weight: 1,
        },
        {
          text: inputValueNegative,
          weight: -1,
        },
      ],
      cfg_scale: modePro ? +guidanceScale : 7.5,
      samples: count,
      style_preset: "",
      seed: modePro ? +inputValueSeed : 0,
      vk_user_id: fetchedUser.id, // DELETE
    };

    if (!generation) {
      setCurrentImg("");

      if (!modePro) {
        const translateData = await getTranslate(inputValue);
        const promptData = await createPrompts(chosenStyles, translateData);

        config.text_prompts = promptData.text_prompts;
        config.style_preset = promptData.style_preset;
      }

      const data = await generateArt(config);

      if (data?.arts) {
        setCurrentImg(data.arts);
      }
    } else {
      notify({ text: "Генерация уже идёт!", type: "error" });
    }

    return;
  };

  // Function for translating text into English
  async function getTranslate(inputValue) {
    const response = await post(`/translate`, {
      text: inputValue,
    });

    const translateData = response.translations[0].text;

    if (translateData === null) {
      notify({
        text: "Сервис перевода недоступен",
        type: "error",
      });
      return;
    }
    return translateData;
  }

  // Function for generating images
  async function generateArt(data = {}) {
    setGeneration(true);
    const response = await post(`/generate`, data);
    if (response.arts) {
      setGeneration(false);
      handleGetArts();
      handleInitUser();
    } else {
      if (response == "Недостаточно энергии") {
        router.toBack();
      } else {
        setError(true);
      }
      notify({
        text: response ?? "Сервис генерации недоступен",
        type: "error",
      });
    }
    return response;
  }

  // Generate art end

  const handleCopyPrompt = (text, style, pro) => {
    setModePro(pro ? true : false);
    setChosenStyles(style);
    setInputValue(text);
    router.toBack();
    router.toView("main");
  };

  const handleChangeModePro = () => {
    setModePro((prevState) => !prevState);
  };

  return (
    <GenerateContext.Provider
      value={{
        inquiryMass,
        inputValue,
        guidanceScale,
        modePro,
        chosenStyles,
        generationError,
        currentImg,
        setChosenStyles,
        handleArtGenerate,
        setGuidanceScale,
        setInputValue,
        handleChangeModePro,
        handleCopyPrompt,
      }}
    >
      {children}
    </GenerateContext.Provider>
  );
};
