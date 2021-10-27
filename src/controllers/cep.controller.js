const cepService = require("../resources/lib/cep/cep.service")
const errorHandler = require('../resources/error-handler')

module.exports = {

  getCep: async (req, res) => {
    const obj = req.params.id;
    try {
      const response = await cepService.postCode(obj)
      return res.status(200).send(response)
    } catch (err) {
      errorHandler(err);
      res.status(err.code || 400).send({ message: err.stack });
    }

  }
}
