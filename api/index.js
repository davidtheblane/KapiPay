const express = require("express");
const morgan = require('morgan')
const cors = require('cors');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// require('./controllers/userController')(app);
// require('./controllers/balanceController')(app);
// require('./controllers/chargeController')(app);



app.use('/users', require('./routes/users.routes'))
app.use('/account', require('./routes/account.routes'))








const PORT = process.env.PORT || 5050;

app.listen(PORT, () => console.log(`👾 Server Running on port: ${PORT}`));

