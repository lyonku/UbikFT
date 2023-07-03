import React, { useContext, useRef } from "react";
import { useClickAway } from "react-use";

import { MainContext } from "components/shared/providers/MainProvider";
import TONlogo from "assets/img/TONlogo2.svg";
import qr from "assets/img/qr.png";

function WalletConnect() {
  const ref = useRef(null);
  const { router, handleContestSelectPopout } = useContext(MainContext);

  useClickAway(
    ref,
    () => {
      router.toBack();
    },
    ["mousedown"]
  );

  const handleGo = () => {
    router.toBack();
    router.toView("contests");
  };

  return (
    <div className={`ContestSelect WalletConnect ${"open"}`} ref={ref}>
      <div
        className="ContestSelect__header"
        onClick={() => router.toBack()}
      ></div>
      <div className="ContestSelect__title title_h3-24px">
        Подключите свой кошелек TON для участия в конкурсе.
      </div>
      <div className="WalletConnect__body ">
        <div className="WalletConnect__wallet">
          <img src={TONlogo} /> <div>TonKeeper</div>
        </div>
        <div className="WalletConnect__steps">
          <div className="WalletConnect__firstStep WalletConnect__step">
            <div className="WalletConnect__numeration">1</div>
            <span>
              Открой приложение Tonkeeper. Если у вас нет приложения, загрузите
              его с{" "}
              <a
                href="https://tonkeeper.com/download/"
                target="_blank"
                className="text_accented"
              >
                официального сайта
              </a>
              .
            </span>
          </div>
          <div className="WalletConnect__secondStep WalletConnect__step">
            <div className="WalletConnect__numeration">2</div>
            <span>
              Откройте приложение Tonkeeper и подключите свой кошелек:
            </span>
          </div>
        </div>
      </div>

      <div className="WalletConnect__qrCode">
        <img src={qr} />
      </div>
      <div className="btn" onClick={handleGo}>
        Продолжить
      </div>
    </div>
  );
}

export default WalletConnect;
