const { body } = require("express-validator");
const GenreService = require("../service/genre.service");
const logger = require("../utils/logger");
const { validateError } = require("../utils/validation.helper");

const GenreController = {};

GenreController.getAllGenres = async (req, res) => {
  try {
    let results = await GenreService.getAllGenres();
    res.render("genre", {
      title: "Genre",
      data: results,
    });
  } catch (error) {
    res.render("genre", {
      title: "Genre",
      errors: error
        ? [
            {
              msg: error.message.toString(),
            },
          ]
        : undefined,
    });
  }
};

GenreController.getGenreById = async (req, res, next) => {
  try {
    const genre = await GenreService.getGenreById(req.params.id);
    if (genre == null) {
      // No results.
      const error = new Error("Author not found");
      error.status = 404;
      return next(error);
    }
    // Successful, so render.
    res.render("genre_form", {
      title: "Genre Detail",
      action: `/admin/genre/${genre.id}`,
      title_button: "Update",
      ...genre.toJSON(),
    });
  } catch (error) {
    return next(error);
  }
};

GenreController.updateGenrePost = [
  body("name", "Genre name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  validateError("genre_form", (req, res, next) => {
    return {
      title: "Genre Detail",
      action: `/admin/genre/${req.params.id}`,
      title_button: "Update",
      ...req.body
    };
  }),
  async (req, res, next) => {
    try {
      const newGenre = await GenreService.findByIdAndUpdate(req.params.id, {
        _id: req.params.id,
        ...req.body,
      });
      if (newGenre == null) {
        const error = new Error("Genre not found");
        error.status = 404;
        return next(error);
      }
      req.flash("success_msg", "Update genre successfully!");
      res.redirect("/admin/genre");
    } catch (error) {
      return next(error);
    }
  },
];

GenreController.createGenreGet = (req, res) => {
  res.render("genre_form", {
    title: "Create Genre",
    action: "create",
    title_button: "create",
  });
};

GenreController.createGenrePost = [
  body("name", "Genre name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  validateError("genre_form", (req, res, next) => {
    return {
      title: "Create Genre",
      action: "create",
      title_button: "create",
    };
  }),
  async (req, res) => {
    try {
      await GenreService.createGenre(req.body);
      req.flash("success_msg", "Create genre successfully!");
      res.redirect("/admin/genre");
    } catch (error) {
      res.render("genre_form", {
        ...req.body,
        errors: error
          ? [
              {
                msg: error.message.toString(),
              },
            ]
          : undefined,
      });
    }
  },
];

GenreController.deleteGenre = async (req, res, next) => {
  try {
    await GenreService.deleteGenre(req.params.id)
    req.flash("success_msg", "Delete genre successfully!");
    res.redirect("/admin/genre");
  } catch (error) {
    return next(error);
  }
};

module.exports = GenreController;
