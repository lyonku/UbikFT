import React, { useContext, useEffect, useRef, useState } from "react";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import closeBtn from "assets/img/close-btn.svg";
import { useClickAway } from "react-use";
import { ModalPage, PopoutWrapper } from "@vkontakte/vkui";

function ModalWrap({ children, title }) {
  const ref = useRef(null);
  const [open, setOpen] = useState("close");
  const routeNavigator = useRouteNavigator();

  const exit = () => {
    setOpen("close");
    setTimeout(() => {
      routeNavigator.hidePopout();
    }, 250);
  };

  useClickAway(
    ref,
    () => {
      exit();
    },
    ["mousedown"]
  );

  useEffect(() => {
    setTimeout(() => {
      setOpen("open");
    }, 1);
  }, []);

  return (
    <div className="Modal">
      {open && (
        <div className={`ModalWrap ${open}`} ref={ref}>
          <div className="ModalWrap__header">
            <span>{title}</span>
            <div className="ModalWrap__btn smallBtn-text" onClick={exit}>
              <img src={closeBtn} />
            </div>
          </div>
          <div className="ModalWrap__body">{children}</div>
        </div>
      )}
    </div>
  );
}

export default ModalWrap;
