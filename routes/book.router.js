let express = require("express");
const BookController = require("../controller/book.controller");
let router = express.Router();

router.get("/", BookController.getAllBooks);

router
  .get("/create", BookController.createBookGet)
  .post("/create", BookController.createBookPost);
router
  .get("/:id", BookController.getBookById)
  .post("/:id", BookController.updateBookPost);

router.get("/:id/delete", BookController.deleteBook);

module.exports = router;
