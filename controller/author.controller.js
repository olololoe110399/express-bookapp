const { body } = require("express-validator");

const AuthorService = require("../service/author.service");
const { validateError } = require("../utils/validation.helper");

const AuthorController = {};

AuthorController.getAllAuthors = async (req, res) => {
  try {
    let results = await AuthorService.getAllAuthors();
    res.render("author", {
      title: "Author",
      data: results,
    });
  } catch (error) {
    return next(error);
  }
};

AuthorController.getAuthorById = async (req, res, next) => {
  try {
    const author = await AuthorService.getAuthorById(req.params.id);
    if (author == null) {
      // No results.
      const error = new Error("Author not found");
      error.status = 404;
      return next(error);
    }
    // Successful, so render.
    res.render("author_form", {
      title: "Author Detail",
      action: `/admin/author/${author.id}`,
      title_button: "Update",
      ...author,
    });
  } catch (error) {
    return next(error);
  }
};

AuthorController.updateAuthorPost = [
  body("first_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified.")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters."),
  body("family_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Family name must be specified.")
    .isAlphanumeric()
    .withMessage("Family name has non-alphanumeric characters."),
  body("date_of_birth", "Invalid date of birth")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),
  body("date_of_death", "Invalid date of death")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),
  validateError("author_form", (req, res, next) => {
    return {
      title: "Author Detail",
      action: `/admin/author/${req.params.id}`,
      title_button: "Update",
      ...req.body
    };
  }),
  async (req, res, next) => {
    try {
      const newAuthor = await AuthorService.findByIdAndUpdate(req.params.id, {
        _id: req.params.id,
        ...req.body,
      });
      if (newAuthor == null) {
        const error = new Error("Author not found");
        error.status = 404;
        return next(error);
      }
      req.flash("success_msg", "Update Author successfully!");
      res.redirect("/admin/author");
    } catch (error) {
      return next(error);
    }
  },
];

AuthorController.createAutherGet = (req, res) => {
  res.render("author_form", {
    title: "Create Author",
    action: "create",
    title_button: "create",
  });
};

AuthorController.createAutherPost = [
  body("first_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified.")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters."),
  body("family_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Family name must be specified.")
    .isAlphanumeric()
    .withMessage("Family name has non-alphanumeric characters."),
  body("date_of_birth", "Invalid date of birth")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),
  body("date_of_death", "Invalid date of death")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),
  validateError("author_form", (req, res, next) => {
    return {
      title: "Create Author",
      action: "create",
      title_button: "create",
    };
  }),
  async (req, res) => {
    try {
      await AuthorService.createAuthor(req.body);
      req.flash("success_msg", "Create author successfully!");
      res.redirect("/admin/author");
    } catch (error) {
      return next(error);
    }
  },
];

AuthorController.deleteAuthor = async (req, res, next) => {
  try {
    await AuthorService.deleteAuthor(req.params.id);
    req.flash("success_msg", "Delete author successfully!");
    res.redirect("/admin/author");
  } catch (error) {
    return next(error);
  }
};

module.exports = AuthorController;
