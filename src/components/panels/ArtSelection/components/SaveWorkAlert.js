import React, { useRef, useEffect } from "react";
import { useClickAway } from "react-use";
import closeBtn from "assets/img/close-btn.svg";

const SaveWorkAlert = ({
  goBack,
  setShowNotificationDelete,
  showNotificationDelete,
  setAlertClose,
  alertClose,
}) => {
  const ref = useRef(null);

  useClickAway(ref, () => {
    setShowNotificationDelete(false);
  });

  useEffect(() => {
    if (alertClose) {
      goBack(3);
    }
  }, [alertClose]);

  return (
    <div
      className={`ArtSelection__notification Notification ${
        showNotificationDelete && "open"
      }`}
      ref={ref}
    >
      <div className="ArtSelection__notification-header">
        <span>Сохранить работу?</span>
        <div
          className="ArtSelection__close smallBtn-text"
          onClick={() => {
            setShowNotificationDelete(false);
          }}
        >
          <img src={closeBtn} />
        </div>
      </div>

      <div className="ArtSelection__notification-btns">
        <div
          className="ArtSelection__notification-btn_leave"
          onClick={() => {
            setAlertClose(true);
            setShowNotificationDelete(false);
          }}
        >
          Нет
        </div>
        <div
          className="ArtSelection__notification-btn_stay"
          onClick={() => {
            setAlertClose(true);
            setShowNotificationDelete(false);
          }}
        >
          Да
        </div>
      </div>
    </div>
  );
};

export default SaveWorkAlert;
