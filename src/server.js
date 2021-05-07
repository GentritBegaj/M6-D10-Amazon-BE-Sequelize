const express = require("express");
const cors = require("cors");
const db = require("./db");
const cartsRoutes = require("./services/carts");
const productsRoutes = require("./services/products");
const categoriesRoutes = require("./services/categories");
const reviewsRoutes = require("./services/reviews");

const server = express();

server.use(cors());
server.use(express.json());
server.use("/products", productsRoutes);
server.use("/carts", cartsRoutes);
server.use("/categories", categoriesRoutes);
server.use("/reviews", reviewsRoutes);

db.sequelize
  .sync({ force: false })
  .then((result) => {
    return db.User.findByPk(1);
  })
  .then(async (user) => {
    if (!user) {
      const newUser = await db.User.create({
        firstName: "Gentrit",
        lastName: "Begaj",
        email: "gentrit@gmail.com",
      });
    }
  })
  .then(() => {
    server.listen(process.env.PORT || 3001, () => {
      console.log("Server is running on port ", process.env.PORT);
    });
  });
