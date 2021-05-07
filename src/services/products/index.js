const Category = require("../../db").Category;
const Review = require("../../db").Review;
const Product = require("../../db").Product;
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { extname } = require("path");

const cloudStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Strive-Amazon-SQL",
  },
});

const cloudMulter = multer({ storage: cloudStorage });

const router = require("express").Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const products = await Product.findAll({
        include: [Category, Review],
      });
      res.send(products);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  })
  .post(async (req, res, next) => {
    try {
      const product = await Product.create(req.body);
      res.send(product);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });

router.route("/:productId/reviews").get(async (req, res, next) => {
  try {
    const reviews = await Product.findAll({
      include: [Review],
      attributes: [],
      where: { id: req.params.productId },
    });
    res.send(reviews[0]);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const product = await Product.findByPk(req.params.id, {
        include: [Review, Category],
      });
      res.send(product);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  })
  .put(async (req, res, next) => {
    try {
      const modifiedProduct = await Product.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      });
      res.send(modifiedProduct);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  })
  .delete(async (req, res, next) => {
    try {
      const { rows } = await Product.destroy({
        where: { id: req.params.id },
      });
      res.send("Deleted ", rows, "row");
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });

router.post(
  "/:productId/upload",
  cloudMulter.single("image"),
  async (req, res, next) => {
    try {
      const modifiedProduct = await Product.update(
        { imageUrl: req.file.path },
        {
          where: { id: req.params.productId },
          returning: true,
        }
      );
      res.send(modifiedProduct);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
);

module.exports = router;
