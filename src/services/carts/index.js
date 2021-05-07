const router = require("express").Router();
const Cart = require("../../db").Cart;
const Product = require("../../db").Product;
const User = require("../../db").User;
const Category = require("../../db").Category;

router.route("/:userId").get(async (req, res, next) => {
  try {
    const cart = await Cart.findAll({
      where: { userId: req.params.userId },
      include: [{ model: Product, include: Category }, User],
    });
    res.send(cart);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.route("/:userId/:productId").post(async (req, res, next) => {
  try {
    const cart = await Cart.create({
      productId: req.params.productId,
      userId: req.params.userId,
    });
    res.send(cart);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// router
//   .route("/:userId/:productId")
//   .put(async (req, res, next) => {
//   try {
//     const modifiedCart = await Cart.update(
//       where
//     )
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// })

module.exports = router;
