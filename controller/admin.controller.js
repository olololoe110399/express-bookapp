const { body } = require("express-validator");

const AdminService = require("../service/admin.service");
const logger = require("../utils/logger");
const { validateError } = require("../utils/validation.helper");
const BookinstanceController = require("./bookinstance.controller");

const AdminController = {};

AdminController.getSignIn = (req, res, next) => {
  res.render("sign_in");
};

AdminController.postSignIn = (passport) => [
  body("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Must be a valid email"),
  body("password")
    .trim()
    .isLength({ min: 6, max: 20 })
    .withMessage("Password must be between 6 and 20 characters"),
  validateError("sign_in"),
  passport.authenticate("sign-in", {
    successRedirect: "/admin/dashboard",
    failureRedirect: "/admin/sign_in",
    failureFlash: true,
  }),
];

AdminController.getSignUp = (req, res, next) => {
  res.render("sign_up");
};

AdminController.postSignUp = (passport) => [
  body("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Must be a valid email"),
  body("full_name")
    .trim()
    .isLength({ min: 6, max: 55 })
    .withMessage("Full name must be between 6 and 55 characters"),
  body("password")
    .trim()
    .isLength({ min: 6, max: 20 })
    .withMessage("Password must be between 6 and 20 characters"),
  body("password_confirm")
    .trim()
    .isLength({ min: 6, max: 20 })
    .withMessage("Password confirm must be between 6 and 20 characters")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("The passwords do not match"),
  validateError("sign_in", (req, res, next) => {
    return {
      full_name: req.body.full_name,
      email: req.body.email,
    };
  }),
  passport.authenticate("sign-up", {
    successRedirect: "/admin/dashboard",
    failureRedirect: "/admin/sign_up",
    failureFlash: true,
  }),
];

AdminController.getLogout = (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      logger.error(error);
    }
    res.redirect("/admin/sign_in");
  });
};

AdminController.dashboard = async (req, res, next) => {
  try {
    const results = await AdminService.dashboard();
    res.render("dashboard", {
      title: "Dashboard",
      data: {
        ...results,
        bookStatus: BookinstanceController.BOOK_STATUS,
      },
    });
  } catch (error) {
    next(error);
  }
};

AdminController.genCurrentUser = async (req, res, next) => {
  try {
    const results = await AdminService.getUserById(req.user._id);
    res.render("profile", { data: results, title: "Profile" });
  } catch (error) {
    next(error);
  }
};

module.exports = AdminController;
