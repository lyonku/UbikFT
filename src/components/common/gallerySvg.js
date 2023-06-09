import React, { useState, useEffect } from "react";

const GallerySvg = (props) => {
  return (
    <svg
      width={28}
      height={29}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      id="Gallery"
    >
      <rect
        x={2.625}
        y={4.5}
        width={10.35}
        height={10.952}
        rx={2}
        fill={props.color ?? "#fff"}
        id="Gallery"
      />
      <rect
        x={2.625}
        y={17.643}
        width={10.35}
        height={6.571}
        rx={2}
        fill={props.color ?? "#fff"}
        id="Gallery"
      />
      <rect
        x={15.275}
        y={4.5}
        width={10.35}
        height={19.714}
        rx={2}
        fill={props.color ?? "#fff"}
        id="Gallery"
      />
    </svg>
  );
};

export default GallerySvg;
