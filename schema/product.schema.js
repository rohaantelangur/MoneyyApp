const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    Name: { type: String, require: true },
    Price: { type: Number, require: true, min: 1 },
    cDate: { type: String, require: true },
    uDate: { type: String, require: true },
    review: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "review",
      },
    ],
  },
  {
    versionKey: false,
  }
);

const Product = mongoose.model("product", productSchema);

module.exports = Product;
