import React, { useContext } from "react";
import { Tabbar, TabbarItem } from "@vkontakte/vkui";
import EnergySvg from "components/common/svgs/energySvg";
import GallerySvg from "components/common/svgs/gallerySvg";
import ArtistsSvg from "components/common/svgs/artistsSvg";
import ProfileSvg from "components/common/svgs/profileSvg";
import { MainContext } from "components/shared/providers";

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
    </Tabbar>
  );
}

export default MainTabbar;
