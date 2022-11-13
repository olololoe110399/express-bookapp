const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");

const logger = require("../utils/logger");
const config = require("../config/base.config");
const RoleService = require("../service/role.service");

const connectionDatabase = () => {
  // Set up default mongoose connection
  logger.debug("Set up default mongoose connection");
  mongoose.connect(config.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Get the default connection
  const db = mongoose.connection;

  // Bind connection to error event (to get notification of connection errors)
  db.on("error", (err) => {
    logger.error(`MongoDB connection error: ${err}.\nExiting now...\n`);
    process.exit(1);
  });

  db.on("connected", () => {
    logger.debug("Successfully connected to the database");
    RoleService.initial();
  });
};

const connectionStore = () => {
  return MongoStore.create({
    client: mongoose.connection.getClient(),
    ttl: config.maxAge,
    autoRemove: "native",
  });
};

module.exports = {
  connectionDatabase,
  connectionStore,
};
