import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./components/App/App";

import Router from "@reyzitwo/react-router-vkminiapps";
import structure from "components/App/routerStructure";

import "./index.css";
import { RouterProvider } from "@vkontakte/vk-mini-apps-router";
import { createHashRouter } from "@vkontakte/vk-mini-apps-router";
import { ConfigProvider } from "@vkontakte/vkui";
import NotFoundPage from "components/common/NotFoundPage";

// Init VK  Mini App
bridge.send("VKWebAppInit");
const router = createHashRouter(structure);

ReactDOM.render(
  <ConfigProvider isWebView appearance="dark">
    <RouterProvider router={router} notFound={<NotFoundPage />}>
      <App />
    </RouterProvider>
  </ConfigProvider>,

  document.getElementById("root")
);
if (process.env.NODE_ENV === "development") {
  import("./eruda").then(({ default: eruda }) => {}); //runtime download
}
