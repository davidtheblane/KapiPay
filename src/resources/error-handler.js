const Sentry = require("@sentry/node")

const sentryError = async (error) => {
  try {
    Sentry.captureException(error);
  } catch (err) {
    throw err;
  }
};

module.exports = sentryError;
