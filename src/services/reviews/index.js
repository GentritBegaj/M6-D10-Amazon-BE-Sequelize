const router = require("express").Router();
const Review = require("../../db").Review;
const Product = require("../../db").Product;

router.route("/").get(async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      include: Product,
    });
    res.send(reviews);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.route("/").post(async (req, res, next) => {
  try {
    const review = await Review.create(req.body);
    res.send(review);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router
  .route("/:productId/:reviewId")
  .put(async (req, res, next) => {
    try {
      const modifiedReview = await Review.update(req.body, {
        where: { id: req.params.reviewId, productId: req.params.productId },
        returning: true,
      });
      res.send(modifiedReview);
      console.log(modifiedReview);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  })
  .delete(async (req, res, next) => {
    try {
      const { rows } = await Review.destroy({
        where: { id: req.params.reviewId, productId: req.params.productId },
      });
      res.send("Deleted", rows);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });

module.exports = router;
