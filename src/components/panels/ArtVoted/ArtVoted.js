import React, { useState, useContext } from "react";
import "./ArtVoted.css";
import personalData from "./personalData.json";

import { MainContext } from "components/shared/providers";
import closeBtn from "assets/img/close-btn.svg";
import search from "assets/img/search.svg";
import LikeSvg from "components/common/svgs/LikeSvg";

const ArtVoted = () => {
  const { router } = useContext(MainContext);
  return (
    <div className="ArtVoted">
      <div className="gradient-round"></div>
      <div className="ArtVoted__body">
        <div className="ArtVoted__controls">
          <div
            className="ArtVoted__closeBtn closeBtn"
            onClick={() => {
              router.toBack();
            }}
          >
            <img src={closeBtn} />
          </div>
        </div>
        <div className="ArtVoted__title">Проголосовали за арт</div>
        <div className="ArtVoted__input">
          <div className="ArtVoted__input_img">
            <img src={search} />
          </div>
          <input type="text" placeholder="Поиск участника" />
        </div>
        <div className="ArtVoted__profilesList">
          {personalData.map((person, index) => {
            return (
              <div className="ArtVotedProfile">
                <img
                  className="ArtVotedProfile__img"
                  src={person.img ?? avatar}
                />
                <div className="ArtVotedProfile__name">{person.name}</div>
                <div className="ArtVotedProfile__ArtVoted">
                  <LikeSvg width={"32px"} height={"32px"} full="true" />
                  <div className="ArtVotedProfile__ArtVotedCount">
                    {person.rating}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ArtVoted;
