import React, { useState, useContext } from "react";
import { View, Panel } from "@vkontakte/vkui";

import "./Gallery.css";

import GalleryItem from "./components/GalleryItem";
import EnergySvg from "components/common/energySvg";
import ShareWorkAlert from "components/common/ShareWorkAlert";
import wallPostBox from "components/App/features/wallPostBox";

import galleryItem__background from "assets/img/galleryItem__background.png";
import benefitsImg from "assets/img/payEnergy__benefitsImg.svg";
import PayConfirm from "./components/PayConfirm";

import { MainContext } from "components/shared/providers/MainProvider";

const Gallery = ({ id, activePanel }) => {
  const count = [1, 2, 3, 4];
  const [openHint, setOpenHint] = useState(false);
  const [copyPromptAlert, setCopyPromptAlert] = useState(false);
  const [showShareAlert, setShowShareAlert] = useState(false);
  const { router } = useContext(MainContext);

  const handleCopyPromptAlert = () => {
    setCopyPromptAlert(true);
    setTimeout(() => setCopyPromptAlert(false), 2000);
  };

  const handleShareWallPost = () => {
    wallPostBox(galleryItem__background);
  };

  return (
    <View id={id} activePanel={router.activePanel}>
      <Panel id="gallery">galleryHome</Panel>
    </View>
    // <div className="Gallery">
    //   <div className="Gallery__wrap">
    //     <div className="Gallery__controls">
    //       <div
    //         className="Gallery__energy smallBtn-text"
    //         onClick={() => go("payEnergy")}
    //       >
    //         <EnergySvg width={"20px"} height={"20px"} />
    //         100
    //       </div>
    //     </div>
    //     <div className="Gallery__body">
    //       <div className="Gallery__title title">
    //         Популярные <span className="text_accented">арты</span>
    //       </div>

    //       <div className="Gallery__items">
    //         {count.map((item) => {
    //           return (
    //             <GalleryItem
    //               key={item}
    //               setOpenHint={setOpenHint}
    //               handleCopyPromptAlert={handleCopyPromptAlert}
    //               showShareAlert={showShareAlert}
    //               setShowShareAlert={setShowShareAlert}
    //             />
    //           );
    //         })}
    //       </div>
    //     </div>
    //   </div>
    //   <div className="notification__wrap">
    //     <ShareWorkAlert
    //       showShareAlert={showShareAlert}
    //       setShowShareAlert={setShowShareAlert}
    //       handleShareWallPost={handleShareWallPost}
    //     />
    //   </div>

    //   <div className={`Notification ${copyPromptAlert && "open"}`}>
    //     <img src={benefitsImg} />
    //     Промт скопирован
    //   </div>
    //   <div
    //     className={`PayConfirm__background ${
    //       (openHint || showShareAlert) && "open"
    //     }`}
    //   ></div>
    //   <PayConfirm openHint={openHint} setOpenHint={setOpenHint} />
    // </div>
  );
};

export default Gallery;
