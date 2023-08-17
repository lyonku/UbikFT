import { createContext, useState, useEffect } from "react";
import { PopoutWrapper } from "@vkontakte/vkui";
import ContestSelect from "components/panels/ArtSelection/components/ContestSelect";
import PayConfirm from "components/panels/Contest/components/PayConfirm";
import ShareWorkAlert from "components/common/ShareWorkAlert";
import WalletConnect from "components/panels/ArtSelection/components/WalletConnect";
import PromptCopy from "components/common/promptCopy";
import InfoPopout from "components/common/infoPopout";
import SelectArtCount from "components/common/SelectArtCount";
import ChestPrizes from "components/common/ChestPrizes";

export const PopoutContext = createContext();

export const PopoutContextProvider = ({ children, router }) => {
  const handleSendLikePopout = () => {
    router.toPopout(
      <PopoutWrapper alignY="center" alignX="center">
        <PayConfirm />
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

  const handleShowSharePopout = (props) => {
    router.toPopout(
      <PopoutWrapper alignY="center" alignX="center">
        <ShareWorkAlert props={props} />
      </PopoutWrapper>
    );
  };

  const handleContestSelectPopout = (props) => {
    console.log("props", props);
    router.toPopout(
      <PopoutWrapper alignY="center" alignX="center">
        <ContestSelect accept={props?.accept ?? false} img={props?.img} />
      </PopoutWrapper>
    );
  };

  //   Maybe delete in future
  const handleWalletConnectPopout = () => {
    router.toPopout(
      <PopoutWrapper alignY="center" alignX="center">
        <WalletConnect />
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

  const handleChestPrizesPopout = () => {
    router.toPopout(
      <PopoutWrapper alignY="center" alignX="center">
        <ChestPrizes />
      </PopoutWrapper>
    );
  };

  const handlePromptCopyPopout = (prompt, styles, pro) => {
    router.toPopout(
      <PopoutWrapper alignY="center" alignX="center">
        <PromptCopy prompt={prompt} styles={styles} pro={pro} />
      </PopoutWrapper>
    );
  };

  return (
    <PopoutContext.Provider
      value={{
        handleSendLikePopout,
        handleShowSharePopout,
        handleContestSelectPopout,
        handleWalletConnectPopout,
        handleInfoPopout,
        handlePromptCopyPopout,
        handleSetArtCountPopout,
        handleChestPrizesPopout,
      }}
    >
      {children}
    </PopoutContext.Provider>
  );
};
