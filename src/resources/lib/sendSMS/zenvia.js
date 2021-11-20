const axios = require("axios");
require("dotenv").config();

const config = {
  baseUrl: "https://kapipayzenvia.linkapi.com.br/v1",
  apikey: process.env.LINKAPI_KEY,
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
    const obj = {
      "from": "Kapipay",
      "to": "5513988128931",
      "contents": [
        {
          "type": "text",
          "text": "You have done a new charge in Kapipay"
        }
      ]
    }
    try {
      const res = await instance.post(`/send-sms`, obj, {
        params: {
          api_key: config.apikey
        }
      });
      console.log(obj)
      console.log(res)
      return res;
    } catch (err) {
      throw err;
    }
  },

}
module.exports = sendSMS