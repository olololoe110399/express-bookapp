let express = require("express");
const AdminController = require("../controller/admin.controller");
const bookRouter = require("./book.router");
const genreRouter = require("./genre.router");
const authorRouter = require("./author.router");
const bookinstanceRouter = require("./bookinstance.router");
let router = express.Router();

module.exports = (passport) => {
  /* GET admin home page. */

  router.get("/", (req, res) => res.redirect("/admin/dashboard"));

  router.get("/dashboard", isLoggedIn, AdminController.dashboard);

  router
    .post("/sign_in", isLoggedOut, AdminController.postSignIn(passport))
    .get("/sign_in", isLoggedOut, AdminController.getSignIn);

  router
    .post("/sign_up", AdminController.postSignUp(passport))
    .get("/sign_up", AdminController.getSignUp);

  router.get("/logout", AdminController.getLogout);

  router.use("/author", isLoggedIn, authorRouter);

  router.use("/genre", isLoggedIn, genreRouter);

  router.use("/book", isLoggedIn, bookRouter);

  router.use("/bookinstance", isLoggedIn, bookinstanceRouter);

  router.get("/map", isLoggedIn, (req, res) =>
    res.render("map", { title: "Map" })
  );

  router.get("/profile", isLoggedIn, AdminController.genCurrentUser);

  return router;
};

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error_msg", "Please login to view that resource");
  res.redirect("/admin/sign_in");
};

const isLoggedOut = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/admin/dashboard");
};
