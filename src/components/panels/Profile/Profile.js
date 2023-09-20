import React, { useState, useContext, useEffect, useRef } from "react";
import "./Profile.css";
import { View, Panel } from "@vkontakte/vkui";
import { MainContext } from "components/shared/providers/MainProvider";

import profile__emptyImg from "assets/img/profile__emptyImg.svg";

import Filters from "components/common/Filters";
import ProfileArt from "./components/ProfileArt";
import useInfiniteScroll from "components/shared/hooks/useInfiniteScroll";
import { useGetPanelForView } from "@vkontakte/vk-mini-apps-router";
import HeaderControls from "components/common/HeaderControls";

const Profile = ({ id }) => {
  const activePanel = useGetPanelForView(id);
  const {
    fetchedUser,
    contestsArtsData,
    artsData,
    handleGetArts,
    handleGetContestsArts,
  } = useContext(MainContext);
  const [currentFilter, setCurrentFilter] = useState();
  const filtersData = [
    { id: "New", text: "Недавние работы" },
    { id: "Contest", text: "Конкурсные работы" },
  ];

  const isContestArts = contestsArtsData.arts?.length >= 1;
  const isArts = artsData?.arts?.length >= 1;
  const isFilterContest = currentFilter == "Contest";
  const isFilterNew = currentFilter == "New";

  useInfiniteScroll({
    сurrentPage: isFilterContest
      ? contestsArtsData.currentPage
      : artsData.currentPage,
    func: isFilterContest ? handleGetContestsArts : handleGetArts,
    maxPages: isFilterContest ? contestsArtsData.maxPages : artsData.maxPages,
    className: ".Profile",
  });

  return (
    <View id={id} activePanel={activePanel}>
      <Panel id="profile">
        <div className="Profile">
          <div className="gradient-round"></div>
          <div className="Profile__wrap">
            <div className="Profile__controls">
              <HeaderControls />
            </div>
            <div className="Profile__body">
              <div className="Profile__title">
                <img src={fetchedUser?.photo_100} className="Profile__avatar" />
                <div className="Profile__info ">
                  <div className="Profile__name">
                    {fetchedUser?.first_name + " " + fetchedUser?.last_name}
                  </div>
                </div>
              </div>
              <div className="ProfileArts">
                <div className="ProfileArts__title title">
                  Ваши <span className="text_accented">работы</span>
                </div>
                <Filters
                  data={filtersData}
                  currentFilter={currentFilter}
                  setCurrentFilter={setCurrentFilter}
                />
                {currentFilter == "New" ? (
                  <div className="inquiry__hint transparentBlock">
                    Работы хранятся в течение{" "}
                    <span className="text_accented">семи дней</span>, чтобы
                    сохранить работу вы можете разместить ее у себя на стене.
                  </div>
                ) : (
                  <div className="inquiry__hint transparentBlock">
                    Работы хранятся до{" "}
                    <span className="text_accented">завершения конкурса</span>,
                    чтобы сохранить работу вы можете разместить ее у себя на
                    стене.
                  </div>
                )}
                {(!isContestArts && isFilterContest) ||
                (!isArts && isFilterNew) ? (
                  <div className="ProfileArts__item_empty ProfileArts__item">
                    <img src={profile__emptyImg} />
                    {isFilterContest
                      ? "Тут будут ваши арты"
                      : "Вы еще не отправляли работы на конкурс"}
                  </div>
                ) : (
                  <div className="ProfileArts__items">
                    {currentFilter !== "Contest"
                      ? artsData.arts?.map((item, index) => {
                          return <ProfileArt item={item} key={index} />;
                        })
                      : contestsArtsData.arts?.map((item, index) => {
                          return (
                            <ProfileArt
                              item={item}
                              key={index}
                              inContest={true}
                            />
                          );
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
