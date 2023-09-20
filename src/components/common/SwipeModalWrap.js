import React, { useContext, useEffect, useRef, useState } from "react";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { useClickAway } from "react-use";
import { PopoutWrapper } from "@vkontakte/vkui";

function SwipeModalWrap({ children }) {
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
    <div className="Modal SwipeModal">
      {open && (
        <div className={`SwipeModalWrap ${open}`} ref={ref}>
          <div className="SwipeModalWrap__header" onClick={exit}></div>
          <div className="SwipeModalWrap__body">{children}</div>
        </div>
      )}
    </div>
  );
}

export default SwipeModalWrap;
