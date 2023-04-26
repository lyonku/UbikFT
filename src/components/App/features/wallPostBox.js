import React, { useState } from "react";
import bridge from "@vkontakte/vk-bridge";

const wallPostBox = async (img) => {
  const result = bridge
    .send("VKWebAppShowWallPostBox", {
      message:
        "Смотрите что у меня получилось сгенерировать в приложении UbikNFT",
      url: img,
    })
    .then((data) => {
      if (data.post_id) {
        return "complete";
      }
    })
    .catch((error) => {
      return error;
    });

  return result;
};

export default wallPostBox;
