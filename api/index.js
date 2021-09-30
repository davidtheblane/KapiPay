const express = require("express");
const morgan = require('morgan')
const cors = require('cors');
require('dotenv').config()


const app = express();


app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/', require('./routes/users.routes'))
app.use('/account', require('./routes/account.routes'))



const PORT = process.env.SERVER_PORT || 5050;
app.listen(PORT, () => console.log(`👾 Server Running on port: ${PORT}`));

