import React, { useState, useEffect } from "react";
import bridge from "@vkontakte/vk-bridge";
import {
  View,
  ScreenSpinner,
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  SplitLayout,
  SplitCol,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import Home from "./panels/Home";
import Inquiry from "./panels/Inquiry";
import Main from "./panels/Main";
import PayEnergy from "./panels/PayEnergy";

const App = () => {
  const [activePanel, setActivePanel] = useState("home");
  const [fetchedUser, setUser] = useState(null);
  const [popout, setPopout] = useState(<ScreenSpinner size="large" />);
  const [history, setHistory] = useState(["home"]); // Заносим начальную панель в массив историй.
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send("VKWebAppGetUserInfo");
      setUser(user);

      setPopout(null);
    }
    fetchData();
  }, []);

  const go = (e) => {
    setActivePanel(e.currentTarget.dataset.to);
  };

  useEffect(() => {
    window.addEventListener("popstate", () => goBack());
  }, []);

  function goToPage(name) {
    if (history[history.length - 1] != name) {
      // В качестве аргумента принимаем id панели для перехода
      window.history.pushState({ panel: name }, name); // Создаём новую запись в истории браузера
      console.log(window.history);
      setActivePanel(name); // Меняем активную панель
      history.push(name); // Добавляем панель в историю
    }
  }

  const goBack = () => {
    if (history.length === 1) {
      // Если в массиве одно значение:
      bridge.send("VKWebAppClose", { status: "success" }); // Отправляем bridge на закрытие сервиса.
    } else if (history.length > 1) {
      history.pop(); // удаляем последний элемент в массиве.
      setActivePanel(history[history.length - 1]); // Изменяем массив с иторией и меняем активную панель.
    }
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
                <Home id="home" go={goToPage} />
                <Inquiry
                  id="inquiry"
                  go={goToPage}
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                />
                <Main id="main" inputValue={inputValue} go={goToPage} />
                <PayEnergy id="payEnergy" />
              </View>
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

export default App;
