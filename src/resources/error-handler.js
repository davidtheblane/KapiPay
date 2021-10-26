const Sentry = require("@sentry/node")

Sentry.init({ dsn: process.env.SENTY_DSN, tracesSamples: 1.0 });

async function errorHandler(error) {
  try {
    Sentry.captureException(error)
  } catch (err) {
    throw err
  }
}

module.exports = errorHandler
