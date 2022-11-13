let config = require("../config/base.config");
let expressHbs = require("express-handlebars");
 let hbsHelpers = require("../utils/hbs.helpers");

let engineSetup = (app) => {
  app.engine(
    "hbs",
    expressHbs.create({
      extname: ".hbs",
      defaultLayout: "main",
      partialsDir: config.hbs.partialsDir,
      layoutsDir: config.hbs.layoutsDir,
      helpers: hbsHelpers,
    }).engine
  );
  app.set("views", config.hbs.views);
  app.set("view engine", "hbs");
  if (config.env == "production") {
    app.set("view cache", true);
  }
};

module.exports = engineSetup;
