import * as React from "react";
const refreshSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width ?? "16px"}
    height={props.height ?? "16px"}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <g
      stroke={props.color ?? "#B0E822"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      clipPath="url(#a)"
    >
      <path d="M14.112 5.333a6.669 6.669 0 0 0-12.745 2" />
      <path d="M11.333 5.333h2.934a.4.4 0 0 0 .4-.4V2M1.92 10.667a6.67 6.67 0 0 0 12.746-2" />
      <path d="M4.7 10.667H1.767a.4.4 0 0 0-.4.4V14" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default refreshSvg;
