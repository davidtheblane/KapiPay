const mongoose = require('../database');

const MySessionSchema = new mongoose.Schema({
  //ID do usuário
  session: {
    type: Object,
  },

});

const MySession = mongoose.model("MySession", MySessionSchema);

module.exports = MySession;