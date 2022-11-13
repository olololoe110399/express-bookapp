const BookinstanceModel = require("../models/bookinstance.model");

const BookinstanceService = {};

BookinstanceService.getAllBookinstances = async () => {
  let result = await BookinstanceModel.find().populate("book").exec();
  return result.map((e) => e.toJSON());
};

BookinstanceService.createBookinstance = async (data) => {
  const book = new BookinstanceModel(data);
  return book.save();
};

BookinstanceService.findByIdAndUpdate = (id, data) => {
  const book = new BookinstanceModel(data);
  return BookinstanceModel.findByIdAndUpdate(id, book);
};

BookinstanceService.getBookinstanceById = async (id) => {
  const result = await BookinstanceModel.findById(id);
  return result.toJSON();
};

BookinstanceService.deleteBookinstance = (id) => {
  return BookinstanceModel.findByIdAndRemove(id);
};

module.exports = BookinstanceService;
