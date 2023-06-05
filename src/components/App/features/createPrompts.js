import React, { useState, useEffect } from "react";

async function createPrompts(chosenStyles, currentModel, inputValue) {
  // Объявляем константы
  const selectedValues = Object.values(chosenStyles);
  let totalPositiveText = [];
  let totalNegativeText = [];
  const apiModels = {
    Protogen: "protogen-3.4",
    Counterfeit: "counterfeit-v30",
    "Rev Anim": "rev-anim",
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

  for (const [key, value] of Object.entries(chosenStyles)) {
    if (key === "genre") {
      totalPositiveText.push(
        `[[${value[0].sub_title}]] of (((${inputValue})))`
      );
    }
  }

  // Проходим по каждому элементу в chosenStyles и формируем текст для prompt и negative_prompt
  for (const [key, value] of Object.entries(chosenStyles)) {
    if (key !== "artist" && key !== "genre") {
      for (const item of value) {
        totalPositiveText.push(`[[${item.sub_title}]] ${key}`);
        if (key == "setting") {
          totalPositiveText.push(`[[${item.sub_title}]] background`);
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

  // Добавляем специальные тексты для модели anything-v3
  if (currentModel === "Counterfeit") {
    const anythingNegative = [
      "(((nsfw)))",
      "((((((1girl))))))",
      "(((nudity)))",
      "((blurry))",
      "(((lowres)))",
      "(((noise)))",
      "(((low quality)))",
    ];
    totalNegativeText = [...anythingNegative, ...totalNegativeText];
  }

  if (currentModel === "Rev Anim") {
    const anythingNegative = [
      "(((nsfw)))",
      "((((((1girl))))))",
      "(((nudity)))",
      "((girl))",
      "(((woman)))",
      "(((erotic)))",
      "(((sexy)))",
    ];
    totalNegativeText = [...anythingNegative, ...totalNegativeText];
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

  const result = uniquePositiveText.map((element) => {
    if (!element.includes("[[") && !element.includes("]]")) {
      return `[[${element}]]`;
    } else {
      return element;
    }
  });

  // Записываем тексты в конфигурационный объект
  config.prompt = result.join(", ");
  config.negative_prompt = uniqueNegativeText2.join(", ");
  console.log("Отправленный конфиг: ", config);
  return config;
}

export default createPrompts;
