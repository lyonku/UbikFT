import * as React from "react";
const ShareSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width ?? 25}
    height={props.height ?? 24}
    viewBox="0 0 25 24"
    fill="none"
    {...props}
  >
    <path
      fill={props.color ?? "#B0E822"}
      fillRule="evenodd"
      d="M13.5 4.414V8C6.626 8 3.382 12.61 1.688 17.505c-.352 1.018 1.158 1.795 2.026 1.156 2.1-1.549 4.605-2.363 7.786-2.593a27.859 27.859 0 0 1 2-.068v3.586c0 .89 1.078 1.337 1.707.707l7.586-7.586a1 1 0 0 0 0-1.414l-7.585-7.586c-.63-.63-1.708-.184-1.708.707Zm0 5.586a2 2 0 0 0 2-2V6.828L20.672 12 15.5 17.172V16a2 2 0 0 0-2-2c-3.459 0-6.4.523-8.943 1.804.66-1.322 1.466-2.495 2.462-3.428C8.524 10.965 10.563 10 13.5 10Z"
      clipRule="evenodd"
    />
  </svg>
);
export default ShareSvg;
