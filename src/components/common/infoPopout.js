import React, { useContext, useRef } from "react";
import { useClickAway } from "react-use";
import { MainContext } from "components/shared/providers/MainProvider";

function InfoPopout() {
  const ref = useRef(null);
  const { router } = useContext(MainContext);

  useClickAway(
    ref,
    () => {
      router.toBack();
    },
    ["mousedown"]
  );

  return (
    <div className="InfoPopout" ref={ref}>
      Участие в творческом конкурсе бесплатное. <br /> Если работа нарушает
      закон и/или нормы этики, то она не будет допущена до участия в конкурсе
      или удалена уже после допуска. <br /> Разработчик оставляет за собой право
      удалить любую работу без объяснения причин.
    </div>
  );
}

export default InfoPopout;
