import React, { useContext, useRef, useState } from "react";
import { useClickAway } from "react-use";
import { ContestsContext, MainContext } from "components/shared/providers";

import closeImg from "assets/img/close-btn.svg";
import InquiryTextarea from "./InquiryTextarea";

function ArtComplaint({ art_id, contest_id, user_id }) {
  const ref = useRef(null);
  const { router } = useContext(MainContext);
  const { sendArtComplaint } = useContext(ContestsContext);

  const [text, setText] = useState("");

  useClickAway(
    ref,
    () => {
      router.toBack();
    },
    ["mousedown"]
  );

  return (
    <div className="promptCopy" ref={ref}>
      <div className="promptCopy__controls">
        <img src={closeImg} onClick={() => router.toBack()} />
      </div>
      <div className="promptCopy__title title_h3-24px">
        Отправьте свою жалобу на работу, <br /> мы готовы вас выслушать
      </div>
      <div className={`promptCopy__body`}>
        <InquiryTextarea
          value={text}
          setValue={setText}
          placeholder={"Опишите вашу претензию"}
        />
        <div
          className="btn"
          onClick={() => {
            sendArtComplaint({
              user_id: user_id,
              text: text,
              art_id: art_id,
              contest_id: contest_id,
            });
            router.toBack();
          }}
        >
          Отправить
        </div>
      </div>
    </div>
  );
}

export default ArtComplaint;
