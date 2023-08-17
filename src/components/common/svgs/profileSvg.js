import React, { useState, useEffect } from "react";

const profileSvg = (props) => {
  return (
    <svg
      width={28}
      height={29}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      id="Profile"
    >
      <path
        d="M14 13.333A4.667 4.667 0 1 0 14 4a4.667 4.667 0 0 0 0 9.333ZM22.845 19.726c.33.383.488.88.488 1.385v1.556A2.333 2.333 0 0 1 21 25H7a2.333 2.333 0 0 1-2.333-2.333V21.11c0-.506.158-1.002.488-1.386A11.64 11.64 0 0 1 14 15.668a11.64 11.64 0 0 1 8.845 4.059Z"
        fill={props.color ?? "#fff"}
        id="Profile"
      />
    </svg>
  );
};

export default profileSvg;
