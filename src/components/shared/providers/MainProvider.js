import { createContext, useState, useEffect } from "react";
import bridge from "@vkontakte/vk-bridge";
import moment from "moment";
import createPrompts from "components/App/features/createPrompts";
import data from "components/panels/Contests/data.json";
import plural from "plural-ru";

export const MainContext = createContext();

export const MainContextProvider = ({ children, router }) => {
  const [currentModel, setCurrentModel] = useState("Rev Anim");
  const [inputValue, setInputValue] = useState("");
  const [guidanceScale, setGuidanceScale] = useState(7.5);
  const [inputValueNegative, setInputValueNegative] = useState("");
  const [inputValueSeed, setInputValueSeed] = useState("");
  const [chosenStyles, setChosenStyles] = useState({});
  const [currentImg, setCurrentImg] = useState({ img: "", seed: "" });
  const [error, setError] = useState();
  const [fetchedUser, setUser] = useState(null);
  const [activeContest, setActiveContest] = useState({});
  const [modePro, setModePro] = useState(false);
  const [activeFilter, setActiveFilter] = useState("workAcceptance");

  const [contests, setContests] = useState([]);

  const [userData, setUserData] = useState({});
  const [artsData, setArtsData] = useState([]);

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

  async function fetchData() {
    const user = await bridge.send("VKWebAppGetUserInfo");
    console.log(user);
    setUser(user);
  }

  useEffect(() => {
    fetchData();
    handleInitUser();
    handleInitContests();
  }, []);
  // Navigation in mini app start

  const onStoryChange = (e) => {
    router.toView(e.currentTarget.dataset.story);
  };

  // Navigation in mini app end

  // Generate art start

  const handleArtGenerate = async (count) => {
    router.toPanel("loading");
    if (!inputValue) {
      setError(true);
      router.toBack();
      return;
    }
    setCurrentImg("");
    setError(false);

    if (modePro) {
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
        samples: +count,
        seed: +inputValueSeed ?? 0,
        steps: 30,
      };

      const data = await generateArt(config);
      if (data.artifacts[0]?.finishReason == "SUCCESS") {
        setCurrentImg(data.artifacts);
      } else {
        setError(true);
      }
    } else {
      console.log(chosenStyles);
      const translateData = await getTranslate(inputValue);
      if (translateData !== null) {
        const result = await createPrompts(
          chosenStyles,
          currentModel,
          translateData
        );
        result.samples = +count;
        const data = await generateArt(result);
        if (data.artifacts && data.artifacts[0]?.finishReason == "SUCCESS") {
          setCurrentImg(data.artifacts);
        } else {
          setError(true);
        }
      }
    }
  };

  async function getTranslate(inputValue) {
    try {
      const response = await fetch(
        "https://postback.leadpipe.work/webhook/deepl",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "8IVn5UBDYDsFeZEZKw6vgJ",
          },
          body: JSON.stringify({ text: inputValue }),
        }
      );

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
        "https://postback.leadpipe.work/webhook/stabilityai",
        {
          method: "POST",
          headers: {
            Authorization: "pyHFt6KTLUU9uJdNqA5vV7",
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const imgData = await response.json();

      const sendArtData = {
        vk_user_id: fetchedUser.id,
        cfg_scale: data.cfg_scale,
        steps: data.steps,
        samples: data.samples,
        engine_id: data.engine_id,
        prompt: inputValue,
        isPro: modePro,
        // styles: chosenStyles,
        imgs: imgData.artifacts,
      };

      const sendArtResponse = await fetch("https://ubiq.top/addArt", {
        method: "POST",
        body: JSON.stringify(sendArtData),
      });
      handleGetArts();
      handleInitUser();
      return imgData;
    } catch {
      setError(true);
    }
  }

  async function fetchShare(data) {
    console.log(data?.id);
    await bridge
      .send("VKWebAppShare", {
        link: "https://vk.com/app51573768#contests/contest/" + data?.id,
      })
      .then((data) => {
        if (data.result) {
          console.log(data);
        }
      })
      .catch((error) => {
        // Ошибка
        console.log(error);
      });
  }

  useEffect(() => {
    async function fetchParams() {
      const params = await bridge.send("VKWebAppGetLaunchParams");
      if (window.location.hash) {
        if (window.location.hash.includes("contests/contest")) {
          let mass = window.location.hash.split("/");
          for (const item of data) {
            if (item.id == mass[2]) {
              setActiveContest(item);
            }
          }
          router.toHash("contests/contest");
          return;
        }
        router.toHash(window.location.hash.slice(1));
      }
    }
    fetchParams();
  }, []);

  const handleInitUser = async () => {
    let param = window.location.href;
    let totalParam = param.slice(param.indexOf("vk_access"));

    const response = await fetch(`https://ubiq.top/initUser?${totalParam}`, {
      method: "GET",
    });

    const responseData = await response.json();
    setUserData(responseData);
  };

  const handleInitContests = async () => {
    let param = window.location.href;
    let totalParam = param.slice(param.indexOf("vk_access"));

    const response = await fetch(`https://ubiq.top/initContest?${totalParam}`, {
      method: "GET",
    });

    const responseData = await response.json();
    setContests(responseData);
  };

  const handleGetArts = async (step) => {
    const data = {
      currentPage: step ? step + 1 : 1,
      vk_user_id: fetchedUser.id,
    };

    const response = await fetch(`https://ubiq.top/getArts`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if (responseData !== null) {
      const copy = Object.assign({}, responseData);
      if (step) {
        copy.imgs = [...artsData.imgs].concat(responseData.imgs);
      }
      setArtsData(copy);
    }
    return responseData;
  };

  const handleGetContestArts = async (id, step) => {
    const data = {
      idContest: id,
      currentPage: step ? step + 1 : 1,
      vk_user_id: fetchedUser.id,
    };

    const response = await fetch(`https://ubiq.top/getContestWorks`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    if (responseData !== null) {
      console.log(activeContest);
      const copy = Object.assign({}, activeContest);

      if (step) {
        copy.works = [...copy.works].concat(responseData.works);
      } else {
        copy.works = responseData.works;
      }
      copy.currentPage = responseData.currentPage;
      copy.maxPages = responseData.maxPages;
      setActiveContest(copy);
    }
    return responseData;
  };

  const addArtToContest = async (contestID, artID) => {
    const data = {
      vk_user_id: fetchedUser.id,
      contest_id: contestID,
      art_id: artID,
    };

    const response = await fetch(`https://ubiq.top/addArtToContest`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
  };

  const deleteArt = async (hash) => {
    const data = {
      hashArt: hash,
      vk_user_id: fetchedUser.id,
    };

    const response = await fetch(`https://ubiq.top/deleteArt`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const copy = Object.assign({}, artsData);
    console.log(copy);
    const filteredArr = copy.imgs.filter(
      (obj) => !obj.imagesLink.includes(hash)
    );
    copy.imgs = filteredArr;

    setArtsData(copy);
    const responseData = await response.json();
    return responseData;
  };

  useEffect(() => {
    if (fetchedUser) {
      handleGetArts();
    }
  }, [fetchedUser]);

  const handleClearPrompt = () => {
    setChosenStyles({});
    setInputValue("");
  };

  const handleCopy = (text) => {
    bridge.send("VKWebAppCopyText", {
      text: text,
    });
  };

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

  useEffect(() => {
    bridge
      .send("VKWebAppGetAuthToken", {
        app_id: 51573768,
        scope: "wall, photos ",
      })
      .then((data) => {
        if (data.access_token) {
          console.log(data);
        }
      })
      .catch((error) => {
        // Ошибка
        console.log(error);
      });
  }, []);

  const updateContestTime = (newDate) => {
    let currentDate = moment();
    let targetDate = moment(+newDate);
    let remainingTime = moment.duration(targetDate.diff(moment()));

    let days = Math.floor(remainingTime.asDays());
    let hours = remainingTime.hours();
    let minutes = remainingTime.minutes();
    let seconds = remainingTime.seconds();

    if (targetDate <= currentDate) {
      handleInitContests();
      return;
    }

    // Форматирование времени с ведущими нулями
    let formattedTime = moment({
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    }).format("HH:mm:ss");

    let timeString =
      plural(days, "%d день", "%d дня", "%d дней") + " " + formattedTime;
    return timeString;
  };

  return (
    <MainContext.Provider
      value={{
        userData,
        artsData,
        handleInitUser,
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
        handleGetArts,
        handleCopy,
        setActiveContest,
        activeContest,
        updateContestTime,
        generateArt,
        setError,
        setCurrentImg,
        modePro,
        setModePro,
        handleChangeModePro,
        setGuidanceScale,
        guidanceScale,
        handleCopyPrompt,
        activeFilter,
        setActiveFilter,
        deleteArt,
        fetchShare,
        contests,
        handleInitContests,
        addArtToContest,
        handleGetContestArts,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
