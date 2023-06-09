import React, { useState, useContext } from "react";
import "./Profile.css";
import ProfileArt from "./components/ProfileArt";
import { View, Panel } from "@vkontakte/vkui";

import NftLogoSvg from "components/common/nftLogoSvg";

import profile__emptyImg from "assets/img/profile__emptyImg.svg";
import EnergySvg from "components/common/energySvg";

import { MainContext } from "components/shared/providers/MainProvider";

import data from "./data.json";

const Profile = ({ id }) => {
  const { fetchedUser, router, setActiveContest, handleShowSharePopout } =
    useContext(MainContext);

  return (
    <View id={id} activePanel={router.activePanel}>
      <Panel id="profile">
        <div className="Profile">
          <div className="gradient-round"></div>
          <div className="Profile__wrap">
            <div className="Profile__controls">
              <div
                className="Profile__energy smallBtn-text"
                onClick={() => router.toView("payEnergy")}
              >
                <EnergySvg width={"20px"} height={"20px"} />
                100
              </div>
            </div>
            <div className="Profile__body">
              <div className="Profile__title">
                <div className="Profile__avatar ">
                  <img src={fetchedUser?.photo_100} />
                </div>
                <div className="Profile__info ">
                  <div className="Profile__name">
                    {fetchedUser?.first_name + " " + fetchedUser?.last_name}
                  </div>
                  <div className="Profile__links">
                    <a
                      className="Profile__link"
                      href={"https://polygonscan.com/"}
                      target="_blank"
                    >
                      <NftLogoSvg />
                      0xbd3afb0bb76683ecb4225f9dbc91f998713c3b01
                    </a>
                  </div>
                </div>
              </div>
              <div className="ProfileArts">
                <div className="ProfileArts__title title">
                  Ваши <span className="text_accented">работы</span>
                </div>
                {data.length < 1 ? (
                  <div className="ProfileArts__item_empty ProfileArts__item">
                    <img src={profile__emptyImg} />
                    Тут будут ваши арты
                  </div>
                ) : (
                  <div className="ProfileArts__items">
                    {data.map((item, index) => {
                      return <ProfileArt item={item} key={index} />;
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Panel>
    </View>
  );
};

export default Profile;
