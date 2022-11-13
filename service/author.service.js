const async = require("async");

const AuthorModel = require("../models/author.model");
const BookModel = require("../models/book.model");

const AuthorService = {};

AuthorService.getAllAuthors = async () => {
  let result = await AuthorModel.find().exec();
  return result.map((e) => e.toJSON());
};

AuthorService.createAuthor = (data) => {
  const author = new AuthorModel(data);
  return author.save();
};

AuthorService.findByIdAndUpdate = (id, data) => {
  const author = new AuthorModel(data);
  return AuthorModel.findByIdAndUpdate(id, author);
};

AuthorService.getAuthorById = async (id) => {
  const result = await AuthorModel.findById(id);
  return result.toJSON();
};

AuthorService.deleteAuthor = async (id) => {
  let authors_books = await BookModel.find({ author: id }).exec();
  if (authors_books.length > 0) {
    return;
  }
  await AuthorModel.findByIdAndRemove(id);
  return;
};

module.exports = AuthorService;
