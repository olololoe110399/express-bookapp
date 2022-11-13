const globalVarsHandle = () => (req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.errors = req.flash("errors");
  res.locals.url = req.path;
  next();
};

module.exports = globalVarsHandle;
