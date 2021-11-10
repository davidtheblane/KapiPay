const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const config = {
  baseUrlAuth: process.env.JUNO_AUTH_URL,
  baseUrl: process.env.JUNO_BASE_URL,
  path: "oauth/token",
  id: process.env.JUNO_ID,
  secret: process.env.JUNO_SECRET,
  mainResourceToken: process.env.JUNO_MAIN_RESOURCE_TOKEN,
};

const payment = {
  //----> INIT AUTHORIZATION
  initAuth: async () => {
    const encoded = Buffer.from(`${config.id}:${config.secret}`).toString(
      "base64"
    );
    // Instância para servidor de autorização
    const instance = axios.create({
      baseURL: config.baseUrlAuth,
      headers: {
        Authorization: `Basic ${encoded}`,
      },
    });
    return instance;
  },

  //----> GET ACCESS TOKEN
  getAccessToken: async () => {
    try {
      //pede autorização
      const instance = await payment.initAuth();
      //modelo para incluir Params = formUrlEncoded do insomnia
      let params = new URLSearchParams();
      params.append("grant_type", "client_credentials");

      const res = await instance.post(config.path, params);

      return res.data.access_token;
    } catch (err) {
      throw err.response.data;
    }
  },

  //----> INIT
  init: async () => {
    const token = await payment.getAccessToken();
    // Instância para servidor de recursos
    const instance = axios.create({
      baseURL: config.baseUrl,
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Api-Version": 2,
        "Content-Type": "application/json",
      },
    });
    return instance;
  },

  //----> GET BALANCE
  balance: async (resourcetoken) => {
    try {
      const instance = await payment.init();
      const res = await instance.get("balance", {
        headers: {
          "X-Resource-Token": resourcetoken,
        },
      });
      return res.data;
    } catch (err) {
      throw err.response.data;
    }
  },

  //----> ACCOUNT STATUS
  accountStatus: async (resourcetoken) => {
    try {
      const instance = await payment.init();
      const res = await instance.get("digital-accounts", {
        headers: {
          "X-Resource-Token": resourcetoken,
        },
      });

      return res.data;
    } catch (err) {
      console.log(err);
      throw err.response.data;
    }
  },

  //----> LIST CHARGES
  listCharges: async (resourcetoken) => {
    try {
      const instance = await payment.init();
      const res = await instance.get("charges", {
        headers: {
          "X-Resource-Token": resourcetoken,
        },
      });
      return res.data._embedded;
    } catch (err) {
      throw err;
    }
  },

  //----> LIST CHARGE BY Charge ID
  chargeById: async (id, resourcetoken) => {
    try {
      const instance = await payment.init();
      const res = await instance.get(`charges/${id}`, {
        headers: {
          "X-Resource-Token": resourcetoken,
        },
      });
      return res.data;
    } catch (err) {
      throw err.response.data;
    }
  },

  //----> SEND CHARGE - utiliza JSON no corpo
  charge: async (body, resourcetoken) => {
    try {
      const instance = await payment.init();
      const res = await instance.post("charges", body, {
        headers: {
          "X-Resource-Token": resourcetoken,
        },
      });
      return res.data._embedded.charges[0];
    } catch (err) {
      throw err.response.data;
    }
  },

  //----> SEND TRANSFER - utiliza JSON no corpo
  transfer: async (body, resourcetoken) => {
    try {
      const instance = await payment.init();
      const res = await instance.post("transfers", body, {
        headers: {
          "X-Resource-Token": resourcetoken,
        },
      });
      return res.data._embedded.charges[0];
    } catch (err) {
      throw err.response.data;
    }
  },

  //----> BILL PAYMENTS - utiliza JSON no corpo
  billPayment: async (body, resourcetoken) => {
    try {
      const instance = await payment.init();
      const res = await instance.post("bill-payments", body, {
        headers: {
          "X-Resource-Token": resourcetoken,
        },
      });
      return res.data._embedded.charges[0];
    } catch (err) {
      throw err.response.data;
    }
  },

  //----> CARD PAYMENT - json
  cardPayment: async (body, resourcetoken) => {
    try {
      const instance = await payment.init();
      const res = await instance.post("payments", body, {
        headers: {
          "X-Resource-Token": resourcetoken,
        },
      });
      console.log(res.data.payments[0]);
      return res.data.payments[0];
    } catch (err) {
      throw err.response.data;
    }
  },

  //----> SALVAR CARTAO - TOKENIZAR - json
  cardTokenize: async (body, resourcetoken) => {
    try {
      const instance = await payment.init();
      const res = await instance.post("credit-cards/tokenization", body, {
        headers: {
          "X-Resource-Token": resourcetoken,
        },
      });
      return res.data;
    } catch (err) {
      throw err.response.data;
    }
  },

  //----> CREATE DIGITAL ACCOUNT - utiliza JSON no corpo
  createAccount: async (body) => {
    try {
      const instance = await payment.init();
      const res = await instance.post("digital-accounts", body, {
        headers: {
          "X-Resource-Token": config.mainResourceToken,
        },
      });
      console.log(res.data);
      return res.data;
    } catch (err) {
      throw err.response.data;
    }
  },

  //----> LIST PENDING DOCUMENTS
  listPendingDocuments: async (resourcetoken) => {
    try {
      const instance = await payment.init();
      const res = await instance.get("documents", {
        headers: {
          "X-Resource-Token": resourcetoken,
        },
      });
      return res.data._embedded.documents;
    } catch (err) {
      throw err.response.data;
    }
  },

  //----> SENDING DOCUMENTS - utiliza Multipart Form
  sendDocuments: async (file, id, resourcetoken) => {
    try {
      console.log("file", file);
      const instance = await payment.init();

      const { buffer, originalname } = file[0];
      // const filename = originalname;
      // console.log("filename", filename);

      const formData = new FormData();
      formData.append("files", buffer, {
        contentType: file.mimetype,
        filename: file.originalname,
      });
      console.log("formData", formData[0]);

      const res = await instance
        .post(`documents/${id}/files`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-Resource-Token": resourcetoken,
            ...formData.getHeaders(),
          },
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(res)
      return res;
    } catch (err) {
      throw err;
    }
  },

  // // ----> PAGAMENTO DE CONTAS
  // createAccount: async (body, resourcetoken) => {
  //   const instance = await payment.init();
  //   const res = await instance.post("bill-payments", body, {
  //     headers: {
  //       "X-Resource-Token": resourcetoken,
  //     },
  //   });
  //   console.log(res.data);
  //   return res.data;
  // },
};
module.exports = payment;
