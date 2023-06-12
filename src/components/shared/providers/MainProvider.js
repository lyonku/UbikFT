import { createContext, useState, useEffect } from "react";
import bridge from "@vkontakte/vk-bridge";
import { PopoutWrapper } from "@vkontakte/vkui";

import createPrompts from "components/App/features/createPrompts";
import ContestSelect from "components/panels/ArtSelection/components/ContestSelect";
import PayConfirm from "components/panels/Contest/components/PayConfirm";
import ShareWorkAlert from "components/common/ShareWorkAlert";

export const MainContext = createContext();

export const MainContextProvider = ({ children, router }) => {
  const [currentModel, setCurrentModel] = useState("Rev Anim");
  const [inputValue, setInputValue] = useState("");
  const [guidanceScale, setGuidanceScale] = useState(7.5);
  const [inputValueNegative, setInputValueNegative] = useState("");
  const [inputValueSeed, setInputValueSeed] = useState("");
  const [chosenStyles, setChosenStyles] = useState({});
  const [currentImg, setCurrentImg] = useState();
  const [error, setError] = useState();
  const [fetchedUser, setUser] = useState(null);
  const [activeContest, setActiveContest] = useState({});
  const [modePro, setModePro] = useState(false);

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

  bridge.send("VKWebAppInit");

  // Navigation in mini app start

  const onStoryChange = (e) => {
    router.toView(e.currentTarget.dataset.story);
  };

  // Navigation in mini app end

  // Generate art start

  const handleArtGenerate = async () => {
    if (!inputValue) {
      setError(true);
      router.toBack();
      router.toBack();
      router.toBack();
      return;
    }

    setError();
    router.toPanel("loading");
    setCurrentImg();

    if (modePro) {
      const apiModels = {
        Counterfeit: "counterfeit-v30",
        "Rev Anim": "rev-anim",
      };

      const config = {
        client_id: "mini-app",
        engine_id: "stable-diffusion-xl-beta-v2-2-2",
        height: 512,
        width: 512,
        text_prompts: [
          {
            text: inputValue,
            weight: 1,
          },
        ],
        cfg_scale: 7,
        clip_guidance_preset: "NONE",
        sampler: "DDIM",
        samples: 1,
        seed: 0,
        steps: 30,
      };

      const data = await generateArt(config);
      console.log(data);
      if (data.artifacts[0].finishReason != "SUCCESS") {
        setError(true);
      } else {
        setCurrentImg(`data:image/jpeg;base64,${data.artifacts[0].base64}`);
      }
    } else {
      const translateData = await getTranslate(inputValue);
      if (translateData !== null) {
        console.log(1);
        const result = await createPrompts(
          chosenStyles,
          currentModel,
          translateData
        );
        const data = await generateArt(result);

        if (data.artifacts[0].finishReason != "SUCCESS") {
          setError(true);
        } else {
          setCurrentImg(`data:image/jpeg;base64,${data.artifacts[0].base64}`);
        }
      }
    }
  };

  async function getTranslate(inputValue) {
    try {
      const response = await fetch("https://eoyzdwqi9mrkca4.m.pipedream.net", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputValue }),
      });

      const responseData = await response.json();
      const translateData = responseData.translations[0].text;

      return translateData;
    } catch (error) {
      setError(true);
    }
  }

  async function generateArt(data = {}) {
    try {
      const response = await fetch(
        "https://n8n.alectogeek.com/webhook/stabilityai",
        {
          method: "POST",
          headers: {
            Authorization: "pyHFt6KTLUU9uJdNqA5vV7",
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      return await response.json();
    } catch {
      setError(true);
    }
  }

  // Generate art end
  const handleSendLikePopout = () => {
    router.toPopout(
      <PopoutWrapper alignY="center" alignX="center">
        <PayConfirm />
      </PopoutWrapper>
    );
  };

  const handleShowSharePopout = (img) => {
    router.toPopout(
      <PopoutWrapper alignY="center" alignX="center">
        <ShareWorkAlert img={img} />
      </PopoutWrapper>
    );
  };

  const handleContestSelectPopout = () => {
    router.toPopout(
      <PopoutWrapper alignY="center" alignX="center">
        <ContestSelect />
      </PopoutWrapper>
    );
  };

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send("VKWebAppGetUserInfo");
      setUser(user);
    }
    fetchData();
  }, []);

  const handleClearPrompt = () => {
    setChosenStyles({});
    setInputValue("");
  };

  const handleCopyPrompt = (text) => {
    bridge.send("VKWebAppCopyText", {
      text: text,
    });
  };

  const handleChangeModePro = () => {
    setModePro((prevState) => !prevState);
  };

  function getTimeUntilDate(targetDate) {
    var currentDate = new Date();
    var timeDiff = targetDate.getTime() - currentDate.getTime();
    var hours = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}:${minutes}`;
  }

  return (
    <MainContext.Provider
      value={{
        currentModel,
        setCurrentModel,
        inputValue,
        setInputValue,
        inquiryMass,
        chosenStyles,
        setChosenStyles,
        handleArtGenerate,
        currentImg,
        error,
        handleClearPrompt,
        fetchedUser,
        onStoryChange,
        router,
        handleSendLikePopout,
        handleShowSharePopout,
        handleContestSelectPopout,
        handleCopyPrompt,
        setActiveContest,
        activeContest,
        getTimeUntilDate,
        generateArt,
        setError,
        setCurrentImg,
        modePro,
        handleChangeModePro,
        setGuidanceScale,
        guidanceScale,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
