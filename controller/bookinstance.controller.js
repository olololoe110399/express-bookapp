const { body } = require("express-validator");
const BookService = require("../service/book.service");
const BookinstanceService = require("../service/bookinstance.service");
const logger = require("../utils/logger");
const { validateError } = require("../utils/validation.helper");

const BookinstanceController = {};

BookinstanceController.BOOK_STATUS = [
  "Maintenance",
  "Available",
  "Loaned",
  "Reserved",
];

BookinstanceController.getAllBookinstances = async (req, res, next) => {
  try {
    let results = await BookinstanceService.getAllBookinstances();
    res.render("bookinstance", {
      title: "Book Instance",
      data: results,
    });
  } catch (error) {
    return next(error);
  }
};

BookinstanceController.getBookinstanceById = async (req, res, next) => {
  try {
    const bookinstance = await BookinstanceService.getBookinstanceById(
      req.params.id
    );
    if (bookinstance == null) {
      // No results.
      const error = new Error("Book Instance not found");
      error.status = 404;
      return next(error);
    }
    let results = await BookService.getAllBooks();
    // Successful, so render.
    res.render("bookinstance_form", {
      title: "Book Instance Detail",
      action: `/admin/bookinstance/${bookinstance.id}`,
      title_button: "Update",
      books: results,
      bookinstance: bookinstance,
      bookStatus: BookinstanceController.BOOK_STATUS,
    });
  } catch (error) {
    return next(error);
  }
};

BookinstanceController.updateBookinstancePost = [
  body("book", "Book must be specified").trim().isLength({ min: 1 }).escape(),
  body("imprint", "Imprint must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("status").escape(),
  body("due_back", "Invalid date")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),
  validateError("bookinstance_form", async (req, res, next) => {
    var bookinstance = {
      _id: req.params.id,
      ...req.body,
    };
    let results = await BookService.getAllBooks();
    return {
      title: "Book Instance Detail",
      action: `/admin/bookinstance/${req.params.id}`,
      title_button: "Update",
      bookinstance: bookinstance,
      books: results,
      bookStatus: BookinstanceController.BOOK_STATUS,
    };
  }),
  async (req, res, next) => {
    try {
      const newBookinstance = await BookinstanceService.findByIdAndUpdate(
        req.params.id,
        {
          _id: req.params.id,
          ...req.body,
        }
      );
      if (newBookinstance == null) {
        const error = new Error("Book Instance not found");
        error.status = 404;
        return next(error);
      }
      req.flash("success_msg", "Update Book Instance successfully!");
      res.redirect("/admin/bookinstance");
    } catch (error) {
      return next(error);
    }
  },
];

BookinstanceController.createBookinstanceGet = async (req, res) => {
  let results = await BookService.getAllBooks();
  res.render("bookinstance_form", {
    title: "Create Book Instance",
    action: "create",
    title_button: "create",
    books: results,
    bookStatus: BookinstanceController.BOOK_STATUS,
  });
};

BookinstanceController.createBookinstancePost = [
  body("book", "Book must be specified").trim().isLength({ min: 1 }).escape(),
  body("imprint", "Imprint must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("status").escape(),
  body("due_back", "Invalid date")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),
  validateError("bookinstance_form", async (req, res, next) => {
    var bookinstance = {
      _id: req.params.id,
      ...req.body,
    };
    let results = await BookService.getAllBooks();
    return {
      title: "Book Instance Detail",
      action: `/admin/bookinstance/${req.params.id}`,
      title_button: "Update",
      bookinstance: bookinstance,
      books: results,
      bookStatus: BookinstanceController.BOOK_STATUS,
    };
  }),
  async (req, res, next) => {
    try {
      await BookinstanceService.createBookinstance(req.body);
      req.flash("success_msg", "Create Book Instance successfully!");
      res.redirect("/admin/bookinstance");
    } catch (error) {
      return next(error);
    }
  },
];

BookinstanceController.deleteBookinstance = async (req, res, next) => {
  try {
    await BookinstanceService.deleteBookinstance(req.params.id);
    req.flash("success_msg", "Delete book instance successfully!");
    res.redirect("/admin/bookinstance");
  } catch (error) {
    return next(error);
  }
};

module.exports = BookinstanceController;
