import React, { useState, useContext } from "react";
import "./ArtVoted.css";

import { ContestsContext, MainContext } from "components/shared/providers";
import closeBtn from "assets/img/close-btn.svg";
import search from "assets/img/search.svg";
import LikeSvg from "components/common/svgs/LikeSvg";

const ArtVoted = () => {
  const { router } = useContext(MainContext);
  const { artVoted } = useContext(ContestsContext);
  const [searchQuery, setSearchQuery] = useState("");

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
          <input
            type="text"
            placeholder="Поиск участника"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="ArtVoted__profilesList">
          {artVoted?.personLikes
            ?.filter((person) =>
              // Фильтруем профили по имени и фамилии на основе строки поиска (без учета регистра)
              (person.name + " " + person.surname)
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
            )
            .map((person, index) => {
              return (
                <a
                  className="ArtVotedProfile"
                  key={index}
                  href={`https://vk.com/id${person.vk_user_id}`}
                  target="_blank"
                >
                  <img className="ArtVotedProfile__img" src={person.photo} />
                  <div className="ArtVotedProfile__name">
                    {person.name + " " + person.surname}
                  </div>
                  <div className="ArtVotedProfile__ArtVoted">
                    <LikeSvg width={"32px"} height={"32px"} full="true" />
                    <div className="ArtVotedProfile__ArtVotedCount">
                      {person.postedLike}
                    </div>
                  </div>
                </a>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ArtVoted;
