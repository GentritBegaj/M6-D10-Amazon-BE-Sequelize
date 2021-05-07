const router = require("express").Router();
const Cart = require("../../db").Cart;
const Product = require("../../db").Product;
const User = require("../../db").User;
const Category = require("../../db").Category;
const cart = require("../../db").Review;

router
  .route("/:userId")
  .get(async (req, res, next) => {
    try {
      const cart = await Cart.findAll({
        where: { userId: req.params.userId },
        include: Product,
      });
      res.send(cart);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  })
  .post(async (req, res, next) => {
    try {
      const cart = await Cart.create(req.body);
      res.send(cart);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });

module.exports = router;
