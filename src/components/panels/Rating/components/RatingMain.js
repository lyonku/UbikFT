import HeartSvg from "components/common/svgs/heartSvg";
import { MainContext } from "components/shared/providers";
import { useContext, useEffect } from "react";
import useInfiniteScroll from "components/shared/hooks/useInfiniteScroll";

function RatingMain() {
  const { router, userData, usersRating, handleInitUsersRating } =
    useContext(MainContext);

  useInfiniteScroll({
    сurrentPage: usersRating.currentPage,
    func: handleInitUsersRating,
    maxPages: usersRating.maxPages,
    className: ".Rating",
  });

  return (
    <div className="Rating__main">
      <div className="Rating__blocks">
        <div className="Rating__block">
          <div className="Rating__block_title">Ваше место в рейтинге</div>
          <div className="Rating__block_text">
            {usersRating?.currentPosition}
          </div>
        </div>
        <div className="Rating__block">
          <div className="Rating__block_title">Ваши очки рейтинга</div>
          <div className="Rating__block_text">
            <span>{userData.rating}</span>
            <HeartSvg width={"32px"} height={"32px"} />
          </div>
        </div>
      </div>
      <div className="Rating__profilesList">
        {usersRating?.users?.map((person, index) => {
          return (
            <a
              className="RatingProfile"
              key={index}
              href={`https://vk.com/id${person.id}`}
              target="_blank"
            >
              <div className="RatingProfile__number">{index + 1}</div>
              <img
                className="RatingProfile__img"
                src={person.photo_100 ?? ""}
              />
              <div className="RatingProfile__name">
                {person.first_name + " " + person.last_name}
              </div>
              <div className="RatingProfile__rating">
                <HeartSvg width={"32px"} height={"32px"} />
                <div className="RatingProfile__ratingCount">
                  {person.rating}
                </div>
              </div>
            </a>
          );
        })}
      </div>
      <div className="Rating__shadow"></div>
    </div>
  );
}

export default RatingMain;
