import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import "./Artists.css";
import { Panel } from "@vkontakte/vkui";

const Artists = ({ id, go }) => {
  const [currentNavItem, setCurrentNavItem] = useState("Energy");

  const handleNav = (event) => {
    setCurrentNavItem(event.target.id);
  };

  return (
    <Panel id={id}>
      <div className="Artists">Artists</div>
    </Panel>
  );
};

export default Artists;
