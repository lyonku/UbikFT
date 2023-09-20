const BASE_URL = "https://ubiq.top";

// Launch parametrs
const PARAM = window.location.href;

const TOTAL_PARAMS =
  PARAM.indexOf("#/") == -1
    ? PARAM.slice(PARAM.indexOf("?") + 1)
    : PARAM.slice(PARAM.indexOf("?") + 1, PARAM.indexOf("#/"));

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
      console.error(data.message);
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
      console.error(responseData.message);
    }

    return responseData;
  } catch (error) {
    return error.message;
  }
};
