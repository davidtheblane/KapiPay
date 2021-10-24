const mongoose = require('../database');
const bcrypt = require("bcrypt")

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  passwordResetToken: {
    type: String,
    select: false,
  },
  passwordResetExpires: {
    type: Date,
    select: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  document: {
    type: String,
    // required: true,
  },

  birthDate: {
    type: String,
  },

  phone: {
    type: String,
    // required: true,
  },

  address: {
    type: Object,
    // required: true,
  },

  //Renda mensal ou receita. Obrigatório para PF e PJ.
  monthlyIncomeOrRevenue: {
    type: Number
  },
});


//"pre(save)" = antes de salvar o usuario
UserSchema.pre("save", async function (next) {

  if (this.password) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
  }

  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;