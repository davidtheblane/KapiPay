require('dotenv').config
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");

module.exports = {
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({}),
  ],
};
