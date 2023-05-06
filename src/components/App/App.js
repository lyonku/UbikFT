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
  const [history, setHistory] = useState(["home"]);
  const [currentNavItem, setCurrentNavItem] = useState("StyleSelection");

  const [currentModel, setCurrentModel] = useState("Protogen");
  const [chosenStyles, setChosenStyles] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [currentImg, setCurrentImg] = useState();

  const [fetchedUser, setUser] = useState(null);
  const [error, setError] = useState();

  const userList = useMemo(() => imagesPreload(), []);

  // Отправляет событие инициализации нативному клиенту
  bridge.send("VKWebAppInit");

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
  }, []);

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

  const goBack = (count) => {
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
      .send("VKWebAppShowOrderBox", {
        action: "item",
        item: "item_id_123456",
      })
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleClearPrompt = () => {
    setChosenStyles({});
    setInputValue("");
  };
  console.log(history);
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
              >
                <Home
                  id="home"
                  go={goToPage}
                  currentModel={currentModel}
                  setCurrentModel={setCurrentModel}
                  inputValue={inputValue}
                  currentNavItem={currentNavItem}
                  setCurrentNavItem={setCurrentNavItem}
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
                  history={history}
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
                  handleClearPrompt={handleClearPrompt}
                  handleArtGenerate={handleArtGenerate}
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
