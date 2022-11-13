let express = require("express");
const BookinstanceController = require("../controller/bookinstance.controller");
let router = express.Router();

router.get("/", BookinstanceController.getAllBookinstances);

router
  .get("/create", BookinstanceController.createBookinstanceGet)
  .post("/create", BookinstanceController.createBookinstancePost);
router
  .get("/:id", BookinstanceController.getBookinstanceById)
  .post("/:id", BookinstanceController.updateBookinstancePost);

router.get("/:id/delete", BookinstanceController.deleteBookinstance);

module.exports = router;
