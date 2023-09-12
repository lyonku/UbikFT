import { createContext, useState, useEffect, createRef, useRef } from "react";
import bridge from "@vkontakte/vk-bridge";
import createPrompts from "components/App/features/createPrompts";
import Notify from "components/common/Notify";

export const MainContext = createContext();

export const MainContextProvider = ({ children, router }) => {
  const [error, setError] = useState();
  const [fetchedUser, setUser] = useState(null);

  const [userData, setUserData] = useState({});
  const [payment, setPayment] = useState([]);
  const [usersRating, setUsersRating] = useState({});
  const [artsData, setArtsData] = useState([]);

  const [snackbar, setSnackbar] = useState(null);
  const [serverCrash, setServerCrash] = useState(false);

  const [shareArtLoading, setShareArtLoading] = useState(false);

  let param = window.location.href;
  let totalParam = param.slice(param.indexOf("vk_access"));

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
    handleInitEnergy();
  }, []);

  useEffect(() => {
    if (fetchedUser) {
      handleGetArts();
    }
  }, [fetchedUser]);

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

  const downloadArt = async (url, name) => {
    let totalName = name.length > 60 ? name.slice(0, 60) : name;
    const link = document.createElement("a");

    link.href = `https://ubiq.top/download?url=${url}&name=${totalName}`;
    link.target = "_self";
    link.download = totalName;
    link.click();
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
        fetchedUser,
        router,
        snackbar,
        usersRating,
        payment,
        serverCrash,
        shareArtLoading,
        onStoryChange,
        handleInitUser,
        handleGetArts,
        sendImgToVK,
        setSnackbar,
        deleteArt,
        fetchShare,
        exitPage,
        notify,
        handleInitUsersRating,
        buySubscribe,
        downloadArt,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
