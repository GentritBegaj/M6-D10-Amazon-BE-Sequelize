const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    host: process.env.PGHOST,
    dialect: "postgres",
    // dialectOptions:{
    //   ssl:{
    //     require:true,
    //     rejectUnauthorized:false
    //   }
    // }
  }
);

const Category = require("./categories")(sequelize, DataTypes);
const Product = require("./products")(sequelize, DataTypes);
const Review = require("./reviews")(sequelize, DataTypes);
const Cart = require("./cart")(sequelize, DataTypes);
const User = require("./users")(sequelize, DataTypes);

Category.hasMany(Product);
Product.belongsTo(Category);

Product.belongsToMany(User, { through: Cart });
User.belongsToMany(Product, { through: Cart });

User.hasMany(Cart);
Cart.belongsTo(User);

Product.hasMany(Cart);
Cart.belongsTo(Product);

User.hasMany(Product);
Product.belongsTo(User);

Product.hasMany(Review);
Review.belongsTo(Product);

sequelize
  .authenticate()
  .then(() => console.log("Connection established"))
  .catch((e) => console.log("Connection failed", e));

module.exports = { sequelize, Category, Cart, Product, Review, User };
