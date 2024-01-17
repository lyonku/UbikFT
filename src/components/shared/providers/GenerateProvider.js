import { createContext, useState, useEffect, useContext } from "react";
import { post } from "utils/api";
import { MainContext } from "./MainProvider";
import createPrompts from "components/App/features/createPrompts";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

export const GenerateContext = createContext();

export const GenerateContextProvider = ({ children }) => {
  const [inputValue, setInputValue] = useState("");
  const [inputValueNegative, setInputValueNegative] = useState("");
  const [inputValueSeed, setInputValueSeed] = useState();
  const [guidanceScale, setGuidanceScale] = useState(7.5);
  const [modePro, setModePro] = useState(false);

  const [chosenStyles, setChosenStyles] = useState({});
  const [currentImg, setCurrentImg] = useState([]);

  const [generation, setGeneration] = useState(false);
  const [generationError, setGenerationError] = useState();

  const { handleGetArts, handleInitUser, doRecommend, notify } =
    useContext(MainContext);
  const routeNavigator = useRouteNavigator();

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
    setGeneration(true);
    setGenerationError(false);
    routeNavigator.push("/loading");

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
      rawPrompt: inputValue,
      rawNegativePrompt: inputValueNegative,
      isPro: modePro,
      styles: chosenStyles,
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
      setGeneration(false);
      handleGetArts();
      handleInitUser();
      setTimeout(() => {
        doRecommend();
      }, 3000);
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

    if (!response.isOk) {
      notify({
        text: "Сервис перевода недоступен",
        type: "error",
      });
      return;
    }

    const translateData = response.data.translations[0].text;

    return translateData;
  }

  // Function for generating images
  async function generateArt(data = {}) {
    const response = await post(`/generate`, data);

    if (!response.isOk) {
      if (response.message === "Недостаточно энергии") {
        routeNavigator.back();
      } else {
        setGenerationError(true);
      }
      notify({
        text: response.message ?? "Сервис генерации недоступен",
        type: "error",
      });
      setGeneration(false);
      return;
    }

    return response.data;
  }

  // Generate art end

  const handleCopyPrompt = (props) => {
    setModePro(props.isPro);
    setInputValue(props.prompt);
    if (props.isPro) {
      setInputValueNegative(props.negativePrompt);
      setInputValueSeed(props.seed);
      setGuidanceScale(props.cfg_scale);
    } else {
      setChosenStyles(props.styles);
    }
    routeNavigator.push("/");
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
        generation,
        setCurrentImg,
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
