import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./components/App/App";
import "./index.css";

import { MainContextProvider } from "components/shared/providers/MainProvider";

// Init VK  Mini App
bridge.send("VKWebAppInit");

ReactDOM.render(
  <MainContextProvider>
    <App />
  </MainContextProvider>,
  document.getElementById("root")
);
if (process.env.NODE_ENV === "development") {
  import("./eruda").then(({ default: eruda }) => {}); //runtime download
}
