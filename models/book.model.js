const mongoose = require("mongoose");

const { Schema } = mongoose;

const BookSchema = Schema(
  {
    title: { type: String, required: true },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Author",
      required: true,
    },
    summary: { type: String, required: true },
    isbn: { type: String, required: true },
    genre: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for book's URL
BookSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/admin/book/${this._id}`;
});


const BookModel = mongoose.model("Book", BookSchema, "books");

module.exports = BookModel;
