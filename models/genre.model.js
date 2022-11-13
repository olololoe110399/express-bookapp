const mongoose = require("mongoose");

const { Schema } = mongoose;

const GenreSchema = Schema(
  {
    name: { type: String, required: true, minLength: 3, maxLength: 100 },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
// Virtual for this genre instance URL.
GenreSchema.virtual("url").get(function () {
  return "/admin/genre/" + this._id;
});

const GenreModel = mongoose.model("Genre", GenreSchema, "genres");

module.exports = GenreModel;
