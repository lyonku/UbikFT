import React, { useState, useEffect } from "react";
const energySvg = (props) => {
  const [currentState, setCurrentState] = useState("");

  useEffect(() => {
    if (props.currentnavitem == "StyleSelection") {
      setCurrentState("#B0E822");
    } else {
      setCurrentState("#ffffff");
    }
  }, [props]);

  return (
    <svg
      width={28}
      height={29}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      id="StyleSelection"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.38 27.427a.585.585 0 0 1-.88-.504v-10.09H4.768a.583.583 0 0 1-.443-.963L16.474 1.697a.585.585 0 0 1 1.026.38v10.09h5.732c.498 0 .767.584.442.963L11.526 27.303a.598.598 0 0 1-.145.124Z"
        id="StyleSelection"
        fill={currentState}
      />
    </svg>
  );
};

export default energySvg;
