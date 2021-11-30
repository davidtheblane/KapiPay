const axios = require('axios').default;
require("dotenv").config();

const config = {
  baseUrl: "https://kapipaysms.gateway.linkapi.com.br/v1",
  apikey: process.env.LINKAPI_KEY,
  // token: process.env.ZENVIA_TOKEN,
};

const sendSMS = {
  initAuth: async () => {
    const instance = axios.create({
      baseURL: config.baseUrl,
      headers: {
        // "X-API-TOKEN": config.token,
        "Content-Type": "application/json",
        // "Accept": "application/json"
      },
    });
    return instance;
  },

  sendMessage: async (obj) => {
    try {
      const instance = await sendSMS.initAuth();
      const res = await instance.post(`/sms?apiKey=${config.apikey}`, obj);
      return res.data.body;
    } catch (err) {
      throw err;
    }
  },

}
module.exports = sendSMS