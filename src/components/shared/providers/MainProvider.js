import { createContext, useState, useEffect, createRef, useRef } from "react";
import bridge from "@vkontakte/vk-bridge";
import moment from "moment";
import createPrompts from "components/App/features/createPrompts";
import plural from "plural-ru";
import Notify from "components/common/Notify";

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
  const [activeFilter, setActiveFilter] = useState("workAcceptance");

  const [contests, setContests] = useState([]);

  const [userData, setUserData] = useState({});
  const [payment, setPayment] = useState([]);
  const [usersRating, setUsersRating] = useState({});
  const [artsData, setArtsData] = useState([]);
  const [artVoted, setArtVoted] = useState({});
  const [updateContest, setUpdateContest] = useState(false);

  const [snackbar, setSnackbar] = useState(null);
  const [serverCrash, setServerCrash] = useState(false);

  const [generation, setGeneration] = useState(false);
  const [shareArtLoading, setShareArtLoading] = useState(false);

  let param = window.location.href;
  let totalParam = param.slice(param.indexOf("vk_access"));
  const artRef = useRef(null);

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

  const notify = ({ text, type }) => {
    if (snackbar) return;
    setSnackbar(<Notify text={text} type={type} />);
    setTimeout(() => {
      setSnackbar(null);
    }, 5000);
  };

  async function fetchData() {
    const user = await bridge.send("VKWebAppGetUserInfo");
    setUser(user);
  }

  useEffect(() => {
    fetchData();
    handleInitUser();
    handleInitContests();
    handleInitEnergy();
  }, []);

  // Navigation in mini app start

  const onStoryChange = (e) => {
    router.toView(e.currentTarget.dataset.story);
  };

  // Navigation in mini app end

  const handleInitEnergy = async () => {
    const response = await fetch(`https://ubiq.top/initPayment?${totalParam}`, {
      method: "GET",
    });
    const energyData = await response.json();
    setPayment(energyData.payment);
  };

  // Generate art start
  const handleArtGenerate = async (count) => {
    setError(false);
    router.toPanel("loading");
    let config = {};
    if (!generation) {
      setCurrentImg("");
    }

    if (modePro) {
      config = {
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
        cfg_scale: guidanceScale,
        samples: +count,
        style_preset: "",
        seed: +inputValueSeed ?? 0,
        vk_user_id: fetchedUser.id,
      };
    } else {
      const translateData = await getTranslate(inputValue);

      const result = await createPrompts(
        chosenStyles,
        fetchedUser.id,
        translateData
      );
      result.samples = +count;
      result.rawPrompt = inputValue;
      result.styles = chosenStyles;
      config = result;
    }

    if (!generation) {
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
    try {
      const response = await fetch(`https://ubiq.top/translate?${totalParam}`, {
        method: "POST",
        body: JSON.stringify({ text: inputValue }),
      });

      const responseData = await response.json();
      const translateData = responseData.translations[0].text;
      if (translateData === null) {
        throw new Error("Ошибка при переводе текста");
      }
      return translateData;
    } catch (error) {
      setError(true);
      notify({
        text: error.message ?? "Сервис перевода недоступен",
        type: "error",
      });
    }
  }

  // Function for generating images
  async function generateArt(data = {}) {
    try {
      setGeneration(true);
      const response = await fetch(`https://ubiq.top/generate?${totalParam}`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      const imgData = await response.json();
      setGeneration(false);

      if (imgData.arts) {
        handleGetArts();
        handleInitUser();
      } else {
        throw new Error(imgData);
      }
      return imgData;
    } catch (error) {
      if (error.message == "Недостаточно энергии") {
        router.toBack();
      } else {
        setError(true);
      }
      notify({
        text: error.message ?? "Сервис генерации недоступен",
        type: "error",
      });
    }
  }

  // Generate art end

  async function fetchShare(contest_id, art_id) {
    await bridge
      .send("VKWebAppShare", {
        link: `https://vk.com/app51573768#contests/contest/${contest_id}/${art_id}`,
      })
      .then((data) => {
        if (data.result) {
          console.log(data);
        }
      })
      .catch((error) => {
        notify({ text: "Не удалось поделится", type: "error" });
        console.log(error);
      });
  }
  const scrollToMyRef = () => {
    const element = artRef.current;

    // Проверьте, что элемент существует
    if (element) {
      // Вызовите метод scrollIntoView() на элементе с параметром block: 'start'
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  useEffect(() => {
    if (contests.length >= 1) {
      if (window.location.hash) {
        if (window.location.hash.includes("contests/contest")) {
          let mass = window.location.hash.split("/");

          if (activeContest.works) {
            let page = Math.floor(
              Math.round(activeContest.currentPosition) / 10
            );

            async function getPagesToArt() {
              for (let i = 1; i < page + 1; i++) {
                const res = await handleGetContestArts(
                  i,
                  activeContest.idContest
                );
              }
              scrollToMyRef();

              var currentURL = window.location.href;
              var parts = currentURL.split("#");
              var newURL = parts[0];
              console.log(newURL);
              window.history.replaceState({}, document.title, newURL);
            }
            getPagesToArt();
            // const result = await getPagesToArt()
            // for (const item of activeContest.works) {
            //   if (item.art.art_id != mass.at(-1)) {
            //     scrollToMyRef();
            //   } else {
            //     console.log();

            //     handleGetContestArts()
            //   }
            // }
          } else {
            for (const item of contests) {
              if (item.id == mass[2]) {
                setActiveContest(item);
              }
            }
            router.toView("contests");
            router.toPanel("contest");
          }
          return;
        }
      }
    }
  }, [contests, activeContest]);

  const handleInitUser = async () => {
    try {
      const response = await fetch(`https://ubiq.top/initUser?${totalParam}`, {
        method: "GET",
      });

      const responseData = await response.json();

      if (responseData.isOk || responseData.vk_user_id) {
        setUserData(responseData);
      } else {
        throw new Error(responseData.message);
      }
    } catch (error) {
      setServerCrash(true);
      notify({ text: "Ошибка при инициализации пользователя", type: "error" });
    }
  };

  const handleInitUsersRating = async (page) => {
    try {
      const data = {
        currentPage: page ? page + 1 : 1,
        vk_user_id: fetchedUser.id,
      };

      const response = await fetch(
        `https://ubiq.top/initUsersRating?${totalParam}`,
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      const responseData = await response.json();
      let copy = Object.assign({}, usersRating);

      if (page && copy.vk_user_id) {
        copy.users = [...copy.users].concat(responseData.users);
        copy.currentPage = responseData.currentPage;
        copy.worksCount = responseData.worksCount;
        copy.maxPages = responseData.maxPages;
      } else {
        copy = responseData;
      }

      setUsersRating(copy);
      return responseData;
    } catch (error) {
      notify({
        text: "Ошибка при получении рейтинга пользователей",
        type: "error",
      });
    }
  };

  const handleInitContests = async () => {
    try {
      const response = await fetch(
        `https://ubiq.top/initContest?${totalParam}`,
        {
          method: "GET",
        }
      );

      const responseData = await response.json();

      if (activeContest.id) {
        setActiveContest(
          responseData.find((item) => item.id === activeContest.id)
        );
      }
      setContests(responseData);
    } catch (error) {
      setServerCrash(true);
      notify({ text: "Ошибка при инициализации конкурсов", type: "error" });
    }
  };

  const addLike = async ({ art_id, vk_user_id }) => {
    try {
      const data = {
        idContest: activeContest.id,
        art_id: art_id,
        vk_likedUser_id: fetchedUser.id,
        vk_user_id: vk_user_id,
      };

      const response = await fetch(`https://ubiq.top/addLike?${totalParam}`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      notify({ text: "Лайк выставлен", type: "standart" });
      let copy = Object.assign(activeContest, {});
      copy.globalLikes.push({ vk_user_id: fetchedUser.id });
      setActiveContest(copy);
      return responseData;
    } catch (error) {
      notify({
        text: "В одном конкурсе, можно проголосовать только за одну работу",
        type: "error",
      });
      // notify({ text: "Ошибка при добавлении лайка", type: "error" });
    }
  };

  const handleGetArts = async (page) => {
    try {
      const data = {
        currentPage: page ? page + 1 : 1,
        vk_user_id: fetchedUser.id,
      };

      const response = await fetch(`https://ubiq.top/getArts?${totalParam}`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (responseData !== null) {
        const copy = Object.assign({}, responseData);
        if (page) {
          copy.imgs = [...artsData.imgs].concat(responseData.imgs);
        }
        setArtsData(copy);
      }
      return responseData;
    } catch (error) {
      notify({ text: "Ошибка при получении артов", type: "error" });
    }
  };

  const handleGetContestArts = async (page, contest_id, contest, art_id) => {
    // try {
    const data = {
      idContest: activeContest.id ?? contest_id,
      currentPage: page ? page + 1 : 1,
      vk_user_id: fetchedUser.id,
      art_id: art_id ?? "",
    };

    const response = await fetch(
      `https://ubiq.top/getContestWorks?${totalParam}`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    const responseData = await response.json();

    if (responseData !== null) {
      const copy = Object.assign({}, contest ?? activeContest);
      if (page) {
        copy.works = [...copy.works].concat(responseData.works);
      } else {
        copy.works = responseData.works;
      }
      copy.currentPage = responseData.currentPage;
      copy.worksCount = responseData.worksCount;
      copy.myWorksCount = responseData.myWorksCount;
      copy.maxPages = responseData.maxPages;
      copy.currentPosition = responseData.currentPosition;

      setActiveContest(copy);
    }
    return responseData;
    // } catch (error) {
    //   notify({
    //     text: "Ошибка при получении конкурсных работ",
    //     type: "error",
    //   });
    // }
  };

  const addArtToContest = async (contestID, artID) => {
    try {
      const data = {
        vk_user_id: fetchedUser.id,
        contest_id: contestID,
        art_id: artID,
      };

      const response = await fetch(
        `https://ubiq.top/addArtToContest?${totalParam}`,
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      const responseData = await response.json();
      if (currentImg) {
        let copy = [...currentImg];
        for (const item of copy) {
          if (item.art_id == artID) {
            item.imagesLink = item.imagesLink.replace(
              fetchedUser.id,
              contestID
            );
            item.imagesLink = item.imagesLink.replace("images", "contests");
          }
        }
        setCurrentImg(copy);
      }
      notify({ text: "Арт добавлен", type: "standart" });
      return responseData;
    } catch (error) {
      notify({
        text: error.message ?? "Ошибка при добавлении арта",
        type: "error",
      });
    }
  };

  const deleteArt = async (hash) => {
    try {
      const data = {
        hashArt: hash,
        vk_user_id: fetchedUser.id,
      };
      const response = await fetch(`https://ubiq.top/deleteArt?${totalParam}`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      const copy = Object.assign({}, artsData);
      const filteredArr = copy.imgs.filter(
        (obj) => !obj.imagesLink.includes(hash)
      );
      copy.imgs = filteredArr;

      setArtsData(copy);
      const responseData = await response.json();
      if (responseData == "Success!") {
        notify({ text: "Арт удалён", type: "standart" });
      }

      return responseData;
    } catch (error) {
      notify({
        text: error.message ?? "Ошибка при удалении арта",
        type: "error",
      });
    }
  };

  const deleteContestArt = async ({ contest_id, user_id, art_id }) => {
    try {
      const data = {
        idContest: contest_id,
        vk_user_id: user_id,
        art_id: art_id,
      };

      const response = await fetch(
        `https://ubiq.top/deleteContestArt?${totalParam}`,
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();
      if (responseData == "Success!") {
        handleGetContestArts(0, contest_id);
        notify({ text: "Арт удалён", type: "standart" });
      } else {
        throw new Error(responseData);
      }
      return responseData;
    } catch (error) {
      notify({
        text: error.message ?? "Ошибка при удалении арта",
        type: "error",
      });
    }
  };

  const downloadArt = async (url, name) => {
    let totalName = name.length > 60 ? name.slice(0, 60) : name;
    const link = document.createElement("a");

    link.href = `https://ubiq.top/download?url=${url}&name=${totalName}`;
    link.target = "_self";
    link.download = totalName;
    link.click();
  };

  const sendArtComplaint = async ({ art_id, contest_id, text, user_id }) => {
    try {
      const data = {
        contest_id: activeContest.id ?? contest_id,
        art_id: art_id,
        message: text,
        user_complaint: user_id,
      };

      const response = await fetch(
        `https://ubiq.top/addArtComplaint?${totalParam}`,
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();
      notify({ text: "Жалоба отправлена", type: "standart" });

      return responseData;
    } catch (error) {
      notify({ text: "Ошибка при отправке жалобы", type: "error" });
    }
  };

  const approveContest = async (idContest) => {
    try {
      const response = await fetch(
        `https://ubiq.top/completeContest?idContest=${idContest}&${totalParam}`,
        {
          method: "GET",
        }
      );

      const responseData = await response.json();

      if (responseData === "Success!") {
        notify({ text: "Конкурс завершён", type: "standart" });
        handleInitContests();
        exitPage("contest");
      } else {
        throw new Error(responseData);
      }
      return responseData;
    } catch (error) {
      notify({
        text: error.message ?? "Ошибка при завершении конкурса",
        type: "error",
      });
    }
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

  const getAccesToken = async () => {
    const response = await bridge
      .send("VKWebAppGetAuthToken", {
        app_id: 51573768,
        scope: "wall, photos, stories ",
      })
      .then((data) => {
        if (data.access_token) {
          return data.access_token;
        }
      })
      .catch((error) => {
        notify({ text: "Доступ не найден", type: "error" });
      });
    return response;
  };

  const getUploadUrl = async (access_token) => {
    const response = await bridge
      .send("VKWebAppCallAPIMethod", {
        method: "photos.getWallUploadServer",
        params: {
          v: "5.131",
          access_token: access_token,
        },
      })
      .then((data) => {
        if (data.response) {
          return data.response.upload_url;
        }
      })
      .catch((error) => {
        // Ошибка
        console.log(error);
      });
    return response;
  };

  const saveToWall = async (access_token, user_id, serverSaveData) => {
    const response = await bridge
      .send("VKWebAppCallAPIMethod", {
        method: "photos.saveWallPhoto",
        params: {
          v: "5.131",
          access_token,
          user_id,
          photo: serverSaveData.photo,
          server: serverSaveData.server,
          hash: serverSaveData.hash,
        },
      })
      .then((data) => {
        if (data.response) {
          return data.response[0];
        }
      })
      .catch((error) => {
        // Ошибка
        console.log(error);
      });
    return response;
  };

  const wallPostBox = async (vk_user_id, image_id) => {
    const result = bridge
      .send("VKWebAppShowWallPostBox", {
        message:
          "Смотрите что у меня получилось сгенерировать в приложении UbikNFT",
        attachments: `photo${vk_user_id}_${image_id}, https://vk.com/app51573768`,
      })
      .then((data) => {
        if (data.post_id) {
          return "complete";
        }
      })
      .catch((error) => {
        return error;
      });

    return result;
  };

  const storiesPostBox = async (vk_user_id, image_id, img_url) => {
    const result = bridge
      .send("VKWebAppShowStoryBox", {
        background_type: "image",
        url: img_url,
        attachment: {
          text: "open",
          type: "url",
          url: "https://vk.com/app51573768_264304967",
        },
      })
      .then((data) => {
        if (data.code_data) {
          // Редактор историй открыт
          console.log(data);
        }
      })
      .catch((error) => {
        // Ошибка
        console.log(error);
      });

    return result;
  };

  const sendImgToVK = async ({ art, type }) => {
    setShareArtLoading(true);
    const access_token = await getAccesToken();
    const upload_url = await getUploadUrl(access_token);

    const serverSave = await fetch(
      `https://ubiq.top/uploadArtToVK?${totalParam}`,
      {
        method: "POST",
        body: JSON.stringify({
          upload_url: upload_url,
          contest_id: art.contest,
          art_id: art.art_id,
          vk_user_id: fetchedUser.id,
        }),
      }
    );
    const serverSaveData = await serverSave.json();
    const saved_photo = await saveToWall(
      access_token,
      fetchedUser.id,
      serverSaveData
    );
    setShareArtLoading(false);

    if (type == "wall") {
      wallPostBox(fetchedUser.id, saved_photo.id);
    } else {
      storiesPostBox(
        fetchedUser.id,
        saved_photo.id,
        saved_photo.sizes[saved_photo.sizes.length - 1].url
      );
    }
  };

  const buySubscribe = (item_id) => {
    console.log(item_id);
    bridge
      .send("VKWebAppShowOrderBox", {
        type: "item",
        item: item_id,
      })
      .then((data) => {
        if (data.success) {
          console.log(data);
          // Оплата голосами прошла успешно
        }
      })
      .catch((error) => {
        // Ошибка
        console.log(error);
      });
  };

  const updateContestTime = (newDate) => {
    let currentDate = moment();
    let targetDate = moment(+newDate);
    let remainingTime = moment.duration(targetDate.diff(moment()));

    let days = Math.floor(remainingTime.asDays());
    let hours = remainingTime.hours();
    let minutes = remainingTime.minutes();
    let seconds = remainingTime.seconds();

    if (targetDate <= currentDate) {
      setUpdateContest(true);
      return "";
    } else {
      setUpdateContest(false);
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

  function exitPage(pageId) {
    for (let i = router.arrPanelsView.length - 1; i >= 0; i--) {
      if (router.arrPanelsView[i].id === pageId) {
        router.toBack();
      } else {
        break;
      }
    }
  }

  return (
    <MainContext.Provider
      value={{
        userData,
        artsData,
        handleInitUser,
        currentModel,
        setCurrentModel,
        artRef,
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
        exitPage,
        addArtToContest,
        handleGetContestArts,
        addLike,
        artVoted,
        setArtVoted,
        notify,
        snackbar,
        setSnackbar,
        sendArtComplaint,
        handleInitUsersRating,
        usersRating,
        sendImgToVK,
        updateContest,
        buySubscribe,
        payment,
        approveContest,
        deleteContestArt,
        downloadArt,
        serverCrash,
        generation,
        shareArtLoading,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
