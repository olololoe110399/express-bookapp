const errorHandle = require("./error.middleware");
const engineSetup = require("./engine.middleware");
const morganSetup = require("./morgan.middleware");
const notFoundHandle = require("./notFound.middleware");
const globalVarsHandle = require("./globalVars.middleware");
const passportSetup = require("./passport.middleware");

module.exports = {
  errorHandle,
  notFoundHandle,
  morganSetup,
  engineSetup,
  globalVarsHandle,
  passportSetup,
};
