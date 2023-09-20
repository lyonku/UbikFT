import React, { useContext, useState } from "react";
import { ContestsContext, MainContext } from "components/shared/providers";

import InquiryTextarea from "./InquiryTextarea";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

function ArtComplaint({ art_id, contest_id, user_id }) {
  const { sendArtComplaint } = useContext(ContestsContext);
  const routeNavigator = useRouteNavigator();
  const [text, setText] = useState("");

  const sendComplaint = () => {
    sendArtComplaint({
      user_id: user_id,
      text: text,
      art_id: art_id,
      contest_id: contest_id,
    });
    routeNavigator.hidePopout();
  };

  return (
    <div className={`promptCopy__body`}>
      <InquiryTextarea
        value={text}
        setValue={setText}
        placeholder={"Опишите вашу претензию"}
      />
      <div className="btn" onClick={sendComplaint}>
        Отправить
      </div>
    </div>
  );
}

export default ArtComplaint;
