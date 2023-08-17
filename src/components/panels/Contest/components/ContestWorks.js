import React, { useContext } from "react";
import profile__emptyImg from "assets/img/profile__emptyImg.svg";
import ContestWorks__item from "./ContestWorks__item";
import { MainContext } from "components/shared/providers";

function ContestWorks({ currentFilter }) {
  const { activeContest, fetchedUser } = useContext(MainContext);
  return (
    <div className="ContestWorks">
      <div className="ContestWorks__title title_h3-24px">
        {activeContest.type !== "ended" ? (
          <>
            <span className="title_h3-24px">Работы</span>
            <span className="ContestWorks__count title_h3-24px">
              {activeContest?.works?.length}
            </span>
          </>
        ) : (
          <span className="title_h3-24px">Топ 100</span>
        )}
      </div>
      <div className="ContestWorks__body">
        {activeContest?.works?.map((data, index) => {
          if (currentFilter != "My" || data.vk_user_id == fetchedUser.id) {
            return (
              <ContestWorks__item
                index={index + 1}
                key={index}
                data={data}
                currentFilter={currentFilter}
              />
            );
          }
        })}
        {activeContest?.works?.filter(
          (data) => currentFilter !== "My" || data.vk_user_id == fetchedUser.id
        ).length < 1 && (
          <div className="ProfileArts__item_empty ProfileArts__item">
            <img src={profile__emptyImg} />
            Вы ещё не отправляли <br /> арты на конкурс
          </div>
        )}
      </div>
    </div>
  );
}

export default ContestWorks;
