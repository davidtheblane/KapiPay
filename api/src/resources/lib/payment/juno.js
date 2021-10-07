const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

const clientResourceToken = process.env.CLIENT_RESOURCE_TOKEN


const config = {
  baseUrlAuth: "https://sandbox.boletobancario.com/authorization-server",
  baseUrl: "https://sandbox.boletobancario.com/api-integration",
  path: "oauth/token",
  id: "KqGc5CV8YtLvKGEH",
  secret: "U|x{V|SCwRB&5|CbUMvB#bo6kPl!IDD^",
  mainResourceToken:
    "F6A893ACFDF50A41064A691F00E98697BAD697FCE825D753B3AF9B4CCFCA12B9",
  clientResourceToken: `${clientResourceToken}`
};

const payment = {
  //----> INIT AUTHORIZATION
  initAuth: async () => {
    const encoded = Buffer.from(`${config.id}:${config.secret}`).toString(
      "base64"
    );

    const instance = axios.create({
      baseURL: config.baseUrlAuth,
      headers: {
        Authorization: `Basic ${encoded}`,
      },
    });
    return instance;
  },

  //----> INIT
  init: async (userToken) => {
    const token = await payment.getToken();

    const instance = axios.create({
      baseURL: config.baseUrl,
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Api-Version": "2",
        "X-Resource-Token": userToken ? userToken : config.mainResourceToken,
        "Content-Type": "application/json",
      },
    });
    return instance;
  },

  //----> GET TOKEN
  getToken: async () => {
    try {
      //pede autorização
      const instance = await payment.initAuth();
      //modelo para incluir Params = formUrlEncoded do insomnia
      let params = new URLSearchParams();
      params.append("grant_type", "client_credentials");

      const res = await instance.post(config.path, params);

      return res.data.access_token;
    } catch (err) {
      throw err;
    }
  },

  //----> GET BALANCE
  balance: async (resourceToken = false) => {
    try {
      const instance = await payment.init(resourceToken);
      const res = await instance.get("balance");
      console.log(resourceToken)
      return res.data;
    } catch (err) {
      throw err;
    }
  },

  //----> ACCOUNT STATUS
  accountStatus: async () => {
    try {
      const instance = await payment.init();
      const res = await instance.get("digital-accounts", {
        headers: {
          "X-Resource-Token":
            "3AECED12C4C9E7DD1CBDE7AE9B822936BB0B8175DFE160894BD2A69279AF9876",
        },
      });
      return res.data;
    } catch (err) {
      throw err;
    }
  },

  //----> LIST CHARGES
  listCharges: async () => {
    try {
      const instance = await payment.init();
      const res = await instance.get("charges", {
        headers: {
          "X-Resource-Token":
            "BFBE2F8263AAD912E3159026ECAC481BEA90165A2C77EA2E35E111AC09B2F32A",
        },
      });
      return res.data;
    } catch (err) {
      throw err;
    }
  },

  //----> LIST CHARGE BY Charge ID
  chargeById: async (id) => {
    try {
      const instance = await payment.init();
      const res = await instance.get(`charges/${id}`);
      return res.data;
    } catch (err) {
      throw err;
    }
  },

  //----> CHARGE - utiliza JSON no corpo
  charge: async (body) => {
    try {
      const instance = await payment.init();
      const res = await instance.post("charges", body, {
        headers: {
          "X-Resource-Token":
            "BFBE2F8263AAD912E3159026ECAC481BEA90165A2C77EA2E35E111AC09B2F32A",
        },
      });
      return res.data;
    } catch (err) {
      throw err;
    }
  },

  //----> CARD PAYMENT - json
  cardPayment: async (body) => {
    try {
      const instance = await payment.init();
      const res = await instance.post("payments", body, {
        headers: {
          "Content-Type": "application/json",
          "X-Resource-Token":
            "BFBE2F8263AAD912E3159026ECAC481BEA90165A2C77EA2E35E111AC09B2F32A",
        },
      });
      return res.data;
    } catch (err) {
      throw err;
    }
  },

  //----> CREATE DIGITAL ACCOUNT - utiliza JSON no corpo
  createAccount: async (body) => {
    const instance = await payment.init();
    const res = await instance.post("digital-accounts", body, {
      headers: {
        "X-Resource-Token": config.mainResourceToken,
      },
    });
    console.log(res.data);
    return res.data;
  },

  //----> LIST PENDING DOCUMENTS
  listPendingDocuments: async () => {
    try {
      const instance = await payment.init();
      const res = await instance.get("documents", {
        headers: {
          "X-Resource-Token":
            "BFBE2F8263AAD912E3159026ECAC481BEA90165A2C77EA2E35E111AC09B2F32A",
        },
      });
      return res.data;
    } catch (err) {
      throw err;
    }
  },

  //----> SENDING DOCUMENTS - utiliza Multipart Form
  sendDocuments: async (file, id) => {
    try {
      const instance = await payment.init();

      // let docFile = fs.readFileSync('imgs/document.jpg')
      // formData.append('files', docFile.toString(), "irisDocumento.jpg");
      const { buffer, originalname } = file[0];
      const filename = originalname;

      const formData = new FormData();
      formData.append("files", buffer, { filename });

      const res = await instance
        .post(`documents/${id}/files`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-Resource-Token":
              "BFBE2F8263AAD912E3159026ECAC481BEA90165A2C77EA2E35E111AC09B2F32A",
            ...formData.getHeaders(),
          },
        })
        .catch((err) => {
          console.log(err.response.data);
        });
      return res.data;
    } catch (err) {
      throw err;
    }
  },

  // sendDocuments: async () => {
  //   try {
  //     const instance = await payment.init();

  //     let docFile = fs.readFileSync('./kapSelfie.jpg')

  //     const formData = new FormData();
  //     formData.append('files', docFile.toString(), "kapSelfie.jpg");
  //     const res = await instance.post(`documents/doc_BC3DF8E0AA7FC2AB/files`, formData, {
  //       headers: {
  //         "X-Resource-Token": config.client3_Resource_Token,
  //         ...formData.getHeaders(),
  //       }
  //     })
  //       .catch(err => {
  //         console.log(err.response.data)
  //       })
  //     return res.data
  //   } catch (err) {
  //     throw err;
  //   }
  // },
};
module.exports = payment;
