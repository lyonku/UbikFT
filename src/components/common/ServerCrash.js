import { MainContext } from "components/shared/providers";
import { useContext } from "react";

function ServerCrash() {
  const { serverCrash } = useContext(MainContext);

  return (
    <div className={`ServerCrash ${serverCrash && "active"}`}>
      <div className="ServerCrash__title">
        Сервер перезагружается! <br /> повторите позже
      </div>
    </div>
  );
}

export default ServerCrash;
