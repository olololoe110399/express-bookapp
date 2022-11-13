const path = require("path");

const projectRootPath = path.resolve(__dirname, "..");
const views = path.join(projectRootPath, "views");

let config = {
  port: process.env.PORT || 3000,
  dbUrl: process.env.DB_URL || "mongodb://localhost/test-db",
  env: process.env.NODE_ENV || "development",
  projectRootPath,
  hbs: {
    partialsDir: path.join(views, "partials"),
    layoutsDir: path.join(views, "layouts"),
    views,
  },
  staticDir: path.join(projectRootPath, "public"),
  secretKey: process.env.SECRET_KEY,
  maxAge: 2 * 24 * 60 * 60, // 2 day
  // maxAge: 60, // 1'
  numberOfroundsSalt: 10,
};

module.exports = config;
