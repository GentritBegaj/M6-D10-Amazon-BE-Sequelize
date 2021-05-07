const router = require("express").Router();
const Category = require("../../db").Category;

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const categories = await Category.findAll();
      res.send(categories);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  })
  .post(async (req, res, next) => {
    try {
      const category = await Category.create(req.body);
      res.send(category);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });

router
  .route("/:id")
  .put(async (req, res, next) => {
    try {
      const modifiedCategory = await Category.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      });
      res.send(modifiedCategory);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  })
  .delete(async (req, res, next) => {
    try {
      const deletedCategory = await Category.destroy({
        where: { id: req.params.id },
      });
      res.send("Category deleted");
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });

module.exports = router;
