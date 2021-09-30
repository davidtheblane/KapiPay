const axios = require("axios");
const FormData = require('form-data');
const fs = require('fs');

const config = {
  baseUrlAuth: "https://sandbox.boletobancario.com/authorization-server",
  baseUrl: "https://sandbox.boletobancario.com/api-integration",
  path: "oauth/token",
  id: "KqGc5CV8YtLvKGEH",
  secret: "U|x{V|SCwRB&5|CbUMvB#bo6kPl!IDD^",
  mainResourceToken:
    "F6A893ACFDF50A41064A691F00E98697BAD697FCE825D753B3AF9B4CCFCA12B9",
  client1_Resource_Token: "3E010929D37D8C63DC046C3F9F4C2016BD10729755ED1733675972C7E09DF15C",
  client2_Resource_Token: "438D761C76C12C255AA747B42F07BE88A179F572BE52012D5DC5615DC7A3C806",
  //Adalberto
  client3_Resource_Token: "04D8CA7AA59746A13DF4C648F9419C816EF161372A19431B4B0BA3C2E0AE6475",
};



const payment = {
  //----> INIT AUTHORIZATION
  initAuth: async () => {
    const encoded = Buffer.from(`${config.id}:${config.secret}`).toString(
      "base64");

    const instance = axios.create({
      baseURL: config.baseUrlAuth,
      headers: {
        Authorization: `Basic ${encoded}`,
      },
    });
    return instance;
  },

  //----> INIT
  init: async () => {
    const token = await payment.getToken();

    const instance = axios.create({
      baseURL: config.baseUrl,
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Api-Version": "2",
        "X-Resource-Token": config.mainResourceToken,
        "Content-Type": "application/json"
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
  balance: async () => {
    try {
      const instance = await payment.init();
      const res = await instance.get("balance", {
        headers: {
          "X-Resource-Token": config.client3_Resource_Token,
        }
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
      const res = await instance.get("charges");
      return res.data._embedded;
    } catch (err) {
      throw err
    }
  },

  //----> CHARGE - utiliza JSON no corpo
  charge: async (body) => {

    try {
      const instance = await payment.init();
      const res = await instance.post("charges", body, {
        headers: {
          "Content-Type": "application/json",
          "X-Resource-Token": config.client3_Resource_Token
        },
      });
      return res.data._embedded["charges"][0].id;
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
          "X-Resource-Token": config.client3_Resource_Token
        }
      })
      return res.data;
    } catch (err) {
      throw err
    }
  },




  //----> CREATE DIGITAL ACCOUNT - utiliza JSON no corpo
  createAccount: async (body) => {

    const instance = await payment.init();
    const res = await instance.post("digital-accounts", body)
    console.log(res.data)
    return res.data;


  },




  //----> ACCOUNT STATUS
  accountStatus: async () => {
    try {
      const instance = await payment.init();
      const res = await instance.get("digital-accounts");
      return res.data;
    } catch (err) {
      throw err;
    }
  },

  //----> LIST PENDING DOCUMENTS
  listPendingDocuments: async () => {
    try {
      const instance = await payment.init();
      const res = await instance.get("documents")
      return res.data
    } catch (err) {
      throw err;
    }
  },

  //----> SENDING DOCUMENTS - utiliza Multipart Form
  sendDocuments: async () => {
    try {
      const instance = await payment.init();

      let docFile = fs.readFileSync('../../resources/imgs/irisDocumento.jpg')

      const formData = new FormData();
      formData.append('files', docFile.toString(), "irisDocumento.jpg");
      const res = await instance.post(`documents/doc_A0EC2EB9772C5F98/files`, formData, {
        headers: {
          "X-Resource-Token": "3AECED12C4C9E7DD1CBDE7AE9B822936BB0B8175DFE160894BD2A69279AF9876",
          ...formData.getHeaders(),
        }
      })
        .catch(err => {
          console.log(err.response.data)
        })
      return res.data
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



}

module.exports = payment;