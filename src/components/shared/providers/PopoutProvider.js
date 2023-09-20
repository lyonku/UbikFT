import { createContext, useState, useEffect, useContext } from "react";
import ContestSelect from "components/panels/ArtSelection/components/ContestSelect";
import PayConfirm from "components/panels/Contest/components/PayConfirm";
import ShareWorkAlert from "components/common/ShareWorkAlert";
import PromptCopy from "components/common/promptCopy";
import InfoPopout from "components/common/infoPopout";
import SelectArtCount from "components/common/SelectArtCount";
import ArtComplaint from "components/common/ArtComplaint";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import ModalWrap from "components/common/ModalWrap";
import SwipeModalWrap from "components/common/SwipeModalWrap";
import OutOfEnergy from "components/common/OutOfEnergy";
import { MainContext } from "./MainProvider";
import DeleteContestArt from "components/common/DeleteContestArt";

export const PopoutContext = createContext();

export const PopoutContextProvider = ({ children }) => {
  const routeNavigator = useRouteNavigator();
  const { userData, setNotificationVibration } = useContext(MainContext);

  const handleSendLikePopout = (props) => {
    routeNavigator.showPopout(
      <SwipeModalWrap>
        <PayConfirm
          art_id={props.art_id}
          liked_user_id={props.liked_user_id}
          isLikeSet={props.isLikeSet}
          isArtLiked={props.isArtLiked}
        />
      </SwipeModalWrap>
    );
  };

  const handleSetArtCountPopout = (props) => {
    if (userData.energy == 0) {
      setNotificationVibration("error");
    }

    routeNavigator.showPopout(
      <SwipeModalWrap>
        {userData.energy == 0 ? (
          <OutOfEnergy />
        ) : (
          <SelectArtCount from={props?.from} />
        )}
      </SwipeModalWrap>
    );
  };

  const handleShowSharePopout = (art) => {
    routeNavigator.showPopout(
      <ModalWrap title="Поделится работой">
        <ShareWorkAlert art={art} />
      </ModalWrap>
    );
  };

  const handleContestSelectPopout = ({ art_id }) => {
    routeNavigator.showPopout(
      <SwipeModalWrap>
        <ContestSelect art_id={art_id} />
      </SwipeModalWrap>
    );
  };

  const handleInfoPopout = () => {
    routeNavigator.showPopout(
      <ModalWrap title="Правила использования сервиса">
        <InfoPopout />
      </ModalWrap>
    );
  };

  const handleDeleteContestArt = ({ art_id, contest_id, user_id }) => {
    routeNavigator.showPopout(
      <ModalWrap title="Вы уверены что хотите удалить арт из конкурса?">
        <DeleteContestArt
          art_id={art_id}
          contest_id={contest_id}
          user_id={user_id}
        />
      </ModalWrap>
    );
  };

  const handlePromptCopyPopout = (data) => {
    routeNavigator.showPopout(
      <ModalWrap title="Параметры:">
        <PromptCopy data={data} />
      </ModalWrap>
    );
  };

  const handleArtComplaint = ({ art_id, contest_id, user_id }) => {
    routeNavigator.showPopout(
      <ModalWrap title="Отправьте свою жалобу на работу, мы готовы вас выслушать">
        <ArtComplaint
          art_id={art_id}
          contest_id={contest_id}
          user_id={user_id}
        />
      </ModalWrap>
    );
  };

  return (
    <PopoutContext.Provider
      value={{
        handleSendLikePopout,
        handleShowSharePopout,
        handleContestSelectPopout,
        handleInfoPopout,
        handlePromptCopyPopout,
        handleSetArtCountPopout,
        handleArtComplaint,
        handleDeleteContestArt,
      }}
    >
      {children}
    </PopoutContext.Provider>
  );
};
