import React, { useContext } from "react";
import { Tabbar, TabbarItem } from "@vkontakte/vkui";
import EnergySvg from "components/common/svgs/energySvg";
import GallerySvg from "components/common/svgs/gallerySvg";
import ProfileSvg from "components/common/svgs/profileSvg";
import {
  ContestsContext,
  GenerateContext,
  MainContext,
} from "components/shared/providers";
import { Icon24GearOutline } from "@vkontakte/icons";
function MainTabbar({ activeStory }) {
  const { go, isAdmin } = useContext(MainContext);
  const { currentImg, generation } = useContext(GenerateContext);
  const { activeContest } = useContext(ContestsContext);

  const onStoryChange = (e) => {
    let src = e.currentTarget.dataset.story;
    if (activeContest.id && src == "contests") {
      src += `/contest/${activeContest.id}`;
    }
    if (currentImg.length >= 1 && src === "main") {
      src = `artSelection`;
    }
    if (src === "main" && generation) {
      src = `loading`;
    }
    go("/" + src);
  };

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
      {isAdmin && (
        <TabbarItem
          onClick={onStoryChange}
          selected={activeStory === "admin"}
          data-story="admin"
          className="Tabbar__admin"
        >
          <Icon24GearOutline
            color={activeStory === "admin" ? "#B0E822" : "#fff"}
            width={25}
            height={25}
          />
        </TabbarItem>
      )}
    </Tabbar>
  );
}

export default MainTabbar;
