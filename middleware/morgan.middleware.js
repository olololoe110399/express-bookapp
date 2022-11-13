const morgan = require("morgan");
const logger = require("../utils/logger");

const stream = {
  write: (message) => logger.http(message),
};

const skip = () => {
  const env = require("../config/base.config").env || "development";
  return env !== "development";
};

const morganSetup = () => {
  return morgan(
    ":remote-addr :method :url :status :res[content-length] - :response-time ms",
    { stream, skip }
  );
};

module.exports = morganSetup;
