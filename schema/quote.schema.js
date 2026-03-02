const { Schema, model } = require("mongoose");

const quoteSchema = new Schema(
  {
    bookId: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "Book ID majburiy"],
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author ID majburiy"],
    },
    text: {
      type: String,
      required: [true, "Iqtibos matni majburiy"],
      minlength: [10, "Iqtibos kamida 10 ta belgidan iborat bo‘lishi kerak"],
      maxlength: [1000, "Iqtibos 1000 ta belgidan oshmasligi kerak"],
      trim: true,
    },
  },
  { timestamps: true }
);

quoteSchema.index({ text: "text" });

module.exports = model("Quote", quoteSchema);