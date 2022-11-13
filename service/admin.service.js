const async = require("async");
const BookModel = require("../models/book.model");
const BookInstanceModel = require("../models/bookinstance.model");
const AuthorModel = require("../models/author.model");
const GenreModel = require("../models/genre.model");
const UserModel = require("../models/user.model");

const AdminService = {};

AdminService.getUserById = async(id) => {
  let result =await UserModel.findById(id);
  return result.toJSON();
};

AdminService.dashboard = () => {
  return async.parallel({
    book_count: function (callback) {
      BookModel.countDocuments({}, callback);
    },
    book_instance_count: function (callback) {
      BookInstanceModel.countDocuments({}, callback);
    },
    book_instance_available_count: function (callback) {
      BookInstanceModel.countDocuments({ status: "Available" }, callback);
    },
    author_count: function (callback) {
      AuthorModel.countDocuments({}, callback);
    },
    genre_count: function (callback) {
      GenreModel.countDocuments({}, callback);
    },
    book_instance_availables: function (callback) {
      BookInstanceModel.find({ status: "Available" })
        .populate("book")
        .limit(4)
        .lean()
        .exec(callback);
    },
    authors: function (callback) {
      AuthorModel.find()
        .limit(4)
        .exec((error, result) =>
          callback(
            error,
            result.map((e) => e.toJSON())
          )
        );
    },
  });
};

module.exports = AdminService;
