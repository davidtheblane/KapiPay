const mongoose = require('mongoose');
require('dotenv').config()

const DATABASE_URL = process.env.DATABASE_URL;
mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.Promise = global.Promise;
module.exports = mongoose;

const NODE_ENV = process.env.NODE_ENV
//verifica se e em qual banco de dados esta conectado
const db = mongoose.connection
db.on('error', (error) => console.error(error));
db.once('open', () => {
  if (NODE_ENV === "development") {
    console.log('📦 Connected to "development" database')
  } else {
    console.log('📦 Connected to the database')
  }
});