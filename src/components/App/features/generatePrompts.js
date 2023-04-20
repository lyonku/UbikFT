import React, { useState, useEffect } from "react";

import stylesData from "data.json";

async function generatedPrompts(chosenStyles, currentModel, inputValue) {
  // Объявляем константы
  const selectedValues = Object.values(chosenStyles);
  let totalPositiveText = [];
  let totalNegativeText = [];

  const apiModels = {
    Protogen: "protogen-3.4",
    Anything: "anything-v3",
    Vintedois: "vintedois-diffusion",
  };

  const config = {
    key: "J5e6ryPxKnOCHdITBr7M5hnvSX6nYpHvbFTSiO4i9yThzB3pBTRfeF9Zk6CG",
    model_id: apiModels[currentModel],
    prompt: "",
    negative_prompt: "",
    width: "512",
    height: "512",
    samples: "1",
    num_inference_steps: "20",
    safety_checker: "yes",
    seed: null,
    guidance_scale: 7.5,
    webhook: null,
    track_id: null,
  };

  // Проходим по каждому элементу в chosenStyles и формируем текст для prompt и negative_prompt
  for (const [key, value] of Object.entries(chosenStyles)) {
    if (key === "genre") {
      totalPositiveText.push(`(${value[0].sub_name}) of ((${inputValue}))`);
    } else if (key !== "artist") {
      for (const item of value) {
        totalPositiveText.push(`${item.sub_name} ${key}`);
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

  // Добавляем специальные тексты для модели anything-v3
  if (currentModel === "Anything") {
    const anythingNegative =
      "nsfw, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, artist name".split(
        ", "
      );

    totalPositiveText.unshift("((masterpiece))", "((best quality))");
    totalNegativeText = [...totalNegativeText, ...anythingNegative];
  }

  for (const [key, value] of Object.entries(chosenStyles)) {
    if (key === "artist") {
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
  config.prompt = uniquePositiveText.join(", ");
  config.negative_prompt = uniqueNegativeText2.join(", ");

  return config;
}

export default generatedPrompts;
