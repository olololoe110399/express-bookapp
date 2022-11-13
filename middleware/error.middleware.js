const logger = require("../utils/logger");

let errorHandle = () => {
  return async (err, req, res, next) => {
    // render the error page
    res.status(err.status || 500);
    // save the error to log
    logger.error(err.stack);

    if (err.status == 401) {
      res.redirect("/admin/sign_in");
    } else if (err.status == 404) {
      res.render("404");
    } else {
      res.status(500);
      if (req.app.get("env") === "development") {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = err;
        res.render("error", { layout: false });
      } else {
        res.render("500");
      }
    }
  };
};

module.exports = errorHandle;
