const BookModel = require("../models/book.model");
const GenreModel = require("../models/genre.model");

const GenreService = {};

GenreService.getAllGenres = () => {
  return GenreModel.find()
    .sort([["name", "ascending"]])
    .lean()
    .exec();
};

GenreService.createGenre = async (data) => {
  const genre = new GenreModel(data);
  let found_genre = await GenreModel.findOne({ name: data.name }).exec();
  if (found_genre) {
    return Promise.resolve(null);
  } else {
    return genre.save();
  }
};

GenreService.findByIdAndUpdate = (id, data) => {
  const genre = new GenreModel(data);
  return GenreModel.findByIdAndUpdate(id, genre);
};

GenreService.getGenreById = (id) => {
  return GenreModel.findById(id);
};

GenreService.deleteGenre = async (id) => {
  let genres_books = await BookModel.find({ genre: id }).exec();
  if (genres_books.length > 0) {
    return;
  }
  await GenreModel.findByIdAndRemove(id);
  return;
};

module.exports = GenreService;
