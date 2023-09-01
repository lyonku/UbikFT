import checkMark from "assets/img/checkMark.svg";
import errorMark from "assets/img/errorMark.svg";
import { useContext, useEffect, useState } from "react";

function Notify({ text, type }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true);
    setTimeout(() => {
      setActive(false);
    }, 4000);
  }, []);

  return (
    <div className={`Notification ${active && "open"} ${type}`}>
      <img src={type == "error" ? errorMark : checkMark} />
      <span>{text}</span>
    </div>
  );
}

export default Notify;
