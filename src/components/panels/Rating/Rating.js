import React, { useState, useContext, useEffect } from "react";
import "./Rating.css";

import closeBtn from "assets/img/close-btn.svg";

import { MainContext } from "components/shared/providers/MainProvider";
import Filters from "components/common/Filters";
import RatingItem from "./components/RatingItem";

import RatingInfo from "./components/RatingInfo";
import RatingMain from "./components/RatingMain";

const Rating = () => {
  const { router, userData, handleInitUsersRating } = useContext(MainContext);
  const [currentFilter, setCurrentFilter] = useState();
  const [closeInfo, setCloseInfo] = useState(false);

  const filtersData = [
    { id: "assignment", text: "Задание" },
    { id: "rating", text: "Рейтинг" },
  ];

  useEffect(() => {
    handleInitUsersRating();
  }, []);

  return (
    <div className="Rating">
      <div className="gradient-round"></div>
      <div className="Rating__body">
        <div className="Rating__controls">
          <div
            className="Rating__closeBtn closeBtn"
            onClick={() => {
              router.toBack();
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
          {currentFilter == "assignment" ? (
            <>
              {userData?.ratingTasks?.map((task, index) => {
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
              })}
            </>
          ) : (
            <RatingMain />
          )}
        </div>
      </div>
    </div>
  );
};

export default Rating;
