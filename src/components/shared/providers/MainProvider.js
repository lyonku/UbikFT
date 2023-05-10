import { createContext, useState, useEffect } from "react";
import bridge from "@vkontakte/vk-bridge";

import generatePrompts from "components/App/features/generatePrompts";

import router from "../router.js";

export const MainContext = createContext();

export const MainContextProvider = ({ children }) => {
  const [activeStory, setActiveStory] = useState("main");
  const [styleSelectionActivePanel, setStyleSelectionActivePanel] =
    useState("home");

  const [currentModel, setCurrentModel] = useState("Protogen");
  const [inputValue, setInputValue] = useState("");
  const [chosenStyles, setChosenStyles] = useState({});
  const [currentImg, setCurrentImg] = useState();
  const [error, setError] = useState();
  const [fetchedUser, setUser] = useState(null);

  bridge.send("VKWebAppInit");

  // Navigation in mini app start
  const onStoryChange = (e) => {
    goToPage(e.currentTarget?.dataset?.story ?? e, "setActiveStory");
  };

  function goToPage(name) {
    const totalName = name.split(".");

    router.go(name);
    setActiveStory(totalName[0]);
    if (totalName[1]) {
      setStyleSelectionActivePanel(totalName[1]);
    }
  }

  const goBack = (count) => {
    if (count) {
      let currentCount = 0;
      while (currentCount < count) {
        router.back();
        currentCount++;
      }
    }
    const totalName = router.state.page.split(".");
    // if (activeStory == router.state.page) {
    //   router.back();
    // }
    setActiveStory(totalName[0]);
    if (totalName[1]) {
      setStyleSelectionActivePanel(totalName[1]);
    }
  };

  useEffect(() => {
    const handlePopstate = () => goBack();
    window.addEventListener("popstate", handlePopstate);

    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, []);
  console.log(router.history);

  // Navigation in mini app end

  const handleArtGenerate = async () => {
    setCurrentImg();
    setError();
    setStyleSelectionActivePanel("loading");

    const response = await fetch("https://eoyzdwqi9mrkca4.m.pipedream.net", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: inputValue }),
    });

    const responseData = await response.json();
    const translateData = responseData.translations[0].text;
    generatePrompts(chosenStyles, currentModel, translateData).then(
      (result) => {
        postData(result).then((data) => {
          if (data.status == "failed" || !data.output) {
            setError(true);
          } else {
            setCurrentImg(data.output[0]);
          }
        });
      }
    );
  };

  async function postData(data = {}) {
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
      console.log("err");
    }
  }

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

  return (
    <MainContext.Provider
      value={{
        currentModel,
        setCurrentModel,
        inputValue,
        setInputValue,
        goToPage,
        styleSelectionActivePanel,
        setStyleSelectionActivePanel,
        goBack,
        chosenStyles,
        setChosenStyles,
        handleArtGenerate,
        currentImg,
        error,
        handleClearPrompt,
        fetchedUser,
        onStoryChange,
        activeStory,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
