const express = require("express");
const reviews = express.Router();
const review = require("../schema/review.schema");
const { check, validationResult } = require("express-validator");
// all
reviews.get("/", async (req, res) => {
  let rev = await review.find({}, { __v: 0 });
  res.send(rev);
});

//single
reviews.get("/:id", async (req, res) => {
  let rev = await review.findById(req.params.id);
  res.send(rev);
});

//Add Review
reviews.post(
  "/",
  [
    check("userId").isLength({ min: 2 }),
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
      let rev = await review.create(req.body);
      res.send(rev);
    } catch (error) {
      res.status(404).send(error.message);
    }
  }
);

//Update Product
reviews.patch("/:id", async (req, res) => {
  try {
    let rev = await review.findByIdAndUpdate(req.params.id, { ...req.body });
    let newrev = await review.findById(req.params.id);
    res.send(newrev);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

//Delete Review
reviews.delete("/:id", async (req, res) => {
  try {
    let rev = await review.findByIdAndDelete(req.params.id);
    res.send("Delete Successfully");
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = reviews;
