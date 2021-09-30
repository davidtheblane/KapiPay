const User = require("../models/user");

module.exports = {

  //Listar todos usuários - vai ser apenas admin
  listUsers: async (req, res) => {
    try {
      const user = await User.find({});
      return res.status(200).send({ user })
    } catch (error) {
      return res.status(400).send({ error: "Cannot find users" })
    }
  },


  //Listar Usuário por ID - vai ser apenas admin
  getUser: async (req, res) => {
    const id = req.params.id;
    try {
      const user = await User.findById(id);
      return res.status(200).send({ user })
    } catch (error) {
      return res.status(400).send({ error: `Cannot find user id: ${id}` })
    }
  }

}