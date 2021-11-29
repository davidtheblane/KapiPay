const express = require("express");
const Sentry = require("@sentry/node");
const morgan = require('morgan');
const cors = require('cors');
const multer = require('multer');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require("./swagger_output.json");

require('dotenv').config({
  path: process.env.NODE_ENV === "development" ? ".env.development" : ".env"
})

const upload = multer()
const app = express();

Sentry.init({ dsn: process.env.SENTY_DSN, tracesSamples: 1.0 });
// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

app.use(upload.any());
app.use(express.static('public'));
app.use(Sentry.Handlers.errorHandler());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb', extended: true }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

//Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
const router = require('./src/routes/index.routes')
// Routes Middlewares
app.use(router)


// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

const PORT = process.env.API_PORT || 5050;
app.listen(PORT, () => console.log(`👾 Server Running on port: ${PORT}`));



