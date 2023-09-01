import { createContext, useState, useEffect } from "react";
import { PopoutWrapper } from "@vkontakte/vkui";
import ContestSelect from "components/panels/ArtSelection/components/ContestSelect";
import PayConfirm from "components/panels/Contest/components/PayConfirm";
import ShareWorkAlert from "components/common/ShareWorkAlert";
import PromptCopy from "components/common/promptCopy";
import InfoPopout from "components/common/infoPopout";
import SelectArtCount from "components/common/SelectArtCount";
import ArtComplaint from "components/common/ArtComplaint";
import ComplaintsList from "components/common/ComplaintsList";

export const PopoutContext = createContext();

export const PopoutContextProvider = ({ children, router }) => {
  const handleSendLikePopout = ({ art_id, vk_user_id }) => {
    router.toPopout(
      <PopoutWrapper alignY="center" alignX="center">
        <PayConfirm art_id={art_id} vk_user_id={vk_user_id} />
      </PopoutWrapper>
    );
  };

  const handleSetArtCountPopout = () => {
    router.toPopout(
      <PopoutWrapper alignY="center" alignX="center">
        <SelectArtCount />
      </PopoutWrapper>
    );
  };

  const handleShowSharePopout = (art) => {
    router.toPopout(
      <PopoutWrapper alignY="center" alignX="center">
        <ShareWorkAlert art={art} />
      </PopoutWrapper>
    );
  };

  const handleContestSelectPopout = ({ art_id }) => {
    router.toPopout(
      <PopoutWrapper alignY="center" alignX="center">
        <ContestSelect art_id={art_id} />
      </PopoutWrapper>
    );
  };

  const handleInfoPopout = () => {
    router.toPopout(
      <PopoutWrapper alignY="center" alignX="center">
        <InfoPopout />
      </PopoutWrapper>
    );
  };

  const handlePromptCopyPopout = (prompt, styles, pro, seed) => {
    router.toPopout(
      <PopoutWrapper alignY="center" alignX="center">
        <PromptCopy prompt={prompt} styles={styles} pro={pro} seed={seed} />
      </PopoutWrapper>
    );
  };

  const handleShowComplaints = (mass) => {
    router.toPopout(
      <PopoutWrapper alignY="center" alignX="center">
        <ComplaintsList mass={mass} />
      </PopoutWrapper>
    );
  };

  const handleArtComplaint = ({ art_id, contest_id, user_id }) => {
    router.toPopout(
      <PopoutWrapper alignY="center" alignX="center">
        <ArtComplaint
          art_id={art_id}
          contest_id={contest_id}
          user_id={user_id}
        />
      </PopoutWrapper>
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
        handleShowComplaints,
      }}
    >
      {children}
    </PopoutContext.Provider>
  );
};
