import HeartSvg from "components/common/svgs/heartSvg";
import closeBtn from "assets/img/close-btn.svg";

function RatingInfo({ setCloseInfo }) {
  return (
    <div className="Rating__info">
      <div className="Rating__img">
        <HeartSvg width={"50px"} height={"50px"} />
      </div>
      <div className="Rating__info_text">
        Выше рейтинг - больше лайков. Выполняй задания, повышай свой рейтинг, и
        определяй победителей в конкурсах
      </div>
      <div className="Rating__info_close" onClick={() => setCloseInfo(true)}>
        <img src={closeBtn} />
      </div>
    </div>
  );
}

export default RatingInfo;
