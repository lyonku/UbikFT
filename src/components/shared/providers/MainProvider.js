import { createContext, useState, useEffect, createRef, useRef } from "react";
import bridge from "@vkontakte/vk-bridge";
import Notify from "components/common/Notify";
import {
  useFirstPageCheck,
  useRouteNavigator,
} from "@vkontakte/vk-mini-apps-router";
import { get, post } from "utils/api";

export const MainContext = createContext();

export const MainContextProvider = ({ children, router }) => {
  const [fetchedUser, setUser] = useState(null);
  const routeNavigator = useRouteNavigator();
  const isFirstPage = useFirstPageCheck();
  const [userData, setUserData] = useState({});
  const [payment, setPayment] = useState([]);
  const [usersRating, setUsersRating] = useState({});
  const [artsData, setArtsData] = useState([]);
  const [contestsArtsData, setContestsArtsData] = useState([]);

  const [snackbar, setSnackbar] = useState(null);
  const [serverCrash, setServerCrash] = useState(false);

  const [shareArtLoading, setShareArtLoading] = useState(false);
  const [artDeleting, setArtDeleting] = useState(false);

  const queryParameters = new URLSearchParams(window.location.search);
  const vk_user_id = queryParameters.get("vk_user_id");
  const vk_platform = queryParameters.get("vk_platform");
  const admins = [264304967, 278522734, 600727087];
  const isAdmin = admins.find((item) => item == vk_user_id);

  let param = window.location.href;
  let totalParam = param.slice(param.indexOf("vk_access"));

  // Initial method call
  useEffect(() => {
    fetchData();
    handleInitUser();
    handleInitEnergy();
  }, []);

  useEffect(() => {
    if (fetchedUser) {
      handleGetArts();
      handleGetContestsArts();
    }
  }, [fetchedUser]);

  // Application navigation methods
  const go = (path) => {
    routeNavigator.push(path);
  };

  const goReplace = (path) => {
    routeNavigator.replace(path);
  };

  const goBack = () => {
    routeNavigator.back();
  };

  // Method for calling snackbar
  const notify = ({ text, type }) => {
    if (snackbar) return;
    setNotificationVibration(type == "error" ? "error" : "success");
    setSnackbar(<Notify text={text} type={type} />);
    setTimeout(() => {
      setSnackbar(null);
    }, 5000);
  };

  // Method for init user in vk
  async function fetchData() {
    const user = await bridge.send("VKWebAppGetUserInfo");
    setUser(user);
  }

  // Method of energy initialization
  const handleInitEnergy = async () => {
    const response = await get(`/initItems`);
    if (!response.isOk) {
      notify({
        text: "Ошибка при получении товаров приложения",
        type: "error",
      });
      return;
    }
    setPayment(response.data.energy);
    return response;
  };

  // Method of user initialization in ubik
  const handleInitUser = async () => {
    const response = await get(`/initUser`);

    if (!response.isOk) {
      setServerCrash(true);
      notify({ text: "Ошибка при инициализации пользователя", type: "error" });
      return;
    }

    if (response.isOk || response.vk_user_id) {
      setUserData(response.data);
    }
    return response;
  };

  // Method for get user arts
  const handleGetArts = async (page) => {
    const params = `&currentPage=${page ? page + 1 : 1}`;

    const response = await get(`/getMyArts`, params);

    if (!response.isOk) {
      notify({ text: "Ошибка при получении артов", type: "error" });
    }

    const copy = Object.assign({}, response.data);
    if (page) {
      copy.arts = [...artsData.arts].concat(response.data.arts);
    }
    setArtsData(copy);

    return response;
  };

  // Method for get user contests arts
  const handleGetContestsArts = async (page) => {
    const params = `&currentPage=${page ? page + 1 : 1}`;

    const response = await get(`/getMyContestsArts`, params);

    if (!response.isOk) {
      notify({ text: "Ошибка при получении конкурсных артов", type: "error" });
    }

    const copy = Object.assign({}, response.data);
    if (page) {
      copy.arts = [...contestsArtsData.arts].concat(response.data.arts);
    }
    setContestsArtsData(copy);

    return response;
  };

  // Method of users init in rating
  const handleInitUsersRating = async (page) => {
    const params = `&currentPage=${page ? page + 1 : 1}`;

    const response = await get(`/rankedUserRatings`, params);

    if (!response.isOk) {
      notify({
        text: "Ошибка при получении рейтинга пользователей",
        type: "error",
      });
      return;
    }

    let copy = Object.assign({}, usersRating);
    if (page && copy.vk_user_id) {
      copy.users = [...copy.users].concat(response.data.users);
      copy.currentPage = response.data.currentPage;
      copy.worksCount = response.data.worksCount;
      copy.maxPages = response.data.maxPages;
    } else {
      copy = response.data;
    }

    setUsersRating(copy);
    return response;
  };

  // Method for delete art
  const deleteArt = async (hash) => {
    setArtDeleting(true);
    const data = {
      art_id: hash,
    };

    const response = await post(`/deleteArt`, data);

    if (!response.isOk) {
      notify({
        text: "Ошибка при удалении арта",
        type: "error",
      });
      setArtDeleting(false);
      return;
    } else {
      notify({ text: "Арт удалён", type: "standart" });
    }

    const copy = Object.assign({}, artsData);
    const filteredArr = copy.arts.filter((obj) => !obj.artLink.includes(hash));
    copy.arts = filteredArr;

    setArtsData(copy);
    setArtDeleting(false);
    return response;
  };

  const downloadArt = async (url, name) => {
    let totalName = name.length > 60 ? name.slice(0, 60) : name;
    const encodedName = name.replace(/,/g, "");
    if (vk_platform == "desktop_web") {
      const link = document.createElement("a");
      link.href = `https://ubiq.top/downloadArt?url=${url}&name=${encodedName}&${totalParam}`;
      link.target = "_self";
      link.download = totalName;
      link.click();
    } else {
      bridge.send("VKWebAppDownloadFile", {
        url: url,
        filename: `${totalName}.png`,
      });
    }
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

  const postbackUpload = async () => {
    const postback = await post(`/upload`, { isComplete: true });
    if (!postback.isOk) {
      console.log(postback.message);
    }
    return;
  };

  const wallPostBox = async (vk_user_id, image_id) => {
    const result = bridge
      .send("VKWebAppShowWallPostBox", {
        message:
          "Смотрите что у меня получилось сгенерировать в приложении Ubik",
        attachments: `photo${vk_user_id}_${image_id}, https://vk.com/app51573768`,
      })
      .then((data) => {
        if (data.post_id) {
          postbackUpload();
          return "complete";
        }
      })
      .catch((error) => {
        return error;
      });

    return result;
  };

  const storiesPostBox = async (img_url) => {
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
        if (data.result) {
          postbackUpload();
          return "complete";
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

    const data = {
      upload_url: upload_url,
      contest_id: art.contest_id,
      art_id: art.art_id,
    };

    const serverSave = await post(`/upload`, data);
    const saved_photo = await saveToWall(
      access_token,
      fetchedUser.id,
      serverSave.data
    );
    setShareArtLoading(false);

    if (type == "wall") {
      wallPostBox(fetchedUser.id, saved_photo.id);
    } else {
      storiesPostBox(saved_photo.sizes[saved_photo.sizes.length - 1].url);
    }
  };

  const buySubscribe = (item_id) => {
    bridge
      .send("VKWebAppShowOrderBox", {
        type: "item",
        item: item_id,
      })
      .then((data) => {
        if (data.success) {
          // Оплата голосами прошла успешно
          handleInitUser();
          isFirstPage ? goReplace("/") : goBack();
          notify({ text: "Оплата успешно прошла", type: "standart" });
        }
      })
      .catch((error) => {
        // Ошибка
        console.log(error);
      });
  };

  // Method for sending a deeplink of images to private messages
  async function fetchShare(contest_id, art_id) {
    let link = `https://vk.com/app51573768#/contests/contest/${contest_id}/${art_id}`;
    await bridge
      .send("VKWebAppShare", {
        link: link,
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

  const setNotificationVibration = (type) => {
    bridge
      .send("VKWebAppTapticNotificationOccurred", {
        type: type,
      })
      .then((data) => {
        if (data.result) {
          // Информация передана генератору
        }
      })
      .catch((error) => {
        // Ошибка
        console.log(error);
      });
  };

  return (
    <MainContext.Provider
      value={{
        userData,
        artsData,
        fetchedUser,
        router,
        snackbar,
        usersRating,
        payment,
        serverCrash,
        shareArtLoading,
        contestsArtsData,
        isAdmin,
        artDeleting,
        go,
        goReplace,
        goBack,
        handleInitUser,
        handleGetArts,
        sendImgToVK,
        setSnackbar,
        deleteArt,
        fetchShare,
        notify,
        handleInitUsersRating,
        buySubscribe,
        downloadArt,
        setNotificationVibration,
        handleGetContestsArts,
        setShareArtLoading,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
