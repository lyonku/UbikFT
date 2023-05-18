import { createContext, useState, useEffect } from "react";
import bridge from "@vkontakte/vk-bridge";
import { PopoutWrapper } from "@vkontakte/vkui";

import createPrompts from "components/App/features/createPrompts";
import ContestSelect from "components/panels/ArtSelection/components/ContestSelect";
import PayConfirm from "components/panels/Contest/components/PayConfirm";
import ShareWorkAlert from "components/common/ShareWorkAlert";

export const MainContext = createContext();

export const MainContextProvider = ({ children, router }) => {
  const [currentModel, setCurrentModel] = useState("Protogen");
  const [inputValue, setInputValue] = useState("");
  const [chosenStyles, setChosenStyles] = useState({});
  const [currentImg, setCurrentImg] = useState();
  const [error, setError] = useState();
  const [fetchedUser, setUser] = useState(null);

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

    const translateData = await getTranslate(inputValue);

    if (translateData !== null) {
      const result = await createPrompts(
        chosenStyles,
        currentModel,
        translateData
      );
      const data = await generateArt(result);

      if (data.status === "failed" || !data.output) {
        console.log("Результат генерации: ", data);
        console.log("==================================================");

        setError(true);
      } else {
        console.log("Результат генерации: ", data);
        console.log("==================================================");
        setCurrentImg(data.output[0]);
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

      console.log("==================================================");
      console.log("Результат перевода: ", translateData);
      return translateData;
    } catch (error) {
      setError(true);
    }
  }

  async function generateArt(data = {}) {
    try {
      const response = await fetch("https://eo6n4spi6rkan06.m.pipedream.net", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
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

  return (
    <MainContext.Provider
      value={{
        currentModel,
        setCurrentModel,
        inputValue,
        setInputValue,
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
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
