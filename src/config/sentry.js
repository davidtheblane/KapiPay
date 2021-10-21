require('dotenv').config
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");

module.exports = {
  dsn: "https://213e568b3d574ec18921013e4fe2b3a0@o1046262.ingest.sentry.io/6024247",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({}),
  ],
  tracesSampleRate: 1.0,
};
