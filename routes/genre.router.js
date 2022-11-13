let express = require("express");
const GenreController = require("../controller/genre.controller");
let router = express.Router();

router.get("/", GenreController.getAllGenres);

router
  .get("/create", GenreController.createGenreGet)
  .post("/create", GenreController.createGenrePost);
router
  .get("/:id", GenreController.getGenreById)
  .post("/:id", GenreController.updateGenrePost);

router.get("/:id/delete", GenreController.deleteGenre);

module.exports = router;
