const express = require("express");
const mongoose = require("mongoose");
const products = require("./router/product.router");
const reviews = require("./router/review.router");
const app = express();
app.use(express.json());
app.use("/product", products);
app.use("/review", reviews);
require("dotenv").config();

const port = process.env.PORT || 8080;
app.listen(port, async () => {
  await mongoose.connect(process.env.DBLINK);
  console.log(port);
});
