let express = require("express");
const AuthorController = require("../controller/author.controller");
let router = express.Router();

router.get("/", AuthorController.getAllAuthors);

router
  .get("/create", AuthorController.createAutherGet)
  .post("/create", AuthorController.createAutherPost);
router
  .get("/:id", AuthorController.getAuthorById)
  .post("/:id", AuthorController.updateAuthorPost);

router.get("/:id/delete", AuthorController.deleteAuthor);

module.exports = router;
