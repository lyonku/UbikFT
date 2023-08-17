import avatar from "assets/img/galleryItem__avatar.png";
import HeartSvg from "components/common/svgs/heartSvg";
import personalData from "../personalData.json";

function RatingMain() {
  return (
    <div className="Rating__main">
      <div className="Rating__blocks">
        <div className="Rating__block">
          <div className="Rating__block_title">Ваше место в рейтинге</div>
          <div className="Rating__block_text">2131</div>
        </div>
        <div className="Rating__block">
          <div className="Rating__block_title">Ваши очки рейтинга</div>
          <div className="Rating__block_text">
            <span>5312</span>
            <HeartSvg width={"32px"} height={"32px"} />
          </div>
        </div>
      </div>
      <div className="Rating__profilesList">
        {personalData.map((person, index) => {
          return (
            <div className="RatingProfile" key={index}>
              <div className="RatingProfile__number">{index + 1}</div>
              <img className="RatingProfile__img" src={person.img ?? avatar} />
              <div className="RatingProfile__name">{person.name}</div>
              <div className="RatingProfile__rating">
                <HeartSvg width={"32px"} height={"32px"} />
                <div className="RatingProfile__ratingCount">
                  {person.rating}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="Rating__shadow"></div>
    </div>
  );
}

export default RatingMain;
