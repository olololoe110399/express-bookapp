const createHttpError = require("http-errors");

let notFoundHandle = () => {
  return (req, res, next) => {
    next(createHttpError(404));
  };
};

module.exports = notFoundHandle;
