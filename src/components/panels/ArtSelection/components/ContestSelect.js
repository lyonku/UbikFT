import React, { useContext } from "react";

import {
  ContestsContext,
  MainContext,
  PopoutContext,
} from "components/shared/providers/";
import { Spinner } from "@vkontakte/vkui";

function ContestSelect({ art_id }) {
  const { go, handleGetArts, handleGetContestsArts, handleInitUser } =
    useContext(MainContext);
  const { contests, setActiveContest, addArtToContest, artToContestLoading } =
    useContext(ContestsContext);

  const sendArtToContest = (item) => {
    addArtToContest(item.id, art_id).then(() => {
      go(`/contests/contest/${item.id}`);
      setActiveContest(item);
      handleGetArts();
      handleGetContestsArts();
      handleInitUser();
    });
  };

  return (
    <div className="ContestSelect__items">
      {contests?.map((item, index) => {
        if (item?.type == "workAcceptance") {
          return (
            <div
              key={index}
              className="ContestSelectItem"
              style={{
                background: `no-repeat center/cover url(${item.backgroundLink})`,
              }}
            >
              <div className="ContestSelectItem__title title_h3-24px">
                {item.name}
              </div>
              <div className="ContestSelectItem__text text_gray">
                {item.desc}
              </div>
              <div
                className="ContestSelectItem__btn btn"
                onClick={() => {
                  if (!artToContestLoading.loading) {
                    sendArtToContest(item);
                  }
                }}
              >
                {artToContestLoading?.contest_id == item.id && (
                  <Spinner
                    size="regular"
                    style={{
                      width: "auto",
                      color: "#fff",
                      marginRight: "10px",
                    }}
                  />
                )}
                <span> Отправить на конкурс</span>
              </div>
            </div>
          );
        }
      })}
      {!contests?.find((item) => item.type == "workAcceptance") && (
        <div className="ContestSelectItem">
          <div className="ContestSelectItem__title title_h3-24px">
            Пустовато
          </div>
          <div className="ContestSelectItem__text text_gray">
            Скоро будут новые конкурсы
          </div>
        </div>
      )}
    </div>
  );
}

export default ContestSelect;
