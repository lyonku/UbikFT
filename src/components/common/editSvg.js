import * as React from "react";
const EditSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    fill="none"
    {...props}
  >
    <path
      fill="#FFFFFF"
      fillRule="evenodd"
      d="M21.586 8.914a2 2 0 0 0 0-2.828l-2.672-2.672a2 2 0 0 0-2.828 0l-12 12a2 2 0 0 0-.586 1.414V20.5a1 1 0 0 0 1 1h3.672a2 2 0 0 0 1.414-.586l12-12Zm-7.268-.904 2.672 2.672L8.172 19.5H5.5v-2.672l8.818-8.818Zm4.086 1.257-2.671-2.671L17.5 4.828 20.172 7.5l-1.768 1.767Z"
      clipRule="evenodd"
    />
  </svg>
);
export default EditSvg;
