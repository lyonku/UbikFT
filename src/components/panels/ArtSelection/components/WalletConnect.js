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
        Еще нет кошелька? Не беда, <br /> просто скачайте приложение{" "}
        <img src={TONlogo} />{" "}
        <a href="https://tonkeeper.com/download/" target="_blank">
          TonKeeper
        </a>
        <br />И отсканируте QR-код:
      </div>
      <div className="WalletConnect__qrCode">
        <img src={qr} />
      </div>
    </div>
  );
}

export default WalletConnect;
