import React, { useState, useMemo, useContext, useEffect } from "react";
import { withRouter } from "@reyzitwo/react-router-vkminiapps";
import {
  AppRoot,
  ConfigProvider,
  Epic,
  SplitLayout,
  SplitCol,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import { MainContextProvider } from "components/shared/providers/MainProvider";

import Main from "components/panels/Main";
import Contests from "components/panels/Contests";
import Profile from "components/panels/Profile";
import MainTabbar from "components/common/MainTabbar";

import PayEnergy from "components/panels/PayEnergy/";

const App = (props) => {
  return (
    <MainContextProvider router={props.router}>
      <ConfigProvider isWebView>
        <SplitLayout popout={props.router.popout}>
          <SplitCol>
            <AppRoot scroll="contain">
              <Epic
                activeStory={props.router.activeView}
                tabbar={<MainTabbar activeStory={props.router.activeView} />}
              >
                <Main id="main" />
                <Contests id="contests" />
                <Profile id="profile" />
                <PayEnergy id="payEnergy" />
              </Epic>
            </AppRoot>
          </SplitCol>
        </SplitLayout>
      </ConfigProvider>
    </MainContextProvider>
  );
};

export default withRouter(App);
