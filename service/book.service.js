const async = require("async");
const AuthorModel = require("../models/author.model");

const BookModel = require("../models/book.model");
const BookInstanceModel = require("../models/bookinstance.model");
const GenreModel = require("../models/genre.model");
const logger = require("../utils/logger");

const BookService = {};

BookService.getAllBooks = async () => {
  let result = await BookModel.find({}, "title author")
    .sort({ title: 1 })
    .populate("author")
    .populate("genre")
    .exec();
  return result.map((e) => e.toJSON());
};

BookService.createBook = async (data) => {
  const book = new BookModel(data);
  return book.save();
};

BookService.findByIdAndUpdate = (id, data) => {
  const book = new BookModel(data);
  return BookModel.findByIdAndUpdate(id, book);
};

BookService.getBookById =async (id) => {
  let result = await BookModel.findById(id);
  return result.toJSON();
};

BookService.getAuthorsAndGenres = async () => {
  let results = await async.parallel({
    authors: (callback) => {
      AuthorModel.find(callback);
    },
    genres: (callback) => {
      GenreModel.find(callback);
    },
  });

  return {
    authors: results.authors.map((e) => e.toJSON()),
    genres: results.genres.map((e) => e.toJSON()),
  };
};

BookService.deleteBook = async (id) => {
  let book_instances = await BookInstanceModel.find({ book: id }).exec();
  if (book_instances.length > 0) {
    return;
  }
  await BookModel.findByIdAndRemove(id);
  return;
};

module.exports = BookService;
