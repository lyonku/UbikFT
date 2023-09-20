import React, { useState, useContext, useEffect } from "react";
import "./Rating.css";

import closeBtn from "assets/img/close-btn.svg";

import { MainContext } from "components/shared/providers/MainProvider";
import Filters from "components/common/Filters";
import RatingItem from "./components/RatingItem";

import RatingInfo from "./components/RatingInfo";
import RatingMain from "./components/RatingMain";
import { Panel, View } from "@vkontakte/vkui";
import {
  useFirstPageCheck,
  useGetPanelForView,
} from "@vkontakte/vk-mini-apps-router";

const Rating = ({ id }) => {
  const activePanel = useGetPanelForView(id);
  const isFirstPage = useFirstPageCheck();

  const { userData, handleInitUsersRating, goBack, goReplace } =
    useContext(MainContext);
  const [currentFilter, setCurrentFilter] = useState(activePanel ?? "");
  const [closeInfo, setCloseInfo] = useState(false);

  const filtersData = [
    { id: "assignment", text: "Задание" },
    { id: "users", text: "Рейтинг" },
  ];

  useEffect(() => {
    if (activePanel !== currentFilter && currentFilter) {
      goReplace("/rating/" + currentFilter);
    }
  }, [currentFilter]);

  useEffect(() => {
    handleInitUsersRating();
  }, []);

  return (
    <View id={id} activePanel={activePanel} style={{ zIndex: 999 }}>
      <Panel id="assignment">
        <div className="Rating">
          <div className="gradient-round"></div>
          <div className="Rating__body">
            <div className="Rating__controls">
              <div
                className="Rating__closeBtn closeBtn"
                onClick={() => {
                  isFirstPage ? goReplace("/") : goBack();
                }}
              >
                <img src={closeBtn} />
              </div>
            </div>
            <Filters
              data={filtersData}
              currentFilter={currentFilter}
              setCurrentFilter={setCurrentFilter}
              defaultFilter={false}
            />
            {!closeInfo && <RatingInfo setCloseInfo={setCloseInfo} />}
            <div className="Rating__tasksBody">
              {userData?.ratingTasks
                ?.map((task, index) => {
                  if (userData?.ratingTasks[0]?.isComplete || index == 0) {
                    return (
                      <div className="Rating__tasks" key={index}>
                        <div className="Rating__title title_h2-32px">
                          {task.title}
                        </div>
                        <div className="Rating__list">
                          {task.mass.map((item, index2) => {
                            return <RatingItem item={item} key={index2} />;
                          })}
                        </div>
                      </div>
                    );
                  }
                })
                .reverse()}
            </div>
          </div>
        </div>
      </Panel>
      <Panel id="users">
        <div className="Rating">
          <div className="gradient-round"></div>
          <div className="Rating__body">
            <div className="Rating__controls">
              <div
                className="Rating__closeBtn closeBtn"
                onClick={() => {
                  isFirstPage ? goReplace("/") : goBack();
                }}
              >
                <img src={closeBtn} />
              </div>
            </div>
            <Filters
              data={filtersData}
              currentFilter={currentFilter}
              setCurrentFilter={setCurrentFilter}
            />
            {!closeInfo && <RatingInfo setCloseInfo={setCloseInfo} />}
            <div className="Rating__tasksBody">
              <RatingMain />
            </div>
          </div>
        </div>
      </Panel>
    </View>
  );
};

export default Rating;
