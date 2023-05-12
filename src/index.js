import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./components/App/App";

import Router from "@reyzitwo/react-router-vkminiapps";
import structure from "components/App/routerStructure";

import "./index.css";

// Init VK  Mini App
bridge.send("VKWebAppInit");

ReactDOM.render(
  <Router structure={structure}>
    <App />
  </Router>,
  document.getElementById("root")
);
if (process.env.NODE_ENV === "development") {
  import("./eruda").then(({ default: eruda }) => {}); //runtime download
}
