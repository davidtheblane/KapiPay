require('dotenv').config()
const mongoose = require('mongoose');

const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.Promise = global.Promise;

module.exports = mongoose;




//verifica se o banco de dados esta conectado
const db = mongoose.connection
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('📦 Connected to the database'))





// // mongoose.connect(DATABASE_URL,
// //   {
// //     // useNewUrlParser: true,
// //     // useUnifiedTopology: true,
// //   });