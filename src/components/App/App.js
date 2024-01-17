import React, { useState, useMemo, useContext, useEffect } from "react";
import { AppRoot, Epic, SplitLayout, SplitCol } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { notification } from "antd";

import {
  AdminContextProvider,
  ContestsContextProvider,
  GenerateContextProvider,
  MainContextProvider,
  PopoutContextProvider,
} from "components/shared/providers";

import Main from "components/panels/Main";
import Contests from "components/panels/Contests";
import Profile from "components/panels/Profile";
import MainTabbar from "components/common/MainTabbar";

import PayEnergy from "components/panels/PayEnergy/";
import Rating from "components/panels/Rating/";
import ArtVoted from "components/panels/ArtVoted/ArtVoted";
import Snackbar from "./Snackbar";
import Admin from "components/panels/Admin";

import {
  useActiveVkuiLocation,
  usePopout,
} from "@vkontakte/vk-mini-apps-router";

const App = (props) => {
  const [api, contextHolder] = notification.useNotification();
  const { view } = useActiveVkuiLocation();
  const routerPopout = usePopout();
  const queryParameters = new URLSearchParams(window.location.search);
  const vk_platform = queryParameters.get("vk_platform");

  return (
    <MainContextProvider api={api}>
      <PopoutContextProvider>
        <GenerateContextProvider>
          <ContestsContextProvider>
            <AdminContextProvider>
              <SplitLayout popout={routerPopout}>
                <>
                  {contextHolder}
                  {/* <Snackbar /> */}
                  {/* <ServerCrash /> */}
                  <SplitCol>
                    <AppRoot
                      scroll="contain"
                      className={`${
                        vk_platform == "mobile_iphone" ? "iphone" : ""
                      }`}
                    >
                      <Epic
                        activeStory={view}
                        tabbar={<MainTabbar activeStory={view} />}
                      >
                        <Main id="main" />
                        <Contests id="contests" />
                        <Profile id="profile" />
                        <PayEnergy id="store" />
                        <Rating id="rating" />
                        <ArtVoted id="artVoted" />
                        <Admin id="admin" />
                      </Epic>
                    </AppRoot>
                  </SplitCol>
                </>
              </SplitLayout>
            </AdminContextProvider>
          </ContestsContextProvider>
        </GenerateContextProvider>
      </PopoutContextProvider>
    </MainContextProvider>
  );
};

export default App;
