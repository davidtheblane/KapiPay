const axios = require('axios').default;
require("dotenv").config();

const config = {
  baseUrl: "https://kapipayzenvia.linkapi.com.br/v1",
  apikey: `apiKey=${process.env.LINKAPI_KEY}`,
  token: process.env.ZENVIA_TOKEN,
};

const sendSMS = {
  initAuth: async () => {
    const instance = axios.create({
      baseURL: config.baseUrl,
      headers: {
        "X-API-TOKEN": config.token,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
    });
    return instance;
  },

  sendMessage: async (obj) => {
    try {
      const instance = await sendSMS.initAuth();
      const response = await instance.post(`/send-sms/${config.apikey}`, obj);
      console.log(obj)
      console.log(response)
      return response;
    } catch (err) {
      console.log(err)
      throw err;
    }
  },

}
module.exports = sendSMS