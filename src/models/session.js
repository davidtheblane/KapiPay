const mongoose = require('../database');

const UserSessionSchema = new mongoose.Schema({
  //ID do usuário
  token: {
    type: String,
  },

});

const UserSession = mongoose.model("UserSession", UserSessionSchema);

module.exports = UserSession;