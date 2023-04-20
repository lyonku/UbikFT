import React, { useState, useEffect, useMemo } from "react";
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

  const userList = useMemo(() => imagesPreload(), []);

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send("VKWebAppGetUserInfo");
      setUser(user);
    }
    fetchData();
  }, []);

  useEffect(() => {
    window.addEventListener("popstate", () => goBack());
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

  const goBack = () => {
    if (history.length == 1) {
      // Если в массиве одно значение:
      bridge.send("VKWebAppClose", { status: "success" }); // Отправляем bridge на закрытие сервиса.
    } else if (history.length > 1) {
      history.pop(); // удаляем последний элемент в массиве.
      setActivePanel(history[history.length - 1]); // Изменяем массив с иторией и меняем активную панель.
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

  const handleArtGenerate = (chosenStyles) => {
    setCurrentImg();
    setError();
    generatePrompts(chosenStyles, currentModel, inputValue).then((result) => {
      goToPage("loading");
      postData(result).then((data) => {
        if (data.status == "failed") {
          setError(true);
        } else {
          setCurrentImg(data.output[0]);
        }
      });
    });
  };

  return (
    <ConfigProvider isWebView>
      <AdaptivityProvider>
        <AppRoot>
          {/* <SplitLayout popout={popout}> */}
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
                />
                <PayEnergy id="payEnergy" go={goToPage} />
                <ArtSelection
                  id="artSelection"
                  go={goToPage}
                  currentImg={currentImg}
                />
                <Loading
                  id="loading"
                  go={goToPage}
                  currentImg={currentImg}
                  error={error}
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
