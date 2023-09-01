import React, { useState, useContext, useEffect, useRef } from "react";
import "./Profile.css";
import { View, Panel } from "@vkontakte/vkui";
import { MainContext } from "components/shared/providers/MainProvider";

import profile__emptyImg from "assets/img/profile__emptyImg.svg";

import Filters from "components/common/Filters";
import ProfileControls from "./components/ProfileControls";
import ProfileArt from "./components/ProfileArt";
import useInfiniteScroll from "components/shared/hooks/useInfiniteScroll";

const Profile = ({ id }) => {
  const { fetchedUser, router, userData, artsData, handleGetArts } =
    useContext(MainContext);
  const [currentFilter, setCurrentFilter] = useState();
  const filtersData = [
    { id: "New", text: "Недавние работы" },
    { id: "Contest", text: "Конкурсные работы" },
  ];

  useInfiniteScroll({
    сurrentPage: artsData.currentPage,
    func: handleGetArts,
    maxPages: artsData.maxPages,
    className: ".Profile",
  });
  const isContest = artsData?.imgs?.find((item) => item.contest !== "");

  return (
    <View id={id} activePanel={router.activePanel}>
      <Panel id="profile">
        <div className="Profile">
          <div className="gradient-round"></div>
          <div className="Profile__wrap">
            <ProfileControls userData={userData} router={router} />
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
                {!artsData.imgs ||
                artsData.imgs?.length < 1 ||
                (currentFilter == "Contest" && !isContest) ? (
                  <div className="ProfileArts__item_empty ProfileArts__item">
                    <img src={profile__emptyImg} />
                    {currentFilter != "Contest"
                      ? "Тут будут ваши арты"
                      : "Вы еще не отправляли работы на конкурс"}
                  </div>
                ) : (
                  <div className="ProfileArts__items">
                    {artsData.imgs?.map((item, index) => {
                      if (currentFilter != "Contest" || item.contest) {
                        return <ProfileArt item={item} key={index} />;
                      }
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
