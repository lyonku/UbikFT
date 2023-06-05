import React, { useContext } from "react";
import { Tabbar, TabbarItem } from "@vkontakte/vkui";
import EnergySvg from "components/common/energySvg";
import GallerySvg from "components/common/gallerySvg";
import ArtistsSvg from "components/common/artistsSvg";
import ProfileSvg from "components/common/profileSvg";
import { MainContext } from "components/shared/providers/MainProvider";

function MainTabbar({ activeStory }) {
  const { onStoryChange } = useContext(MainContext);

  return (
    <Tabbar className="Tabbar">
      <TabbarItem
        className="TabbarItem"
        onClick={onStoryChange}
        selected={activeStory === "main"}
        data-story="main"
      >
        <EnergySvg color={activeStory === "main" ? "#B0E822" : "#fff"} />
      </TabbarItem>
      <TabbarItem
        onClick={onStoryChange}
        selected={activeStory === "contests"}
        data-story="contests"
      >
        <GallerySvg color={activeStory === "contests" ? "#B0E822" : "#fff"} />
      </TabbarItem>
      <TabbarItem
        onClick={onStoryChange}
        selected={activeStory === "profile"}
        data-story="profile"
      >
        <ProfileSvg color={activeStory === "profile" ? "#B0E822" : "#fff"} />
      </TabbarItem>
      <TabbarItem
        onClick={onStoryChange}
        selected={activeStory === "debug"}
        data-story="debug"
      >
        <div style={{ color: activeStory === "debug" ? "#B0E822" : "#fff" }}>
          DEBUG
        </div>
      </TabbarItem>
    </Tabbar>
  );
}

export default MainTabbar;
