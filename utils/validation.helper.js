const { validationResult } = require("express-validator");

let helpers = {};

helpers.validateError = (view, call) => (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if (call) {
      data = call(req, res, next);
      return res.render(view, {
        ...req.body,
        ...data,
        errors: errors.array(),
      });
    } else {
      return res.render(view, {
        ...req.body,
        errors: errors.array(),
      });
    }
  }
  next();
};

module.exports = helpers;
