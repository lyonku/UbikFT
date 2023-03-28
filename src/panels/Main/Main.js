import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import "./Main.css";
import { Panel } from "@vkontakte/vkui";
import EnergySvg from "components/energySvg";
import GallerySvg from "components/gallerySvg";
import ArtistsSvg from "components/artistsSvg";
import ProfileSvg from "components/profileSvg";
import Artists from "panels/Artists";
import StyleSelection from "panels/StyleSelection";

const Main = ({ id, go, inputValue }) => {
  const [currentNavItem, setCurrentNavItem] = useState("StyleSelection");

  const handleNav = (event) => {
    setCurrentNavItem(event.target.id);
  };

  return (
    <Panel id={id}>
      <div className="mainNav">
        <div className="mainNav__body">
          {currentNavItem == "StyleSelection" ? (
            <StyleSelection inputValue={inputValue} go={go} />
          ) : currentNavItem == "Gallery" ? (
            ""
          ) : currentNavItem == "Artists" ? (
            <Artists />
          ) : (
            ""
          )}
        </div>
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
            <div
              className={`mainNav__item ${
                currentNavItem == "Artists" && "mainNav__item_active"
              }`}
              onClick={handleNav}
              id="Artists"
            >
              <ArtistsSvg currentnavitem={currentNavItem} />
            </div>
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
      </div>
    </Panel>
  );
};

export default Main;
