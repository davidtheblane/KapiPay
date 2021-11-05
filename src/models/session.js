const mongoose = require('../database');

const MySessionSchema = new mongoose.Schema({
  //ID do usuário
  _id: {
    type: String,
  },

  expires: {
    type: Date,
  },
  session: {
    type: Object
  },

  isAuth: {
    type: Boolean
  },
  userEmail: {
    type: String
  },

  token: {
    type: String
  }


});

const MySession = mongoose.model("MySession", MySessionSchema);

module.exports = MySession;