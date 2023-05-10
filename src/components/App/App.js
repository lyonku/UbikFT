import React, { useState, useMemo, useContext, useEffect } from "react";
import {
  AppRoot,
  ConfigProvider,
  Epic,
  SplitLayout,
  SplitCol,
  Root,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { MainContext } from "components/shared/providers/MainProvider";

import Main from "components/panels/Main";
import Gallery from "components/panels/Gallery";
import Profile from "components/panels/Profile";
import MainTabbar from "components/common/MainTabbar";

import imagesPreload from "components/App/features/images__preload";
import PayEnergy from "components/panels/PayEnergy/PayEnergy";

const App = () => {
  const userList = useMemo(() => imagesPreload(), []);
  const { activeStory, onStoryChange } = useContext(MainContext);

  return (
    <ConfigProvider isWebView>
      <SplitLayout>
        <SplitCol>
          <AppRoot scroll="contain">
            <Epic
              activeStory={activeStory}
              tabbar={
                <MainTabbar
                  onStoryChange={onStoryChange}
                  activeStory={activeStory}
                />
              }
            >
              <Main id="main" />
              <Gallery id="gallery" />
              <Profile id="profile" />
              <PayEnergy id="payEnergy" />
            </Epic>
          </AppRoot>
        </SplitCol>
      </SplitLayout>
    </ConfigProvider>
  );
};

export default App;
