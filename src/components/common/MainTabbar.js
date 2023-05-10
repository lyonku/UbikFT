import { Tabbar, TabbarItem } from "@vkontakte/vkui";
import EnergySvg from "components/common/energySvg";
import GallerySvg from "components/common/gallerySvg";
import ArtistsSvg from "components/common/artistsSvg";
import ProfileSvg from "components/common/profileSvg";

function MainTabbar({ onStoryChange, activeStory }) {
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
        selected={activeStory === "gallery"}
        data-story="gallery"
      >
        <GallerySvg color={activeStory === "gallery" ? "#B0E822" : "#fff"} />
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
