const { body } = require("express-validator");
const BookService = require("../service/book.service");
const logger = require("../utils/logger");
const { validateError } = require("../utils/validation.helper");

const BookController = {};

BookController.getAllBooks = async (req, res, next) => {
  try {
    let results = await BookService.getAllBooks();
    res.render("book", {
      title: "Book",
      data: results,
    });
  } catch (error) {
    return next(error);
  }
};

BookController.getBookById = async (req, res, next) => {
  try {
    const book = await BookService.getBookById(req.params.id);
    if (book == null) {
      // No results.
      const error = new Error("Book not found");
      error.status = 404;
      return next(error);
    }
    let results = await BookService.getAuthorsAndGenres();
    // Successful, so render.

    res.render("book_form", {
      title: "Book Detail",
      action: `/admin/book/${book.id}`,
      title_button: "Update",
      authors: results.authors,
      genres: results.genres,
      book: book,
    });
  } catch (error) {
    return next(error);
  }
};

BookController.updateBookPost = [
  (req, res, next) => {
    if (!(req.body.genre instanceof Array)) {
      if (typeof req.body.genre === "undefined") req.body.genre = [];
      else req.body.genre = new Array(req.body.genre);
    }
    next();
  },
  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("author", "Author must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("summary", "Summary must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("isbn", "ISBN must not be empty").trim().isLength({ min: 1 }).escape(),
  body("genre.*").escape(),
  validateError("book_form", async (req, res, next) => {
    var book = {
      _id: req.params.id,
      ...req.body,
      ...{
        genre: typeof req.body.genre === "undefined" ? [] : req.body.genre,
      },
    };
    let results = await BookService.getAuthorsAndGenres();
    return {
      title: "Book Detail",
      action: `/admin/book/${req.params.id}`,
      title_button: "Update",
      authors: results.authors,
      genres: results.genres,
      book: book,
    };
  }),
  async (req, res, next) => {
    try {
      const newBook = await BookService.findByIdAndUpdate(req.params.id, {
        _id: req.params.id,
        ...req.body,
        ...{
          genre: typeof req.body.genre === "undefined" ? [] : req.body.genre,
        },
      });
      if (newBook == null) {
        const error = new Error("Book not found");
        error.status = 404;
        return next(error);
      }
      req.flash("success_msg", "Update Book successfully!");
      res.redirect("/admin/book");
    } catch (error) {
      return next(error);
    }
  },
];

BookController.createBookGet = async (req, res) => {
  let results = await BookService.getAuthorsAndGenres();
  res.render("book_form", {
    title: "Create Book",
    action: "create",
    title_button: "create",
    authors: results.authors,
    genres: results.genres,
  });
};

BookController.createBookPost = [
  (req, res, next) => {
    if (!(req.body.genre instanceof Array)) {
      if (typeof req.body.genre === "undefined") req.body.genre = [];
      else req.body.genre = new Array(req.body.genre);
    }
    next();
  },
  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("author", "Author must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("summary", "Summary must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("isbn", "ISBN must not be empty").trim().isLength({ min: 1 }).escape(),
  body("genre.*").escape(),
  validateError("book_form", async (req, res, next) => {
    var book = {
      _id: req.params.id,
      ...req.body,
      ...{
        genre: typeof req.body.genre === "undefined" ? [] : req.body.genre,
      },
    };
    let results = await BookService.getAuthorsAndGenres();
    return {
      title: "Book Detail",
      action: `/admin/book/${req.params.id}`,
      title_button: "Update",
      authors: results.authors,
      genres: results.genres,
      book: book,
    };
  }),
  async (req, res, next) => {
    try {
      await BookService.createBook(req.body);
      req.flash("success_msg", "Create book successfully!");
      res.redirect("/admin/book");
    } catch (error) {
      return next(error);
    }
  },
];

BookController.deleteBook = async (req, res, next) => {
  try {
    await BookService.deleteBook(req.params.id);
    req.flash("success_msg", "Delete book successfully!");
    res.redirect("/admin/book");
  } catch (error) {
    return next(error);
  }
};

module.exports = BookController;
