const express = require("express");
const products = express.Router();
const Product = require("../schema/product.schema");
const { check, validationResult } = require("express-validator");

// all
products.get("/", async (req, res) => {
  let pro = await Product.find({}, { __v: 0 }).populate("review");
  res.send(pro);
});

//single
products.get("/:id", async (req, res) => {
  let pro = await Product.findById(req.params.id).populate("review");
  res.send(pro);
});

//Add Product
products.post(
  "/",
  [
    check("Name").isLength({ min: 2 }),
    check("cDate")
      .isLength({ min: 19 })
      .matches(/[/]/)
      .withMessage("Flow (yyyy/mm/dd/hh/mm/ss)"),
    check("uDate")
      .isLength({ min: 19 })
      .matches(/[/]/)
      .withMessage("Flow (yyyy/mm/dd/hh/mm/ss)"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let pro = await Product.create(req.body);
      res.send(pro);
    } catch (error) {
      res.status(404).send(error.message);
    }
  }
);

//Update Product
products.patch("/:id", async (req, res) => {
  try {
    let pro = await Product.findByIdAndUpdate(req.params.id, { ...req.body });
    let newPro = await Product.findById(req.params.id);
    res.send(newPro);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

//Delete Product
products.delete("/:id", async (req, res) => {
  try {
    let pro = await Product.findByIdAndDelete(req.params.id);
    res.send("Delete Successfully");
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = products;
