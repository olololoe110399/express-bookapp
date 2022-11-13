const adminRouter = require("./admin.router");

module.exports = (app, passport) => {
  // Load Admin Routes
  app.use("/admin", adminRouter(passport));

  // --------
  // Load other routes
  // --------
};
