const BASE_URL = "https://ubiq.top";

// Launch parametrs
const PARAM = window.location.href;
const TOTAL_PARAMS = PARAM.slice(PARAM.indexOf("vk_access"));

export const get = async (url, params = "") => {
  try {
    const response = await fetch(`${BASE_URL}${url}?${TOTAL_PARAMS}${params}`, {
      method: "GET",
      // headers: {
      //   'Content-Type': 'application/json',
      // },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data);
    }

    return data;
  } catch (error) {
    return error.message;
  }
};

// Функция для отправки POST запросов
export const post = async (url, data = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${url}?${TOTAL_PARAMS}`, {
      method: "POST",
      // headers: {
      //   'Content-Type': 'application/json',
      // },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(data);
    }

    return responseData;
  } catch (error) {
    return error.message;
  }
};
