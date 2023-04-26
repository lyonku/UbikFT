import React, { useState } from "react";
import bridge from "@vkontakte/vk-bridge";

const storiesPostBox = async (img) => {
  const result = bridge
    .send("VKWebAppShowStoryBox", {
      background_type: "image",
      url: img,
      attachment: {
        text: "book",
        type: "photo",
        owner_id: 743784474,
        id: 12345678,
      },
    })
    .then((data) => {
      if (data.code_data) {
        // Редактор историй открыт
        console.log(data);
      }
    })
    .catch((error) => {
      // Ошибка
      console.log(error);
    });

  return result;
};

export default storiesPostBox;
