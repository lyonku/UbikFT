import React, { useState, useRef } from "react";
import "./Profile.css";
import ProfileArt from "./components/ProfileArt";

import editBtn from "assets/img/artSelection__edit.svg";
import vkLogo from "assets/img/vk__logo.png";
import nftLogo from "assets/img/nft__logo.svg";

import galleryItem__background from "assets/img/galleryItem__background.png";
import profile__emptyImg from "assets/img/profile__emptyImg.svg";
import EnergySvg from "components/common/energySvg";

const Profile = ({ id, go, fetchedUser }) => {
  const array = [
    galleryItem__background,
    galleryItem__background,
    galleryItem__background,
  ];

  return (
    <div className="Profile">
      <div className="gradient-round"></div>
      <div className="Profile__wrap">
        <div className="Profile__controls">
          <div className="Profile__backBtn backBtn">
            <img src={editBtn} />
          </div>
          <div
            className="Profile__energy smallBtn-text"
            onClick={() => go("payEnergy")}
          >
            <EnergySvg width={"20px"} height={"20px"} />
            12345
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
              <div className="Profile__rating">Рейтинг: 3</div>
              <div className="Profile__links">
                <a
                  className="Profile__link"
                  href={"https://vk.com/id" + fetchedUser?.id}
                  target="_blank"
                >
                  <img src={vkLogo} />
                  {"@" + fetchedUser?.id}
                </a>
                <div className="Profile__link">
                  <img src={nftLogo} />
                  0xbd3afb0bb76683ecb4225f9dbc91f998713c3b01
                </div>
              </div>
            </div>
          </div>
          <div className="ProfileArts">
            <div className="ProfileArts__title title">
              Последние <span className="title_accented">работы</span>
            </div>
            {array.length < 1 ? (
              <div className="ProfileArts__item_empty ProfileArts__item">
                <img src={profile__emptyImg} />
                Тут будут ваши арты
              </div>
            ) : (
              <div className="ProfileArts__items">
                {array.map((item) => {
                  return <ProfileArt img={item} />;
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
