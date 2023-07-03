import React, { useContext } from "react";
import profile__emptyImg from "assets/img/profile__emptyImg.svg";
import ContestWork from "./ContestWork";
import { MainContext } from "components/shared/providers/MainProvider";

function ContestWorks({ contestFilters, time }) {
  const {
    handleSendLikePopout,
    handleShowSharePopout,
    activeContest,
    handleCopyPrompt,
  } = useContext(MainContext);

  return (
    <div className="ContestWorks">
      {activeContest.type == "ended" && (
        <>
          <div className="ContestWorks__title title_h3-24px">
            <span className="title_h3-24px">Победитель</span>
          </div>
          <div className="ContestWorks__body">
            {activeContest.works.map((data, index) => {
              if (data.winner) {
                return (
                  <ContestWork
                    key={index}
                    handleSendLikePopout={handleSendLikePopout}
                    handleShowSharePopout={handleShowSharePopout}
                    handleCopyPrompt={handleCopyPrompt}
                    data={data}
                    activeContest={activeContest}
                  />
                );
              }
            })}
          </div>
        </>
      )}
      <div className="ContestWorks__title title_h3-24px">
        <span className="title_h3-24px">Работы</span>
        <span className="ContestWorks__count title_h3-24px">432</span>
      </div>

      <div className="ContestWorks__body">
        {activeContest.works.map((data, index) => {
          if ((contestFilters != "My" || data.my) && !data.winner) {
            return (
              <ContestWork
                index={index + 1}
                key={index}
                handleSendLikePopout={handleSendLikePopout}
                handleShowSharePopout={handleShowSharePopout}
                handleCopyPrompt={handleCopyPrompt}
                data={data}
                activeContest={activeContest}
              />
            );
          }
        })}
        {activeContest.works.filter(
          (data) => contestFilters !== "My" || data.my
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
