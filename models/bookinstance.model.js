const { DateTime } = require("luxon");
const mongoose = require("mongoose");

const { Schema } = mongoose;

const BookInstanceSchema = Schema(
  {
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true }, // Reference to the associated book.
    imprint: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ["Available", "Maintenance", "Loaned", "Reserved"],
      default: "Maintenance",
    },
    due_back: { type: Date, default: Date.now },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for this bookinstance object's URL.
BookInstanceSchema.virtual("url").get(function () {
  return "/admin/bookinstance/" + this._id;
});

BookInstanceSchema.virtual("due_back_formatted").get(function () {
  return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED);
});

BookInstanceSchema.virtual("due_back_yyyy_mm_dd").get(function () {
  return DateTime.fromJSDate(this.due_back).toISODate(); //format 'YYYY-MM-DD'
});


const BookInstanceModel = mongoose.model(
  "BookInstance",
  BookInstanceSchema,
  "bookInstances"
);

module.exports = BookInstanceModel;
