const mongoose = require('../database');

const UserAccountDocsSchema = new mongoose.Schema({
  userAccountId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'UserAccount._id'
  },

  charge: {
    type: Object
  },

  name: String,
  desc: String,
  imgRG:
  {
    data: Buffer,
    contentType: String
  },

  imgSelfie:
  {
    data: Buffer,
    contentType: String
  }
});


const UserAccountDocs = mongoose.model("UserAccountDocs", UserAccountDocsSchema);

module.exports = UserAccountDocs;