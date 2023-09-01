import React, { useState, useEffect } from "react";

async function createPrompts(chosenStyles, vk_user_id, inputValue) {
  // Объявляем константы
  let totalPositiveText = [];
  let totalNegativeText = [];

  const config = {
    text_prompts: [
      {
        text: inputValue,
        weight: 1,
      },
      {
        text: "",
        weight: -1,
      },
    ],
    style_preset: "",
    cfg_scale: 7,
    samples: 1,
    seed: 0,
    vk_user_id: vk_user_id,
  };
  totalPositiveText.push(inputValue);

  for (const [key, value] of Object.entries(chosenStyles)) {
    if (key === "genre") {
      config.style_preset = value[0].sub_title;
    }
  }

  // Проходим по каждому элементу в chosenStyles и формируем текст для prompt и negative_prompt
  for (const [key, value] of Object.entries(chosenStyles)) {
    if (key !== "artist" && key !== "genre") {
      for (const item of value) {
        totalPositiveText.push(`${item.sub_title} ${key}`);
        if (key == "setting") {
          totalPositiveText.push(`${item.sub_title} background`);
        }
      }
    }
  }

  for (const [key, value] of Object.entries(chosenStyles)) {
    if (key !== "artist") {
      for (const item of value) {
        totalPositiveText = [
          ...totalPositiveText,
          ...item.positivePrompt.split(", "),
        ];
        totalNegativeText = [
          ...totalNegativeText,
          ...item.negativePrompt.split(", "),
        ];
      }
    }
  }

  for (const [key, value] of Object.entries(chosenStyles)) {
    if (key === "artist") {
      for (const item of value) {
        totalPositiveText = [
          ...totalPositiveText,
          `in style of [[${item.sub_title}]]`,
          ...item.positivePrompt.split(", "),
        ];
        totalNegativeText = [
          ...totalNegativeText,
          ...item.negativePrompt.split(", "),
        ];
      }
    }
  }

  // Получаем уникальные элементы для positive и negative prompt
  const uniquePositiveText = [...new Set(totalPositiveText)];
  const uniqueNegativeText = [...new Set(totalNegativeText)];

  // Исключаем элементы, которые присутствуют в обоих массивах
  const uniqueNegativeText2 = uniqueNegativeText.filter(
    (item) =>
      !uniquePositiveText.includes(item) &&
      !uniquePositiveText.some((positiveItem) => {
        return positiveItem.includes(item);
      })
  );
  // Записываем тексты в конфигурационный объект
  config.text_prompts[0].text = uniquePositiveText.join(", ");
  config.text_prompts[1].text = uniqueNegativeText2.join(", ");
  config.text_prompts[1].weight = -1;
  return config;
}

export default createPrompts;
