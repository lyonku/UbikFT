import React, { useState, useEffect, useMemo, useCallback } from "react";
import bridge from "@vkontakte/vk-bridge";
import {
  View,
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  SplitLayout,
  SplitCol,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import Home from "components/panels/Home";
import Inquiry from "components/panels/Inquiry";
import Main from "components/panels/Main";
import PayEnergy from "components/panels/PayEnergy";
import Loading from "components/panels/Loading";
import ArtSelection from "components/panels/ArtSelection";

import imagesPreload from "components/App/features/images__preload";
import generatePrompts from "components/App/features/generatePrompts";

const App = () => {
  const [activePanel, setActivePanel] = useState("home");
  const [fetchedUser, setUser] = useState(null);
  const [history, setHistory] = useState(["home"]);
  const [inputValue, setInputValue] = useState("");
  const [currentNavItem, setCurrentNavItem] = useState("StyleSelection");
  const [currentModel, setCurrentModel] = useState("Protogen");
  const [currentImg, setCurrentImg] = useState();
  const [error, setError] = useState();
  const [chosenStyles, setChosenStyles] = useState({});
  const [param, setParam] = useState();

  const [alertClose, setAlertClose] = useState(false);
  const [showNotificationDelete, setShowNotificationDelete] = useState(false);

  const userList = useMemo(() => imagesPreload(), []);

  // Отправляет событие инициализации нативному клиенту
  bridge.send("VKWebAppInit");

  useEffect(() => {
    bridge
      .send("VKWebAppGetLaunchParams")
      .then((data) => {
        if (data.vk_app_id) {
          setParam(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send("VKWebAppGetUserInfo");
      setUser(user);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const handlePopstate = () => goBack();
    window.addEventListener("popstate", handlePopstate);

    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, [alertClose, activePanel]);

  const handleSwipeBackStartForPreventIfNeeded = useCallback(
    (count) => {
      if (activePanel === "artSelection") {
        window.history.pushState(null, null, window.location.pathname);
        if (alertClose) {
          setShowNotificationDelete(false);
          setAlertClose();
          return;
        }
        setShowNotificationDelete(true);
        return "prevent";
      }
    },
    [alertClose, activePanel]
  );

  function goToPage(name) {
    if (history[history.length - 1] != name) {
      // В качестве аргумента принимаем id панели для перехода
      setActivePanel(name); // Меняем активную панель

      if (name != "loading") {
        if (name == "home") {
          setHistory(["home"]);
        } else {
          window.history.pushState({ panel: name }, name); // Создаём новую запись в истории браузера
          history.push(name); // Добавляем панель в историю
        }
      }
    }
  }

  const goBack = (count, resultClose) => {
    let result = handleSwipeBackStartForPreventIfNeeded(count);

    if (result != "prevent") {
      setAlertClose();
      if (history.length == 1) {
        // Если в массиве одно значение:
        bridge.send("VKWebAppClose", { status: "success" }); // Отправляем bridge на закрытие сервиса.
      } else if (history.length > 1) {
        if (count) {
          history.splice(-count);
          setActivePanel(history[history.length - 1]);
        } else {
          history.pop(); // удаляем последний элемент в массиве.
          setActivePanel(history[history.length - 1]); // Изменяем массив с иторией и меняем активную панель.
        }
      }
    }
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

  const handleArtGenerate = async () => {
    setCurrentImg();
    setError();
    goToPage("loading");

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

  const buySubscribe = () => {
    bridge
      .send("VKWebAppShowSubscriptionBox", {
        action: "create",
        item: "subscription_in-app_id",
      })
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(error); // Ошибка
      });
  };

  return (
    <ConfigProvider isWebView>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout>
            <SplitCol>
              <View
                activePanel={activePanel}
                history={history}
                onSwipeBack={goBack}
                onSwipeBackStart={handleSwipeBackStartForPreventIfNeeded}
              >
                <Home
                  id="home"
                  go={goToPage}
                  currentModel={currentModel}
                  setCurrentModel={setCurrentModel}
                />
                <Inquiry
                  id="inquiry"
                  go={goToPage}
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                />
                <Main
                  id="main"
                  inputValue={inputValue}
                  go={goToPage}
                  currentNavItem={currentNavItem}
                  setCurrentNavItem={setCurrentNavItem}
                  fetchedUser={fetchedUser}
                  handleArtGenerate={handleArtGenerate}
                  chosenStyles={chosenStyles}
                  setChosenStyles={setChosenStyles}
                  goBack={goBack}
                />
                <PayEnergy
                  id="payEnergy"
                  go={goToPage}
                  buySubscribe={buySubscribe}
                />
                <ArtSelection
                  id="artSelection"
                  go={goToPage}
                  currentImg={currentImg}
                  goBack={goBack}
                  setShowNotificationDelete={setShowNotificationDelete}
                  showNotificationDelete={showNotificationDelete}
                  setAlertClose={setAlertClose}
                  alertClose={alertClose}
                />
                <Loading
                  id="loading"
                  go={goToPage}
                  currentImg={currentImg}
                  error={error}
                  handleArtGenerate={handleArtGenerate}
                />
              </View>
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

export default App;