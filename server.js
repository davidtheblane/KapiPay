const express = require("express");
const morgan = require('morgan')
const cors = require('cors');
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
const multer = require('multer')

Sentry.init({ dsn: process.env.SENTY_DSN, tracesSamples: 1.0 });

require('dotenv').config({
  path: process.env.NODE_ENV === "development" ? ".env.development" : ".env"
})

const upload = multer()
const app = express();

app.use(upload.any());
app.use(express.static('public'));
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//ROUTES
app.use('/', require('./src/routes/users.routes'))
app.use('/account', require('./src/routes/account.routes'))





const PORT = process.env.API_PORT || 5050;
app.listen(PORT, () => console.log(`👾 Server Running on port: ${PORT}`));

