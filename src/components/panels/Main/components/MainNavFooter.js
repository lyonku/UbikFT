import React, { useEffect } from "react";
import EnergySvg from "components/common/svgs/energySvg";
import GallerySvg from "components/common/svgs/gallerySvg";
import ArtistsSvg from "components/common/svgs/artistsSvg";
import ProfileSvg from "components/common/svgs/profileSvg";

function MainNavFooter({ currentNavItem, setCurrentNavItem, go, id }) {
  const handleNav = (event) => {
    if (id == "home") {
      go("main");
    }
    setCurrentNavItem(event.target.id);
  };

  useEffect(() => {
    if (id == "home") {
      setCurrentNavItem("StyleSelection");
    }
  }, [id]);

  return (
    <div className="mainNav__footer">
      <div className="mainNav__wrap">
        <div
          className={`mainNav__item ${
            currentNavItem == "StyleSelection" && "mainNav__item_active"
          }`}
          onClick={handleNav}
          id="StyleSelection"
        >
          <EnergySvg currentnavitem={currentNavItem} id="StyleSelection" />
        </div>
        <div
          className={`mainNav__item ${
            currentNavItem == "Gallery" && "mainNav__item_active"
          }`}
          onClick={handleNav}
          id="Gallery"
        >
          <GallerySvg currentnavitem={currentNavItem} />
        </div>
        {/* <div
          className={`mainNav__item ${
            currentNavItem == "Artists" && "mainNav__item_active"
          }`}
          onClick={handleNav}
          id="Artists"
        >
          <ArtistsSvg currentnavitem={currentNavItem} />
        </div> */}
        <div
          className={`mainNav__item ${
            currentNavItem == "Profile" && "mainNav__item_active"
          }`}
          onClick={handleNav}
          id="Profile"
        >
          <ProfileSvg currentnavitem={currentNavItem} />
        </div>
      </div>
    </div>
  );
}

export default MainNavFooter;
