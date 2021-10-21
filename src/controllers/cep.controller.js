const cepService = require("../resources/lib/cep/cep.service")
const url = `https://apphom.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente?wsdl`;

const service = new cepService(url)


module.exports = {

  getCep: async (req, res) => {
    try {
      console.log('chegou no controller')
      const connection = await service.connection();
      // console.log(connection);

      const response = await service.request(connection, "consultaCEPAsync", { cep: req.params })

      return res.status(200).send(response[0] || console.log(response[0]))
    } catch (err) {
      return res.status(err.status || 400).send({ message: err.stack });
    }

  }
}

// async function getCep(req, res) {
//   const connection = await service.connection();
//   // console.log(connection);
//   const response = await service.request(connection, "consultaCEPAsync", { cep: "11050300" })
//   return console.log(response[0]);
//   res.send(response[0])
// }
// getCep()