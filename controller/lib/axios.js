const axios = require("axios");
const telegramtoken =
  "https://api.telegram.org/bot8089940996:AAEqT0wdRKBcV2xwqqKaDsN7s9IxtGGxxWg";

function getAxiousInstance() {
  return {
    get(method, params) {
      return axios.get(`/${method}`, {
        baseURL: telegramtoken,
        params,
      });
    },
    post(method, data) {
      return axios({
        method: "POST",
        baseURL: telegramtoken,
        url: `/${method}`,
        data,
      });
    },
  };
}

module.exports = { axiosInstance: getAxiousInstance() };
