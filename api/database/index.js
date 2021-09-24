const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://davib:12345@cluster0.30bet.mongodb.net/paymentDatabase?retryWrites=true&w=majority",
  {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  });

mongoose.Promise = global.Promise;

module.exports = mongoose;




//verifica se o banco de dados esta conectado
const db = mongoose.connection
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('📦 Connected to the database'))

