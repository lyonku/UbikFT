import React, { useState, useEffect } from "react";

const roundLoader = (props) => {
  return (
    <svg className="roundLoader" viewBox="0 0 100 100">
      <path
        fill="none"
        strokeLinecap="round"
        strokeWidth="3"
        stroke="#dfe8ed"
        strokeDasharray="251.2,0"
        d="M50 10 a 40 40 0 0 1 0 80 a 40 40 0 0 1 0 -80"
        opacity="0.22"
      />
      <defs>
        <linearGradient id="gradient" gradientTransform="rotate(0)">
          <stop offset="0%" stopColor="#FCC63A" />
          <stop offset="100%" stopColor="#8BF54D" />
        </linearGradient>
        <linearGradient id="myGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(33, 33, 33, 0.05)" />
          <stop offset="100%" stopColor="rgba(33, 33, 33, 0.05)" />
        </linearGradient>
      </defs>
      <path
        fill="url(#myGradient)"
        strokeLinecap="round"
        strokeWidth="3"
        stroke="url(#gradient)"
        className="roundLoaderPath"
        d="M50 10 a 40 40 0 0 1 0 80 a 40 40 0 0 1 0 -80"
        strokeDasharray="62.8, 188.4"
        strokeDashoffset="188.4"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="251.2"
          to="0"
          dur="2"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
};

export default roundLoader;
