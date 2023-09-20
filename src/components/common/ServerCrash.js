import { PanelSpinner, Spinner } from "@vkontakte/vkui";
import { MainContext } from "components/shared/providers";
import { useContext } from "react";

function ServerCrash() {
  const { serverCrash } = useContext(MainContext);

  return (
    <div className={`ServerCrash ${serverCrash && "active"}`}>
      <div className="ServerCrash__title">
        <Spinner size="large" style={{ color: "#fff" }} />
      </div>
    </div>
  );
}

export default ServerCrash;
